## 1. Core Logic Implementation

- [ ] 1.1 Define `Theme` and `ClusterResult` TypeScript interfaces
- [ ] 1.2 Create the `ClusteringService` class and its main `clusterArticles()` method
- [ ] 1.3 Design the LLM Prompt for semantic grouping, including specific JSON output constraints
- [ ] 1.4 Implement the LLM call using the `gpt-4o` (or `gpt-4o-mini`) model with `temperature: 0`
- [ ] 1.5 Implement a robust JSON parser to extract the theme array and handle potential LLM formatting errors

## 2. Theme Naming & Refinement

- [ ] 2.1 Implement the logic to ensure each article ID is assigned to exactly one theme (exclusive assignment)
- [ ] 2.2 Implement a refinement step to verify that generated theme names are concise and representative
- [ ] 2.3 Add a fallback mechanism to group "Uncategorized" articles if they don't fit any identified theme

## 3. Integration & Verification

- [ ] 3.1 Create a mock set of candidate articles covering 3-5 distinct industry topics
- [ ] 3.2 Run `ClusteringService` and verify the resulting JSON structure matches the `ClusterResult` type
- [ ] 3.3 Verify that the clustering logic correctly groups related articles and generates meaningful theme names
- [ ] 3.4 Test the service with a larger set of articles to ensure it handles context window limits gracefully
