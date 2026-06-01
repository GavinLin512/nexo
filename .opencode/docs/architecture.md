# VibeHost Architecture

## System Workflow
`Multi-source Input (Adapters)` $\rightarrow$ `Hard Filter (Keyword)` $\rightarrow$ `Storage (DB)` $\rightarrow$ `AI Pre-screening (Kimi k2.6)` $\rightarrow$ `Candidate Pool` $\rightarrow$ `Weekly Report Generation (Agentic Workflow)` $\rightarrow$ `Blog-style Display` $\rightarrow$ `Email Notification` $\rightarrow$ `Feedback Loop` $\rightarrow$ `Memory Optimization (RAG)`

## Tech Stack
- **Frontend/Backend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Database**: Supabase (PostgreSQL + pgvector for RAG).
- **AI**: OpenRouter/Kimi k2.6 (Analysis & Screening).

## Design Patterns & Constraints
- **Adapters**: Use Adapter Pattern for Medium, Dev.to, GitHub, and RSS to ensure extensibility.
- **AI Workflow**: Reports must follow the "Four-Layer Structure":
    - L1 (Summary): Market sentiment.
    - L2 (Analysis): Trend analysis and value assessment.
    - L3 (Prediction): Industry impact.
    - L4 (Action): Final conclusions and key takeaways.
- **Database**: All vector operations must use `pgvector` via Supabase.
