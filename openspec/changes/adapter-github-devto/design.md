## Context

系統目前已具備基礎的數據攝取框架 (`adapter-core`) 及 RSS/Medium 實作。為了獲取更具技術前瞻性的洞察，需要接入開發者平台 GitHub 與 Dev.to，這類平台通常提供 JSON API 而非傳統 RSS，因此需要不同的解析策略。

## Goals / Non-Goals

**Goals:**
- 實作 `GitHubTrendingAdapter`：抓取 GitHub Trending 倉庫及其描述，將其視為「產業動態」文章。
- 實作 `DevToAdapter`：透過 Dev.to API 抓取特定標籤的文章，並轉換為 `ArticleDTO`。
- 實作 API 認證機制，使用 API Token 提高請求配額。
- 確保所有攝取的內容能通過 `SyncService` 流入 `articles` 表。

**Non-Goals:**
- 實作 GitHub 的詳細 Issue 或 PR 追蹤 $\rightarrow$ 僅關注 Trending 倉庫或特定 Repo 的概覽。
- 實作 Dev.to 的用戶互動功能（如點贊、評論）。
- 實作複雜的 Web Scraping $\rightarrow$ 優先使用官方 API。

## Decisions

- **Library: Octokit**: 針對 GitHub 攝取，使用官方的 `@octokit/rest` SDK 以獲得最佳的類型支持與請求管理。
- **API Strategy**: 
    - **GitHub**: 針對 Trending 頁面（非官方 API）可使用簡單的 HTML 解析或第三方 API，但建議優先嘗試官方 API 的 `search` 接口以獲取熱門項目。
    - **Dev.to**: 直接調用其公開的 JSON API (`/api/articles`)。
- **Data Mapping**: 由於 GitHub 倉庫沒有傳統的「文章摘要」，將使用倉庫的 `description` 作為 `summary`，並將 `stargazers_count` 等元數據暫存於摘要中或-忽略。

## Risks / Trade-offs

- [API Rate Limit] $\rightarrow$ 必須在環境變數中配置 `GITHUB_TOKEN`。實作適配器時加入簡單的請求延遲或處理 403 錯誤。
- [數據格式不統一] $\rightarrow$ GitHub 的「項目」與 Dev.to 的「文章」結構迥異。透過 `mapToDTO` 方法強制對齊，將 Repo 描述對應至文章摘要。

## Migration Plan

- **Step 1**: 安裝 `@octokit/rest` 與相關 HTTP 客戶端。
- **Step 2**: 實作 `DevToAdapter` 並驗證 JSON API 數據轉換。
- **Step 3**: 實作 `GitHubTrendingAdapter` 並配置 API 認證。
- **Step 4**: 在 `SyncService` 中註冊這兩個新適配器。
- **Step 5**: 執行全量同步並驗證 GitHub/Dev.to 數據正確進入資料庫。

## Open Questions

- GitHub Trending 的抓取是否需要支持特定語言（例如僅限 TypeScript/Python）？
- 是否需要為 Dev.to 的文章實作分頁抓取，還是僅獲取最新 10 篇？
