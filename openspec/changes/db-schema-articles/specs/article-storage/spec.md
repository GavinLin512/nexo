## ADDED Requirements

### Requirement: Article Metadata Storage
The system SHALL store articles with the following minimum fields: `id` (UUID, PK), `source_id` (UUID, FK to sources), `title` (String), `summary` (Text), `url` (String), and `published_at` (Timestamp).

#### Scenario: Article Persistence
- **WHEN** a new article is fetched via an adapter
- **THEN the system creates a record in the `articles` table linked to the correct source.

### Requirement: Article Uniqueness
The system MUST prevent duplicate articles from the same source based on the URL.

#### Scenario: Duplicate Prevention
- **WHEN** an adapter attempts to save an article with a URL that already exists for that source
- **THEN** the system updates the existing record instead of creating a duplicate.
