## ADDED Requirements

### Requirement: BaseAdapter Interface
The system SHALL define a `BaseAdapter` interface that requires a `fetch` method returning a standardized array of `ArticleDTO`.

#### Scenario: Interface Compliance
- **WHEN** a new adapter class is created
- **THEN** the TypeScript compiler must enforce the implementation of the `fetch` method with the correct return type.

### Requirement: SyncService Orchestration
The system MUST implement a `SyncService` that can register multiple `BaseAdapter` instances and execute them in a loop.

#### Scenario: Full Sync Cycle
- **WHEN** `SyncService.run()` is called
- **THEN** the system iterates through all registered adapters, calls their `fetch` methods, and logs the outcome for each.

### Requirement: Standardized Article DTO
The system SHALL define an `ArticleDTO` object containing: `title`, `summary`, `url`, `publishedAt`, and `sourceId`.

#### Scenario: Data Consistency
- **WHEN** an adapter returns data
- **THEN** the `SyncService` can pass this data directly to the database layer without further transformation.
