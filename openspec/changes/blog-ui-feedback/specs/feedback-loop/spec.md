## ADDED Requirements

### Requirement: Section-Level Feedback
The system SHALL provide a mechanism (e.g., Thumb Up/Down) for users to rate the quality of each specific section (Sentiment, Analysis, Prediction, Action) of a report.

#### Scenario: Providing Feedback
- **WHEN** a user clicks "Thumb Down" on the "Prediction" section of a report
- **THEN** the system creates a record in the `feedback` table linking the report ID, section type, and a negative score.

### Requirement: Feedback Integration to Agent
The system MUST be able to aggregate feedback for specific themes or sections to influence the `WeeklyReportAgent`'s prompt for future reports.

#### Scenario: Improving Report Quality
- **WHEN** the `WeeklyReportAgent` starts a new report for a theme that previously received high "Thumb Down" rates in the "Prediction" section
- **THEN** the system injects a hint into the prompt (e.g., "Previous reports on this theme were rated as too generic in predictions; please provide more concrete, data-backed forecasts").
