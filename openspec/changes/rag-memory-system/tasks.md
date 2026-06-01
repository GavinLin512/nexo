## 1. Vector Storage Infrastructure

- [ ] 1.1 Create `report_embeddings` table in Supabase via Prisma: `id`, `reportId`, `content`, `embedding` (vector(1536))
- [ ] 1.2 Implement the `MemoryService` class with a `storeReport(report: Report)` method
- [ ] 1.3 Implement a report chunking utility to split long reports into semantic segments (e.g., by theme/layer)
- [ ] 1.4 Integrate the embedding API (e.g., OpenAI `text-embedding-3-small`) to generate vectors for each chunk
- [ ] 1.5 Verify that report chunks are correctly stored in the database with corresponding vectors

## 2. Retrieval & RAG Integration

- [ ] 2.1 Implement `MemoryService.retrieveContext(query: string, k: number)` using pgvector cosine similarity (`<=>`)
- [ ] 2.2 Create a context-formatting utility to turn retrieved chunks into a clean `### Historical Context` string
- [ ] 2.3 Modify `WeeklyReportAgent` to call `retrieveContext()` for each theme before generation
- [ ] 2.4 Update the `WeeklyReportAgent` system prompt to instruct the AI on how to use the provided historical context for trend analysis

## 3. Verification & Quality Assurance

- [ ] 3.1 Store two sample reports from different weeks with a common theme (e.g., "AI Law")
- [ ] 3.2 Execute a retrieval query for "AI Law" and verify that the most relevant chunks from previous reports are returned
- [ ] 3.3 Generate a new report and verify that it contains a comparative insight (e.g., "compared to previous reports...")
- [ ] 3.4 Verify that the system handles cases with no historical memory (first run) gracefully without crashing
