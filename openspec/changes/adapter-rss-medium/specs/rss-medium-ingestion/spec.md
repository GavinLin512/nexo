## ADDED Requirements

### Requirement: Standard RSS Parsing
The system SHALL be able to parse standard RSS 2.0 and Atom feeds to extract title, link, pubDate, and content/summary.

#### Scenario: Successful RSS Fetch
- **WHEN** the `RSSAdapter` is provided with a valid RSS URL
- **THEN** it returns an array of `ArticleDTO` where each item contains the correctly mapped metadata from the feed.

### Requirement: Medium Feed Support
The system MUST support Medium's publication feeds (e.g., medium.com/feed/@username).

#### Scenario: Medium Ingestion
- **WHEN** the `MediumAdapter` is called with a Medium user handle
- **THEN** it fetches the corresponding feed and extracts the latest articles into `ArticleDTO` format.

### Requirement: Fallback Metadata Handling
The system SHALL provide fallback values for missing optional fields (e.g., a truncated version of the content if the summary field is empty).

#### Scenario: Missing Summary
- **WHEN** a feed item has no `<description>` or `<summary>` tag
- **THEN** the adapter extracts the first 200 characters of the content as the summary.
