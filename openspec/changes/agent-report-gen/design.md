## Context

系統已經完成了數據攝取、關鍵字過濾、AI 相關性評分以及主題聚類。目前我們擁有一個由多個主題組成的結構，每個主題包含數篇高品質文章。最後一步是將這些碎片化的資訊轉化為一份具有專業洞察力的週報。

## Goals / Non-Goals

**Goals:**
- 實作 `WeeklyReportAgent`：負責對每個主題集群進行綜合分析並生成報告。
- 實作「四層結構化 Prompt」：強制輸出 Sentiment, Analysis, Prediction, Action 四個維度。
- 實作 JSON 數據提取：從生成的 Markdown 報告中提取結構化數據（如主題權重、情感分），以便前端可視化。
- 確保報告具有可追溯性：在報告中正確引用來源文章的鏈接。

**Non-Goals:**
- 實作自動發布到社交平台 $\rightarrow$ 本模組僅負責生成報告內容。
- 實作多輪對話式報告修改 $\rightarrow$ 初期採取單次生成模式。
- 實作複雜的排版引擎 $\rightarrow$ 輸出標準 Markdown 即可。

## Decisions

- **Model: openrouter/kimi-k2.6**: 選擇 Kimi k2.6 作為報告生成的模型。該模型在長文本理解與中文分析能力上具有極強競爭力，能夠更自然地處理產業分析的語境並產出高質量的中文報告。
- **Prompt Engineering: Chain-of-Thought (CoT)**: 在 Prompt 中要求模型先分析每篇文章的重點，再進行綜合合成，以避免遺漏關鍵資訊。
- **Structure: Layered Approach**: 採用層級化輸出，確保讀者能快速獲取結論（Sentiment），也能深入研究細節（Analysis）並獲得行動指南（Action）。

## Risks / Trade-offs

- [Token 消耗] $\rightarrow$ 深度分析需要輸入大量文章內容。對策：僅輸入文章的摘要而非全文，並在必要時僅針對關鍵段落進行檢索。
- [內容重複] $\rightarrow$ 不同主題之間可能存在重疊。對策：在 Prompt 中要求模型識別並整合跨主題的共性。

## Migration Plan

- **Step 1**: 定義 `Report` 與 `ThemeAnalysis` 數據模型。
- **Step 2**: 開發並調試「四層報告」Prompt，使用樣本數據驗證輸出質量。
- **Step 3**: 實作 `WeeklyReportAgent` 的主邏輯，將其與 `ClusteringService` 對接。
- **Step 4**: 實作 Markdown 到 JSON 的提取邏輯。
- **Step 5**: 執行完整端到端測試：從數據同步 $\rightarrow$ 聚類 $\rightarrow$ 報告生成。

## Open Questions

- 報告的總長度是否需要限制？
- 是否需要在報告中加入 AI 的「自信度」評分？
