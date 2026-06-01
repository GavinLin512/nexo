## Why

目前的報告生成是孤立的，每一週的分析僅基於當週抓取的文章，缺乏歷史縱深。為了讓 AI 能識別趨勢（例如：「與上週相比，LLM 關注點從性能轉向了法律」），需要建立一個記憶系統，將過去的報告向量化並存儲，使 Agent 能檢索歷史上下文。

## What Changes

- 實作 `MemoryService`：負責將最終生成的報告內容轉化為向量並存入 `article_embeddings` (或獨立報告向量表)。
- 實作檢索邏輯：在 `WeeklyReportAgent` 生成新報告前，根據當前主題檢索最相關的 2-3 篇歷史報告片段。
- 優化 `WeeklyReportAgent` 的 Prompt：加入「歷史上下文」區塊，讓 AI 能進行對比分析。

## Capabilities

### New Capabilities
- `report-vector-memory`: 支持報告的向量化儲存與歷史語義檢索。

### Modified Capabilities
- `report-generation`: 修改報告生成流程，使其能夠接收並利用歷史記憶上下文。

## Impact

- **Database**: 增加向量儲存量，增加對 `pgvector` 的查詢頻率。
- **LLM Usage**: 增加一次檢索後的上下文拼接，略微增加 Token 消耗。
- **Report Quality**: 報告將從「單週快照」提升為「趨勢分析」。
