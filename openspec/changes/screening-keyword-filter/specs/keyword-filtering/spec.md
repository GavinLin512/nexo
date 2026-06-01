## ADDED Requirements

### Requirement: Regex-based Content Filtering
The system SHALL filter articles based on a list of keywords using regular expressions, scanning both the title and summary.

#### Scenario: Successful Exclusion
- **WHEN** an article contains a keyword from the "Must-exclude" list (e.g., "promotion", "discount")
- **THEN** the system marks the article as filtered and prevents it from entering the candidate pool.

### Requirement: Must-include Logic
The system SHALL only allow articles to pass if they match at least one keyword from the "Must-include" list, provided no exclude keywords are present.

#### Scenario: Successful Inclusion
- **WHEN** an article matches a "Must-include" keyword (e.g., "LLM", "Transformer") and no exclude keywords are found
- **THEN** the system allows the article to proceed to the next stage of the pipeline.

### Requirement: Source-Specific Filter Configuration
The system MUST apply filtering rules based on the configuration associated with the specific `source_id` of the article.

#### Scenario: Differing Rules per Source
- **WHEN** Source A has keyword "AI" and Source B has keyword "Quantum"
- **THEN** the system applies the "AI" filter to articles from Source A and the "Quantum" filter to articles from Source B.
