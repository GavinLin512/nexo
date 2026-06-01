## Why

目前系統的所有能力都集中在後端自動化管線中，缺乏直觀的界面讓使用者查看生成的報告、管理數據來源並提供反饋。建立前端 UI 是將 AI 洞察轉化為實際價值的最後一步，同時透過反饋循環（Feedback Loop）讓 AI 能根據使用者偏好持續優化報告品質。

## What Changes

- 實作 `ReportArchive` 頁面：以時間軸形式列出所有歷史週報。
- 實作 `ReportDetail` 頁面：使用高品質 Markdown 渲染四層結構報告，並集成來源鏈接。
- 實作 `SourceManager` 頁面：提供 CRUD 界面用於新增/編輯數據源及其關鍵字。
- 實作反饋系統：在報告各個層級加入 $\text{👍}/\text{👎}$ 按鈕，並將結果儲存至資料庫。
- 實作可視化儀表板：使用 Recharts 呈現主題分佈與情感趨勢。

## Capabilities

### New Capabilities
- `report-ui`: 提供結構化週報的展示與導航界面。
- `source-management-ui`: 提供數據源與過濾關鍵字的圖形化管理界面。
- `feedback-loop`: 實作使用者反饋收集機制並將其回饋至分析 Agent。

### Modified Capabilities
- 無

## Impact

- **Frontend**: 增加多個頁面與複雜的 Markdown 渲染組件。
- **Database**: 需建立 `feedback` 表用於儲存使用者反應。
- **User Experience**: 系統從「黑盒工具」轉變為「可交互的產業洞察平台」。
