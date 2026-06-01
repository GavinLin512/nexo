# Project Task List: AI-Powered Industry Insight System

## 🗺️ OpenSpec Implementation Flow (Granular Changes)

```
[Phase 1: Infrastructure]
(1) project-init  ─────┐
(2) db-schema-base ────┤
(3) db-schema-articles ┘
            │
            ▼
[Phase 2: Data Ingestion]
(4) adapter-core ───────┐
(5) adapter-rss-medium ─┤
(6) adapter-github-devto┘
            │
            ▼
[Phase 3: AI Screening]
(7) screening-keyword-filter ──┐
(8) screening-llm-scoring ─────┘
            │
            ▼
[Phase 4: Core Analysis]
(9) agent-clustering ────┐
(10) agent-report-gen ───┤
(11) rag-memory-system ──┘
            │
            ▼
[Phase 5: Delivery & Loop]
(12) blog-ui-feedback
```

## 🛠️ Execution Order Reference
1. `project-init` $\rightarrow$ 2. `db-schema-base` $\rightarrow$ 3. `db-schema-articles` $\rightarrow$ 4. `adapter-core` $\rightarrow$ 5. `adapter-rss-medium` $\rightarrow$ 6. `adapter-github-devto` $\rightarrow$ 7. `screening-keyword-filter` $\rightarrow$ 8. `screening-llm-scoring` $\rightarrow$ 9. `agent-clustering` $\rightarrow$ 10. `agent-report-gen` $\rightarrow$ 11. `rag-memory-system` $\rightarrow$ 12. `blog-ui-feedback`

---

## Phase 1: Base Infrastructure & Data Ingestion
### Database (Supabase)
- [ ] Setup Supabase project and obtain API keys
- [ ] Enable `pgvector` extension in Supabase
- [ ] Design and create `profiles` table (user settings, preferences)
- [ ] Design and create `sources` table (RSS/API URLs, templates, keywords)
- [ ] Design and create `articles` table (title, summary, link, published_at, source_id)
- [ ] Design and create `article_embeddings` table (article_id, vector)
- [ ] Setup Prisma ORM and connect to Supabase

### Backend (Adapters)
- [ ] Initialize Next.js project with Tailwind and shadcn/ui
- [ ] Implement `BaseAdapter` interface for data ingestion
- [ ] Implement `RSSAdapter` for generic RSS feeds
- [ ] Implement `MediumAdapter` for Medium publications
- [ ] Implement `DevToAdapter` for Dev.to tags/users
- [ ] Implement `GitHubTrendingAdapter` for trending repos
- [ ] Create a `SyncService` to orchestrate adapter execution

### Infrastructure
- [ ] Setup cron job (e.g., via Upstash or GitHub Actions) to trigger `SyncService` every 4 hours
- [ ] Implement basic error logging for failed syncs

## Phase 2: Filtering & Pre-screening Pipeline
### Filtering
- [ ] Implement `KeywordFilter` (regex-based hard filter)
- [ ] Create API endpoint to manage user-defined keywords

### AI Pre-screening
- [ ] Setup OpenAI/Claude API integration
- [ ] Implement `AIScreeningService` using GPT-4o-mini
- [ ] Create prompt for relevance scoring (0.0 to 1.0)
- [ ] Implement logic to move high-score articles to `Candidate Pool`

### Management
- [ ] Create a basic admin view to see synced articles vs. screened articles

## Phase 3: Core AI Analyst Agent
### Analysis Workflow
- [ ] Implement `ClusteringService` to group candidate articles by theme
- [ ] Implement `MemoryService` for vector search in `article_embeddings`
- [ ] Develop the 4-Layer Report Prompt (L1: Sentiment, L2: Analysis, L3: Prediction, L4: Action)
- [ ] Implement the `WeeklyReportAgent` to synthesize final report
- [ ] Create logic to extract JSON data for charts from the report

### Memory & RAG
- [ ] Implement embedding generation for new reports to store in Vector DB
- [ ] Create retrieval logic to fetch context from previous weeks' reports

## Phase 4: Blog UI & Feedback Loop
### Frontend (Blog)
- [ ] Create main Layout with navigation
- [ ] Implement `ReportArchive` page (list of weekly reports)
- [ ] Implement `ReportDetail` page (Markdown rendering for the 4-layer report)
- [ ] Implement `SourceManager` page (UI for adding/editing sources and keywords)

### Visualization & Notifications
- [ ] Integrate Recharts to display theme distribution from AI JSON
- [ ] Setup Email notification service (Resend/SendGrid)
- [ ] Implement trigger to send email upon weekly report generation

### Feedback Loop
- [ ] Implement 👍/👎 buttons on report sections
- [ ] Create `Feedback` table in DB to store user reactions
- [ ] Integrate feedback into the `WeeklyReportAgent` system prompt for refinement
