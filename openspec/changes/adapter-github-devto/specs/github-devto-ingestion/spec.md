## ADDED Requirements

### Requirement: GitHub Trending Data Fetching
The system SHALL be able to fetch trending repositories from GitHub, extracting the repository name, description, and URL.

#### Scenario: Successful GitHub Fetch
- **WHEN** the `GitHubTrendingAdapter` is triggered with a specific language filter
- **THEN** it returns an array of `ArticleDTO` where the repository description is mapped to the `summary` field.

### Requirement: Dev.to API Integration
The system MUST integrate with the Dev.to API to fetch articles based on specified tags or usernames.

#### Scenario: Dev.to Tag Fetch
- **WHEN** the `DevToAdapter` is called with the tag "ai"
- **THEN** it returns the latest articles from Dev.to containing that tag in `ArticleDTO` format.

### Requirement: API Authentication
The system SHALL use a GitHub Personal Access Token (PAT) to authorize requests and avoid rate limiting.

#### Scenario: Authenticated Request
- **WHEN** the `GitHubTrendingAdapter` makes a request to the GitHub API
- **THEN** it includes the `Authorization: token <token>` header, ensuring the request is not throttled.
