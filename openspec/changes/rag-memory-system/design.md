## Context

目前系統生成的週報是獨立的單次事件，AI 缺乏對過去週報內容的記憶，導致無法識別產業趨勢或追蹤蹤特定技術演進的軌跡。為了實現真正的「產業洞察」，系統需要將過去的分析結果轉化為可檢索的記憶體。

## Goals / Non-Goals

**Goals:**
- 實作 `MemoryService`：將生成的報告內容分塊 (Chunking) 並向量化儲存。
- 實作語義檢索邏輯：在生成新報告前，根據主題檢索最相關的歷史片段。
- 整合檢索結果至 `WeeklyReportAgent` 的 Prompt 中，實現 RAG (Retrieval-Augmented Generation)。
- 確保檢索的精確度，避免引入不相關的歷史噪音。

**Non-Goals:**
- 實作複雜的向量數據清理或過期機制 $\rightarrow$ 初期採取全量儲存。
- 實作跨用戶的記憶共享 $\rightarrow$ 目前僅針對單一管理員/系統級記憶。
- 實作複雜的圖譜記憶 (Knowledge Graph) $\rightarrow$ 僅使用向量相似度搜索。

## Decisions

- **Storage: pgvector (Supabase)**: 延用既有的 `pgvector` 基礎設施，將報告片段儲存於 `report_embeddings` 表中，保持架構簡單。
- **Embedding Model: text-embedding-3-small**: 使用 OpenAI 的高效能小模型，在成本與檢索精度之間取得平衡。
- **Retrieval Strategy: Top-K Cosine Similarity**: 採取最直接的餘弦相似度檢索，獲取前 K 個最相關片段。
- **Context Integration**: 將檢索到的片段以 `### Historical Context` 區塊的形式插入到 `WeeklyReportAgent` 的 Prompt 頂部。

## Risks / Trade-offs

- [檢索噪音] $\rightarrow$ 歷史報告可能包含已過時的資訊。對現有分析產生干擾。對策：在 Prompt 中明確指示 AI 「優先參考當前數據，歷史數據僅用於趨勢對比」。
- [上下文窗口壓力] $\rightarrow$ 引入歷史記憶會增加 Prompt 長度。對策：嚴格限制檢索片段的數量 (例如 3-5 個 chunks)。

## Migration Plan

- **Step 1**: 在資料庫中建立 `report_embeddings` 表 (id, report_id, content, embedding)。
- **Step 2**: 實作 `MemoryService` 的 `storeReport()` 方法，在報告生成後觸發。
- **Step 3**: 實作 `MemoryService` 的 `retrieveContext(theme)` 方法。
- **Step 4**: 修改 `WeeklyReportAgent` 的 Prompt 模板以接收歷史上下文。
- **Step 5**: 驗證報告中是否出現了對比上週或過去趨勢的描述。

## Open Questions

- 報告應該是以「全篇」向量化，還是按「主題」或「層級 (Layer)」分塊向量化？
- 是否需要為記憶系統引入「權重衰減」機制（越舊的報告權重越低）？
