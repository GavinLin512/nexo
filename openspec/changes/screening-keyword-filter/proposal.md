## Why

在攝取大量外部數據後，系統會面臨嚴重的資訊噪音問題。需要一個快速、低成本的初步篩選機制，利用關鍵字匹配迅速剔除明顯不相關的文章，以減少後續高成本 LLM 預篩選的 Token 消耗與處理時間。

## What Changes

- 實作 `KeywordFilter` 服務，支持基於正則表達式 (Regex) 的硬篩選邏輯。
- 建立關鍵字管理邏輯，允許從 `sources` 表中讀取特定來源的包含/排除關鍵字。
- 實作篩選管線 (Filter Pipeline)，將其集成至數據同步流程中，在文章進入候選池前進行過濾。

## Capabilities

### New Capabilities
- `keyword-filtering`: 提供基於關鍵字的快速內容過濾能力。

### Modified Capabilities
- 無

## Impact

- **Code Architecture**: 在 `SyncService` 與資料庫寫入之間增加一個 `Filtering` 中間件。
- **Performance**: 由於使用正則匹配，處理速度極快，能顯著降低 LLM 呼叫頻率。
- **Database**: 需要讀取 `sources.keywords` 欄位。
