## 1. Type Definitions & Interface

- [ ] 1.1 Define the `ArticleDTO` TypeScript interface with required fields: `title`, `summary`, `url`, `publishedAt`, `sourceId`
- [ ] 1.2 Create the `BaseAdapter` abstract class or interface defining the `fetch()` method
- [ ] 1.3 Implement a `SyncResult` type to track the success/failure and count of articles fetched per adapter

## 2. SyncService Implementation

- [ ] 2.1 Create the `SyncService` class with a private registry to hold `BaseAdapter` instances
- [ ] 2.2 Implement the `registerAdapter()` method to add new adapters to the registry
- [ ] 2.3 Implement the `run()` method to iterate through registered adapters and call `fetch()`
- [ ] 2.4 Implement basic error handling within the `run()` loop to prevent one failed adapter from stopping the entire process
- [ ] 2.5 Add basic console logging to output the start, end, and result of each adapter's execution

## 3. Core Integration & Verification

- [ ] 3.1 Create a `MockAdapter` that returns hardcoded `ArticleDTO` data for testing
- [ ] 3.2 Implement a test script to register the `MockAdapter` in `SyncService` and execute `run()`
- [ ] 3.3 Verify that `SyncService` correctly handles multiple registered adapters
- [ ] 3.4 Verify that `SyncResult` accurately reflects the number of articles returned by the mock adapter
