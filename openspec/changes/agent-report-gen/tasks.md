## 1. Report Agent Core Implementation

- [ ] 1.1 Define the `Report` and `ThemeAnalysis` data models for the final output
- [ ] 1.2 Create the `WeeklyReportAgent` class with a `generateReport(themes: Theme[])` method
- [ ] 1.3 Develop the "Four-Layer" system prompt (Sentiment, Analysis, Prediction, Action)
- [ ] 1.4 Implement the LLM integration using GPT-4o with a high-quality temperature setting
- [ ] 1.5 Implement the logic to pass relevant article summaries and links into the prompt for each theme

## 2. Synthesis & Formatting

- [ ] 2.1 Implement a Markdown formatting utility to ensure consistent report layout
- [ ] 2.2 Implement the source link injection logic to ensure every claim is backed by a URL
- [ ] 2.3 Implement the JSON data extraction logic to pull `sentimentScore` and `weight` from the report
- [ ] 2.4 Create a `ReportManager` to handle the saving and archiving of generated reports

## 3. Integration & End-to-End Validation

- [ ] 3.1 Integrate `WeeklyReportAgent` with `ClusteringService` in a full pipeline script
- [ ] 3.2 Execute a full run: `Fetch` $\rightarrow$ `Filter` $\rightarrow$ `Score` $\rightarrow$ `Cluster` $\rightarrow$ `Report`
- [ ] 3.3 Verify that the generated report strictly adheres to the four-layer structure
- [ ] 3.4 Verify that the extracted JSON data is accurate and matches the report content
- [ ] 3.5 Perform a "blind test" with a subject matter expert to verify the depth of "Analysis" and "Prediction" layers
