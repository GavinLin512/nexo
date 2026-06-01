## Why

目前的候選池僅包含了一組扁平的文章列表。為了生成有深度且有組織的產業報告，需要將這些文章按照主題進行「聚類 (Clustering)」，使 AI 分析 Agent 能夠針對每個特定主題（例如：「LLM 性能優化」或「AI 法律法規」）進行綜合分析，而非單獨處理每篇文章。

## What Changes

- 實作 `ClusteringService`：利用 LLM 掃描候選池中的所有文章標題與摘要，並將其分組。
- 實作主題自動命名邏輯：為每個聚類群組生成一個精簡且具代表性的主題名稱。
- 建立 `Theme` 數據結構：定義主題名稱與其關聯的文章 ID 列表。
- 提供聚類結果的 API 接口，供後續的 `WeeklyReportAgent` 調用。

## Capabilities

### New Capabilities
- `article-clustering`: 支持將非結構化的候選文章自動分組為具有意義的主題集群。

### Modified Capabilities
- 無

## Impact

- **Code Architecture**: 引入新的 `ClusteringService` 模組。
- **LLM Usage**: 增加一次對全量候選池內容的掃描請求（通常使用較長的 Context Window）。
- **Data Flow**: 數據流從「文章列表」轉變為「主題 $\rightarrow$ 文章列表」的層級結構。
