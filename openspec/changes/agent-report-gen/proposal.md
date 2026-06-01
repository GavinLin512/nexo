## Why

系統目前已能將文章聚類為主題，但仍缺乏最終的輸出產物。需要一個強大的分析 Agent，能將每個主題下的多篇文章綜合分析，並產出具有深度洞察的結構化週報，將原始數據轉化為可直接指導行動的產業情報。

## What Changes

- 實作 `WeeklyReportAgent`：負責對每個主題集群進行深度合成分析。
- 開發「四層報告 Prompt」：強制 AI 按照 **Sentiment (情感/趨勢) $\rightarrow$ Analysis (深度分析) $\rightarrow$ Prediction (預測) $\rightarrow$ Action (具體行動)** 的結構生成內容。
- 實作 JSON 數據提取邏輯：從報告中提取可視化所需的主題分佈數據。
- 建立報告生成工作流：將 `ClusteringService` 的輸出轉化為最終的 Markdown 報告。

## Capabilities

### New Capabilities
- `report-generation`: 支持將主題文章集群轉化為結構化的四層深度產業報告。

### Modified Capabilities
- 無

## Impact

- **LLM Usage**: 這是系統中 Token 消耗最高的部分，需要使用最強模型 (如 GPT-4o) 以確保分析深度。
- **Output**: 生成最終的 Markdown 格式報告。
- **Data Flow**: 數據流終點從「文章聚類」變為「結構化報告」。
