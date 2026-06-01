## ADDED Requirements

### Requirement: Source Configuration Interface
The system SHALL provide a management interface to create, edit, and delete data sources (RSS/API URLs).

#### Scenario: Adding a New Source
- **WHEN** a user adds a new RSS URL and specifies keywords in the SourceManager UI
- **THEN** the system updates the `sources` table in the database and the next sync cycle includes this source.

### Requirement: Keyword Management
The system MUST allow users to independently manage "Must-include" and "Must-exclude" keywords for each source.

#### Scenario: Updating Keywords
- **WHEN** a user removes a keyword from a source's exclude list
- **THEN** subsequent syncs for that source no longer filter out articles containing that keyword.
