## ADDED Requirements

### Requirement: Semantic Article Grouping
The system SHALL be able to group a list of candidate articles into themes based on their semantic content (title and summary).

#### Scenario: Successful Clustering
- **WHEN** the `ClusteringService` processes 15 articles covering "LLM optimization", "AI Law", and "Robotics"
- **THEN** the system returns a structured list of themes where articles are correctly grouped by these three topics.

### Requirement: Automated Theme Naming
The system MUST generate a concise and representative name for each cluster of articles.

#### Scenario: Theme Name Generation
- **WHEN** a group of articles about "Llama-3" and "Mistral" is clustered together
- **THEN** the system assigns a theme name such as "Open Source LLM Progress".

### Requirement: Mutually Exclusive Assignment
The system SHALL ensure that each article is assigned to exactly one theme to avoid redundancy in the final report.

#### Scenario: Single Assignment
- **WHEN** an article fits into two potential themes
- **THEN** the system assigns it to the most dominant theme, ensuring no article ID appears in multiple clusters.
