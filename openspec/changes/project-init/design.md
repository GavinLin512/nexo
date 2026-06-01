## Context

本專案為 AI 產業洞察系統的起點。目前處於空白狀態，需要快速搭建一個現代化的前端與後端整合開發環境。

## Goals / Non-Goals

**Goals:**
- 建立符合業界標準的 Next.js 專案結構。
- 確保 UI 開發具有高度一致性（透過 shadcn/ui）。
- 建立可擴展的目錄結構，方便後續分模組開發。

**Non-Goals:**
- 實作任何業務邏輯。
- 配置資料庫連線（將在 `db-schema-base` 變更中處理）。
- 實作認證系統。

## Decisions

- **Framework: Next.js (App Router)**: 利用伺服器組件 (Server Components) 提升效能，並簡化路由管理。
- **Styling: Tailwind CSS**: 提供原子化 CSS，加速 UI 開發並減少 CSS 檔案體積。
- **UI Components: shadcn/ui**: 選擇 copy-paste 模式的組件庫而非 NPM 封裝庫，以便能完全掌控組件代碼並根據需求客製化。
- **TypeScript**: 強制使用 TypeScript 以確保大規模開發時的類型安全。

## Risks / Trade-offs

- [版本衝突] → 使用最新的穩定版 Next.js 與 React，並在 `package.json` 中鎖定版本。
- [組件冗餘] → 僅在需要時安裝 shadcn 組件，避免安裝不必要的 UI 模組。

## Migration Plan

- **Step 1**: 執行 `npx create-next-app` 並選擇 TypeScript, Tailwind, App Router。
- **Step 2**: 初始化 shadcn/ui 並配置 `components.json`。
- **Step 3**: 建立基礎目錄結構 (components, lib, hooks)。
- **Step 4**: 部署至本地開發環境並驗證 `npm run dev` 正常運行。

## Open Questions

- 是否需要集成特定的 Linting 規則（如 Airbnb 或 Google style guide）以維持團隊代碼一致性？
- 針對 UI 狀態管理，初期是否僅使用 React Context/useState，還是需要引入 Zustand/Redux？
