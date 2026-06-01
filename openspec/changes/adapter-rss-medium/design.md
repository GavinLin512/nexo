## Context

在建立了 `adapter-core` 的抽象框架後，系統現在需要具體的實作來獲取真實數據。RSS 是最通用且穩定的工業標準，而 Medium 則是高品質產業洞察的重要來源。

## Goals / Non-Goals

**Goals:**
- 實作 `RSSAdapter`：能夠解析標準的 RSS/Atom feed 並轉換為 `ArticleDTO`。
- 實作 `MediumAdapter`：專為 Medium 結構優化的適配器。
- 確保數據映射的魯棒性：即使來源缺失某些欄位（如摘要），也能提供合理的 fallback。
- 將適配器成功整合進 `SyncService` 並驗證數據能流向資料庫。

**Non-Goals:**
- 實作複雜的 HTML 內容清洗（Scraping） $\rightarrow$ 初期僅抓取摘要。
- 處理所有可能的非標準 RSS 變體 $\rightarrow$ 僅支持主流 RSS 2.0 與 Atom。
- 實作多執行緒並發抓取。

## Decisions

- **Library: rss-parser**: 選擇 `rss-parser` 庫而非手寫 XML 解析，以提高開發速度並確保對多種 RSS 標準的兼容性。
- **Medium Ingestion Strategy**: 由於 Medium 提供 RSS feed (medium.com/feed/@username)，`MediumAdapter` 將基於 `RSSAdapter` 的基礎邏輯進行特化，以簡化維護。
- **Data Transformation**: 在適配器內實作 `mapToDTO` 私有方法，將第三方格式嚴格對齊至系統定義的 `ArticleDTO`。

## Risks / Trade-offs

- [網路請求失敗] $\rightarrow$ 在 `fetch` 方法中加入 try-catch 塊，並透過 `SyncResult` 返回失敗狀態而非直接拋出異常導致同步中斷。
- [內容截斷] $\rightarrow$ 某些 RSS feed 的摘要過短，接受在 MVP 階段僅使用提供之摘要，未來在 `ai-screening` 階段再考慮抓取全文。

## Migration Plan

- **Step 1**: 安裝 `rss-parser` 依賴。
- **Step 2**: 實作 `RSSAdapter` 並通過單元測試驗證解析能力。
- **Step 3**: 實作 `MediumAdapter` 並驗證 Medium 專屬路徑解析。
- **Step 4**: 在 `SyncService` 中註冊這兩個適配器。
- **Step 5**: 執行同步流程並驗證數據正確寫入 `articles` 表。

## Open Questions

- 是否需要支持更多非標準的 RSS 擴展欄位（如 `dc:creator`）？
- 對於極大體積的 RSS XML 文件，是否需要引入 Streaming 解析以降低內存壓力？
