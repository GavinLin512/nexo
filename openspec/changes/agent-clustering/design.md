## Context

在數據通過 `KeywordFilter` 與 `AIScreeningService` 後，我們獲得了一個高品質的候選文章池。然而，直接將數十篇零散的文章餵給 AI 生成報告會導致內容缺乏結構且容易遺漏重點。因此，需要一個聚類機制將相關內容分組，使 AI 能進行「主題式」的綜合分析。

## Goals / Non-Goals

**Goals:**
- 實作 `ClusteringService`：接收候選文章列表，輸出 `Theme[]` (主題名稱 + 文章 ID 列表)。
- 實作自動化主題命名：由 LLM 根據組內文章內容生成簡潔的標題。
- 確保聚類結果的穩定性：相同輸入在短時間內應產生一致的分組。

**Non-Goals:**
- 實作複雜的數學聚類算法（如 K-Means） $\rightarrow$ 優先使用 LLM 的語義理解能力進行分組。
- 實作動態調整的主題維度 $\rightarrow$ 初期由 LLM 自行決定最適主題數量。
- 實作持久化存儲聚類結果 $\rightarrow$ 聚類結果僅作為報告生成的臨時中間狀態。

## Decisions

- **Clustering Method: LLM-based Semantic Grouping**: 選擇將所有候選文章的標題與摘要一次性發送給 LLM，讓其直接返回分組後的 JSON。這種方法比先計算 Embedding 再聚類更靈活，且能直接獲得主題名稱。
- **Output Format: Structured JSON**: 強制 LLM 返回 `Array<{ theme: string, articleIds: string[] }>` 格式，以便程序直接處理。
- **Context Management**: 由於候選池可能較大，將僅發送標題與摘要，而非全文，以節省 Token 並避免超過上下文窗口。

## Risks / Trade-offs

- [上下文長度限制] $\rightarrow$ 若候選文章過多（例如 > 100 篇），單次 Prompt 可能超出限制。對策：實作分批聚類或先進行簡單的類別預分組。
- [分組不穩定性] $\rightarrow$ LLM 可能將同一篇文章分到不同主題。對策：設置 `temperature: 0` 並在 Prompt 中明確要求每篇文章僅能屬於一個主題。

## Migration Plan

- **Step 1**: 定義 `Theme` 與 `ClusterResult` 數據模型。
- **Step 2**: 實作 `ClusteringService` 及其 LLM Prompt 模板。
- **Step 3**: 實作 JSON 解析與驗證邏輯，確保返回結果符合預期結構。
- **Step 4**: 建立測試集（包含 3-4 個明顯不同主題的文章），驗證分組準確度。

## Open Questions

- 是否需要允許管理員手動調整聚類結果（合併或拆分主題）？
- 主題的數量是否需要設置上限（例如最多 5 個主題）？
