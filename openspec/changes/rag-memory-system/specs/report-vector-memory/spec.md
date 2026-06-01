## ADDED Requirements

### Requirement: Report Embedding Storage
The system SHALL generate embeddings for generated reports and store them in a dedicated `report_embeddings` table.

#### Scenario: Report Archiving
- **WHEN** a weekly report is finalized and saved
- **THEN** the system splits the report into semantic chunks, generates vectors for each, and stores them in the database.

### Requirement: Semantic Context Retrieval
The system MUST be able to retrieve the most relevant historical report fragments based on the current theme of the current analysis.

#### Scenario: Historical Context Fetch
- **WHEN** the `WeeklyReportAgent` begins analyzing a theme (e.g., "AI Law")
- **THEN** the system performs a vector search and returns the Top-K most similar fragments from previous reports.

### Requirement: RAG Integration in Prompt
The system SHALL integrate the retrieved historical context into the `WeeklyReportAgent`'s prompt to enable trend analysis.

#### Scenario: Trend-Aware Generation
- **WHEN** the agent generates a report using retrieved historical context
- **THEN** the final output includes comparative insights (e.g., "Unlike last month where X was dominant, current trends show a shift towards Y").
