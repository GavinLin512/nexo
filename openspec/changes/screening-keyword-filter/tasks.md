## 1. Filter Logic Implementation

- [ ] 1.1 Define `FilterConfig` type for managing include/exclude keyword lists
- [ ] 1.2 Create the `KeywordFilter` class with a `filter(article: ArticleDTO, config: FilterConfig): boolean` method
- [ ] 1.3 Implement the "Must-exclude" (Blacklist) logic using `RegExp`
- [ ] 1.4 Implement the "Must-include" (Whitelist) logic using `RegExp`
- [ ] 1.5 Implement a pre-compilation cache for `RegExp` objects to optimize repeated matching

## 2. Integration with Sync Pipeline

- [ ] 2.1 Modify `SyncService` to retrieve keyword configurations from the `sources` table before processing articles
- [ ] 2.2 Insert the `KeywordFilter.filter()` call into the `SyncService` loop between the `fetch` and `upsert` stages
- [ ] 2.3 Implement a logging mechanism to record which articles were filtered out and why (e.g., "Filtered by exclude keyword: 'promotion'")
- [ ] 2.4 Update the `SyncResult` type to include a `filteredCount` field

## 3. Verification & Testing

- [ ] 3.1 Create a test suite with sample articles and diverse keyword configurations (include, exclude, both)
- [ ] 3.2 Verify that "Must-exclude" takes priority over "Must-include"
- [ ] 3.3 Verify that articles without any matching keywords are handled according to the default policy (e.g., filtered out if a whitelist exists)
- [ ] 3.4 Perform an end-to-end test run of `SyncService` and verify the number of articles reaching the `articles` table matches the expected filtered count
