## Context

系統目前已完成從數據攝取、AI 篩選、聚類分析與報告生成的所有後端邏輯。目前所有產出僅存在於資料庫中，缺乏用戶交互界面。為了讓週報真正可用，需要建立一個專業的展示平台，並引入反饋機制以優化 AI 的分析質量。

## Goals / Non-Goals

**Goals:**
- 建立結構化的週報展示界面（Archive $\rightarrow$ Detail）。
- 實作數據源管理後台，允許動態調整抓取目標與關鍵字。
- 實作反饋系統，讓用戶能對 AI 的各個分析維度（情感、預測等）進行評分。
- 使用圖表可視化主題分佈，讓用戶一眼看出本週產業重心。

**Non-Goals:**
- 實作複雜的用戶註冊/登入流程 $\rightarrow$ 初期僅提供管理員單一入口。
- 實作實時聊天機器人 $\rightarrow$ 本系統定位為定時報告平台而非對話式助手。
- 實作完整的 CMS 編輯器 $\rightarrow$ 報告內容由 AI 生成，僅提供簡單的元數據編輯。

## Decisions

- **Rendering: react-markdown + Tailwind Typography**: 使用 `react-markdown` 結合 Tailwind 的 `prose` 類，確保 AI 生成的 Markdown 報告具有出版級的視覺效果。
- **Visuals: Recharts**: 選擇 `Recharts` 作為圖表庫，用於呈現主題權重分佈圖（Pie Chart）與情感趨勢圖（Line Chart）。
- **State Management: Supabase Client SDK + Optimistic UI**: 因採用靜態匯出 (`output: 'export'`)，**不使用** Next.js Server Actions。反饋提交與來源編輯由前端透過 Supabase client SDK（anon key + RLS）直接寫入資料庫，並使用 Optimistic UI 提升交互流暢度。所有寫入權限由 RLS 控管，前端不持有任何 secret key。
- **Feedback Architecture**: 建立 `feedback` 表，記錄 `{ report_id, section_type, score (1/-1), user_comment }`，以便後續將統計數據注入 AI 的 System Prompt 中。

## Risks / Trade-offs

- [內容過長導致的排版問題] $\rightarrow$ 實作固定寬度的閱讀容器 (max-w-3xl) 並對長表格進行水平滾動處理。
- [反饋數據噪音] $\rightarrow$ 初期僅記錄二元反饋 ($\text{👍}/\text{👎}$)，避免複雜評分導致的數據稀疏。

## Migration Plan

- **Step 1**: 建立 `feedback` 資料表並同步至 Supabase。
- **Step 2**: 實作 `ReportArchive` 與 `ReportDetail` 頁面，完成 Markdown 渲染流程。
- **Step 3**: 開發 `SourceManager` 界面，對接 `sources` 表的 CRUD 操作。
- **Step 4**: 集成 `Recharts` 視覺化組件。
- **Step 5**: 實作反饋按鈕與後端儲存邏輯。

## Open Questions

- 是否需要支持將報告導出為 PDF 或 Email 格式？
- 反饋數據應該如何定量地影響 `WeeklyReportAgent` 的 Prompt？（例如：若-1 票數過多，則在下週增加「批判性分析」的權重）。
