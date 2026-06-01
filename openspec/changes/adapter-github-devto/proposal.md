## Why

擴展數據攝取來源至開發者生態核心平台 GitHub 與 Dev.to。這使系統能捕捉到最前沿的技術趨勢、開源項目動態及開發者社群的實踐經驗，補足傳統 RSS feed 較少的技術深鑽內容。

## What Changes

- 實作 `GitHubTrendingAdapter`：透過 GitHub API 或 Trending 頁面抓取特定語言/類別的熱門倉庫與相關討論。
- 實作 `DevToAdapter`：利用 Dev.to API 抓取特定標籤 (Tags) 或用戶的最新文章。
- 實作將 GitHub/Dev.to 的特有元數據（如 Star 數、點贊數）映射至 `ArticleDTO` 或儲存於額外欄位。
- 將這兩個新適配器註冊至 `SyncService`。

## Capabilities

### New Capabilities
- `github-devto-ingestion`: 支持從 GitHub Trending 與 Dev.to API 抓取並標準化數據。

### Modified Capabilities
- 無

## Impact

- **External APIs**: 需配置 GitHub Personal Access Token (PAT) 以避免 API Rate Limit。
- **Dependencies**: 可能需要引入 `octokit` (GitHub 官方 SDK) 以簡化 API 調用。
- **Network**: 增加對 `api.github.com` 與 `dev.to` 的 HTTP 請求。
