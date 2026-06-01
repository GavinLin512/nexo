## 1. Setup & Authentication

- [ ] 1.1 Install `@octokit/rest` for GitHub API integration: `npm install @octokit/rest`
- [ ] 1.2 Add `GITHUB_TOKEN` to the `.env.local` and create a type-safe config wrapper to access it
- [ ] 1.3 Verify the API token works by making a simple authenticated call to `/user`

## 2. Dev.to Adapter Implementation

- [ ] 2.1 Create `DevToAdapter` class extending `BaseAdapter`
- [ ] 2.2 Implement `fetch()` method to call the Dev.to API (`/api/articles`) using fetch/axios
- [ ] 2.3 Implement `mapToDTO()` to convert Dev.to JSON response to `ArticleDTO`
- [ ] 2.4 Verify `DevToAdapter` can fetch articles based on a specific tag (e.g., "javascript")

## 3. GitHub Trending Adapter Implementation

- [ ] 3.1 Create `GitHubTrendingAdapter` class extending `BaseAdapter`
- [ ] 3.2 Implement the GitHub API search/trending logic using Octokit
- [ ] 3.3 Implement `mapToDTO()` to map repository descriptions to the `summary` field of `ArticleDTO`
- [ ] 3.4 Handle API Rate Limit errors with proper logging and `SyncResult` reporting

## 4. Integration & Final Verification

- [ ] 4.1 Register `GitHubTrendingAdapter` and `DevToAdapter` in the `SyncService` registry
- [ ] 4.2 Create a test script to run a full sync cycle including RSS, Medium, GitHub, and Dev.to
- [ ] 4.3 Verify that all four sources successfully push data into the `articles` table
- [ ] 4.4 Verify that the `SyncService` logs correctly differentiate between the various adapter results
