## ADDED Requirements

### Requirement: Report Archive Navigation
The system SHALL provide a chronologically ordered list of all generated reports, including the date and primary themes.

#### Scenario: Browsing History
- **WHEN** a user visits the `/reports` page
- **THEN** they see a list of report cards, each allowing navigation to the specific report detail.

### Requirement: High-Fidelity Markdown Rendering
The system MUST render the four-layer report structure using consistent typography, ensuring a professional reading experience.

#### Scenario: Reading a Detailed Report
- **WHEN** a user opens a report detail page
- **THEN** they see clearly separated sections for Sentiment, Analysis, Prediction, and Action, with all source links rendered as clickable elements.

### Requirement: Theme Distribution Visualization
The system SHALL display a visual representation (e.g., Pie Chart) of the themes identified in the report.

#### Scenario: Visualizing Insight Focus
- **WHEN** viewing a report
- **THEN** a chart shows the percentage of articles assigned to each theme, allowing the user to quickly identify the week's dominant topic.
