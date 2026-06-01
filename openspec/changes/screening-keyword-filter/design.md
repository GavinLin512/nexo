## Context

數據攝取模組已能從多個來源獲取大量文章，但其中包含大量低質量或不相關的內容。為了避免在後續的 AI 分析階段浪費昂貴的 Token，需要建立一套高效的初步過濾機制。

## Goals / Non-Goals

**Goals:**
- 實作 `KeywordFilter` 類別，能夠根據預定義的關鍵字列表對文章標題與摘要進行掃描。
- 支持「包含關鍵字」 (Must-include) 與「排除關鍵字」 (Must-exclude) 兩種邏輯。
- 實作正則表達式 (Regex) 匹配，以支持更靈活的模式匹配（例如忽略大小寫）。
- 將篩選邏輯無縫集成至 `SyncService` 的同步管線中。

**Non-Goals:**
- 實作語義分析 (Semantic Analysis) $\rightarrow$ 這是後續 `ai-screening` 的工作。
- 實作複雜的權重評分系統 $\rightarrow$ 本階段僅採取二元過濾 (Pass/Fail)。
- 提供實時的 UI 篩選界面 $\rightarrow$ 此模組僅限於後端處理。

## Decisions

- **Algorithm: Regex-based Matching**: 選擇正則表達式而非簡單的 `String.includes()`，以提供更好的靈活性（如：`\bAI\b` 匹配單詞而非法定字符串）。
- **Filter Order: Exclude $\rightarrow$ Include**: 先執行排除列表（黑名單），若命中則直接剔除；隨後執行包含列表（白名單），確保只有真正相關的內容進入下一階段。
- **Integration Point: Post-Fetch, Pre-Store**: 在適配器抓取數據後、寫入資料庫前進行篩選，避免將垃圾數據存入 `articles` 表。

## Risks / Trade-offs

- [過度過濾] $\rightarrow$ 如果關鍵字設定過於嚴苛，可能會導致高品質文章被誤刪。對策：提供日誌記錄被過濾的文章標題，方便管理員調整關鍵字。
- [性能開銷] $\rightarrow$ 對大量文章執行複雜正則匹配可能導致延遲。對策：限制單次匹配的正則複雜度，並對關鍵字列表進行預編譯 (`RegExp` 緩存)。

## Migration Plan

- **Step 1**: 定義 `FilterConfig` 接口，使其能與 `sources` 表中的 `keywords` 欄位對接。
- **Step 2**: 實作 `KeywordFilter` 核心邏輯類。
- **Step 3**: 修改 `SyncService`，在 `fetch` 與 `upsert` 之間插入 `KeywordFilter.filter()` 步驟。
- **Step 4**: 使用測試數據集驗證包含/排除邏輯的正確性。

## Open Questions

- 關鍵字的配置應該是全局的，還是每個 `Source` 擁有獨立的關鍵字列表？（目前的設計傾向於每個 Source 獨立配置）。
- 是否需要支持多語言關鍵字匹配（例如：同時匹配 "Artificial Intelligence" 與 "人工智能"）？
