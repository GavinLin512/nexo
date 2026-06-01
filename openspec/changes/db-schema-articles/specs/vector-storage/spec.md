## ADDED Requirements

### Requirement: Vector Extension Activation
The system SHALL ensure the `pgvector` extension is enabled in the Supabase PostgreSQL database.

#### Scenario: Extension Verification
- **WHEN** checking database extensions
- **THEN** `vector` is listed as an installed extension.

### Requirement: Embedding Storage
The system MUST implement an `article_embeddings` table with the following fields: `id` (UUID, PK), `article_id` (UUID, FK to articles, CASCADE DELETE), and `embedding` (vector(1536)).

#### Scenario: Embedding Association
- **WHEN** a vector representation of an article is generated
- **THEN** it is stored in the `article_embeddings` table linked to the corresponding article.

### Requirement: Similarity Search Support
The system SHALL support cosine similarity queries via SQL to find the nearest neighbors of a given vector.

#### Scenario: Vector Retrieval
- **WHEN** performing a search with a query vector
- **THEN** the system returns the top-K most similar articles based on the cosine distance operator (`<=>`).
