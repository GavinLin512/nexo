## Context

在完成基礎環境搭建後，系統需要一個持久化層來儲存用戶配置與追蹤的數據來源。本模組專注於建立最核心的關係型數據表。

## Goals / Non-Goals

**Goals:**
- 建立 Supabase 與 Prisma 的連線管道。
- 定義 `profiles` 表：儲存用戶 ID, 偏好設置, 系統配置。
- 定義 `sources` 表：儲存來源名稱, URL, 類型 (RSS/API), 以及該來源關聯的關鍵字。
- 確保 Schema 可以透過 Prisma 快速同步至 Supabase。

**Non-Goals:**
- 實作具體的 CRUD API（將在後續模組處理）。
- 建立文章內容表或向量表（將在 `db-schema-articles` 處理）。
- 實作複雜的行級安全策略 (RLS)（初期僅定義基礎權限）。

## Decisions

- **Schema Management: Prisma**: 使用 Prisma Schema 文件作為 Single Source of Truth，透過 `prisma db push` 快速迭代。
- **Database: Supabase (PostgreSQL)**: 利用其托管特性簡化部署。
- **Table Design**: 
    - `profiles`: 一對一關聯至 Supabase Auth User。
    - `sources`: 獨立表，允許未來擴展至多用戶共享來源。

## Risks / Trade-offs

- [Schema 變更風險] $\rightarrow$ 在開發階段使用 `db push`，在生產環境切換至 `prisma migrate`。
- [性能考量] $\rightarrow$ 目前數據量小，優先選擇開發速度，索引將在後續數據量增加時再優化。

## Migration Plan

- **Step 1**: 配置 Supabase 項目並獲取連接字符串。
- **Step 2**: 安裝 Prisma 並初始化 `schema.prisma`。
- **Step 3**: 定義 `Profile` 與 `Source` 模型。
- **Step 4**: 執行 `npx prisma db push` 同步至雲端資料庫。
- **Step 5**: 使用 Prisma Studio 驗證表結構。

## Open Questions

- 是否需要為 `sources` 表增加 liveness check 欄位以追蹤 URL 是否失效？
- `preferences` 欄位的 JSON 結構是否需要定義具體的 TypeScript Interface 以確保一致性？
