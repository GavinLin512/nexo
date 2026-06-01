## Why

建立系統的數據持久層，定義核心用戶配置文件與數據源管理表，為後續的自動化數據攝取與用戶偏好設定提供基礎存儲。

## What Changes

- 配置 Supabase 與專案的連線。
- 建立 `profiles` 表，用於儲存用戶設定與偏好。
- 建立 `sources` 表，用於定義 RSS/API 數據源及其追蹤關鍵字。

## Capabilities

### New Capabilities
- `base-schema`: 定義並部署核心管理表結構。

### Modified Capabilities
- 無

## Impact

- **Infrastructure**: 需在 Supabase 中執行 SQL 遷移或透過 Prisma Push 同步。
- **Dependencies**: 引入 `@prisma/client` 與 `prisma` 開發依賴。
