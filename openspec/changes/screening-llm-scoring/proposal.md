## Why

雖然關鍵字過濾能快速剔除噪音，但無法識別內容的實際品質與深層相關性。需要引入 LLM (Large Language Model) 進行語義分析並給出相關性評分，將真正高品質且具有洞察價值的文章篩選至「候選池 (Candidate Pool)」，為後續的週報生成提供精準的輸入。

## What Changes

- 實作 `AIScreeningService`：調用 LLM (如 GPT-4o-mini) 對文章標題與摘要進行評分。
- 設計專用的「相關性評分 Prompt」，要求模型輸出 0.0 到 1.0 的數值。
- 實作評分後的邏輯處理：僅將評分高於閾值 (例如 0.7) 的文章標記為 `Candidate`。
- 將 AI 篩選階段集成至 `SyncService` 的管線中，位於 `KeywordFilter` 之後。

## Capabilities

### New Capabilities
- `ai-llm-scoring`: 利用 LLM 進行文章的語義相關性評分與候選池篩選。

### Modified Capabilities
- 無

## Impact

- **Cost**: 引入 API Token 消耗（預計使用 GPT-4o-mini 以控制成本）。
- **Latency**: 數據同步流程將增加 LLM 響應時間。
- **Database**: `articles` 表需增加評分欄位 (e.g., `ai_score`) 與狀態標記 (e.g., `is_candidate`)。
