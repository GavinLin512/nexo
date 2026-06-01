## Context

系統目前已實作 `KeywordFilter`，能高效地剔除明顯不相關的文章。然而，關鍵字匹配無法理解上下文（例如：「AI」一詞可能出現在無關的廣告中）。為了確保進入最終分析階段的文章具有高價值，需要引入 LLM 進行語義級別的評分。

## Goals / Non-Goals

**Goals:**
- 實作 `AIScreeningService`，封裝與 LLM (GPT-4o-mini) 的交互邏輯。
- 設計一套結構化的 Prompt，使模型能根據文章內容與用戶目標，輸出精確的相關性分數 (0.0-1.0)。
- 實作評分後的後處理邏輯：將高分文章標記為 `is_candidate = true`。
- 將 AI 篩選階段集成至 `SyncService` 的管線中，位於 `KeywordFilter` 之後。

**Non-Goals:**
- 在此階段進行深度摘要或分析 $\rightarrow$ 此工作由 `industry-analysis` 模組負責。
- 實作多模型投票機制 $\rightarrow$ 初期僅使用單一高性能小模型。
- 實作實時 UI 評分界面 $\rightarrow$ 本模組僅為後端自動化管線。

## Decisions

- **Model: GPT-4o-mini**: 選擇 mini 模型而非 GPT-4o，因為相關性評分屬於較簡單的分類任務，mini 模型在保持高準確度的同時能顯著降低 Token 成本並提升響應速度。
- **Output Format: JSON/Numeric**: 強制模型輸出 JSON 格式 (例如 `{ "score": 0.85, "reason": "..." }`)，以便程序化解析分數並儲存理由。
- **Prompting Strategy: Few-Shot Prompting**: 在 Prompt 中提供 2-3 個「高品質」與「低品質」文章的示例，以校準模型的評分標準。

## Risks / Trade-offs

- [API 延遲] $\rightarrow$ LLM 呼叫比正則匹配慢得多。對策：僅對通過 `KeywordFilter` 的文章進行 AI 評分，大幅減少呼叫次數。
- [評分不穩定] $\rightarrow$ LLM 可能對相同內容給出不同分數。對策：將 `temperature` 設置為 0 以增加結果的可重複性。

## Migration Plan

- **Step 1**: 更新 `articles` 表結構，增加 `ai_score` (Float) 與 `is_candidate` (Boolean) 欄位。
- **Step 2**: 實作 `AIScreeningService` 並完成 Prompt 工程。
- **Step 3**: 修改 `SyncService`，在 `KeywordFilter` 之後調用 `AIScreeningService`。
- **Step 4**: 使用已知相關與不相關的文章集進行 linter 測試，驗證評分分佈。

## Open Questions

- 是否需要允許用戶自定義評分閾值 (Threshold)？
- 如果 LLM 輸出格式錯誤，應該採取重試機制還是直接將該文章視為低分剔除？
