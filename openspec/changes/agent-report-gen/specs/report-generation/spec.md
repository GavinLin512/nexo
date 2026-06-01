## ADDED Requirements

### Requirement: Four-Layer Report Structure
The system SHALL generate a report for each theme that strictly follows a four-layer structure: Sentiment, Analysis, Prediction, and Action.

#### Scenario: Successful Layered Generation
- **WHEN** the `WeeklyReportAgent` processes a theme cluster
- **THEN** the output Markdown contains four distinct sections with the headers: "Sentiment", "Analysis", "Prediction", and "Action".

### Requirement: Source Traceability
The system MUST include clickable source links for every key insight or claim made in the report.

#### Scenario: Reference Verification
- **WHEN** the AI mentions a specific technical breakthrough in the "Analysis" section
- **THEN** a corresponding URL from the source articles is provided as a footnote or inline link.

### Requirement: Structured Data Extraction
The system SHALL extract a JSON summary from the final report to enable dashboard visualizations.

#### Scenario: Metadata Extraction
- **WHEN** the report is finalized
- **THEN** the system extracts a JSON object containing `themeName`, `overallSentimentScore` (0-1), and `importanceWeight` (0-1).
