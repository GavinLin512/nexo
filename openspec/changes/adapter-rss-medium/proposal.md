## Why

實作具體的數據攝取適配器，使系統能夠真正從現實世界的 RSS Feed 與 Medium  publications 中獲取資訊，將 `adapter-core` 的抽象接口轉化為實際的數據流。

## What Changes

- 實作 `RSSAdapter`：支持標準 RSS 2.0 與 Atom 格式解析。
- 實作 `MediumAdapter`：針對 Medium 的 publication 結構進行優化解析。
- 實作將解析後的數據映射至 `ArticleDTO` 的轉換邏輯。
- 將這兩個適配器註冊至 `SyncService` 中。

## Capabilities

### New Capabilities
- `rss-medium-ingestion`: 支持從 RSS 與 Medium 抓取並標準化數據。

### Modified Capabilities
- 無

## Impact

- **Dependencies**: 需引入 `rss-parser` 庫來處理 XML 解析。
- **Network**: 增加對外部 RSS/HTTP 端點的請求。
- **Database**: 正式開始向 `articles` 表寫入真實數據。
