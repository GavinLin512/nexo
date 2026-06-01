## ADDED Requirements

### Requirement: LLM Relevance Scoring
The system SHALL use an LLM to assign a relevance score between 0.0 and 1.0 to articles that have passed the keyword filter.

#### Scenario: High Relevance Scoring
- **WHEN** an article contains deep insights into the target industry specified in the prompt
- **THEN** the system assigns a score > 0.7 and marks `is_candidate = true` in the database.

### Requirement: Structured Output Parsing
The system MUST ensure that the LLM output is parsed as JSON to extract the numeric score.

#### Scenario: Valid JSON Response
- **WHEN** the LLM returns `{ "score": 0.8, "reason": "..." }`
- **THEN** the system correctly updates the `ai_score` field in the `articles` table to 0.8.

### Requirement: Candidate Pool Filtering
The system SHALL only mark articles as candidates if their `ai_score` exceeds a configurable threshold (default 0.7).

#### Scenario: Low Score Exclusion
- **WHEN** an article is assigned a score of 0.4
- **THEN** the system sets `is_candidate = false`, and the article is excluded from the final report generation phase.
