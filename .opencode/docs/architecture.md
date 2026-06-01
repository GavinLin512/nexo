# VibeHost Architecture

## System Workflow
`Multi-source Input (Adapters)` $\rightarrow$ `Hard Filter (Keyword)` $\rightarrow$ `Storage (DB)` $\rightarrow$ `AI Pre-screening (Kimi k2.6)` $\rightarrow$ `Candidate Pool` $\rightarrow$ `Weekly Report Generation (Agentic Workflow)` $\rightarrow$ `Blog-style Display` $\rightarrow$ `Email Notification` $\rightarrow$ `Feedback Loop` $\rightarrow$ `Memory Optimization (RAG)`

## Tech Stack
- **Frontend**: Next.js 14 (App Router) with `output: 'export'` (static-only, no Next.js server), TypeScript, Tailwind CSS, shadcn/ui. Hosted on VibeHost (Cloudflare static).
- **Backend (Data)**: Supabase client SDK + RLS — the static frontend reads/writes Supabase directly. No Next.js API routes or Server Actions.
- **Backend (Pipeline)**: Supabase Edge Functions / GitHub Actions workers run ingestion, LLM screening, report generation, RAG, and email. Secret keys live only here.
- **Database**: Supabase (PostgreSQL + pgvector for RAG).
- **AI**: OpenRouter/Kimi k2.6 (Analysis & Screening) — invoked only from Edge Functions / Actions, never client-side.

## Design Patterns & Constraints
- **Static Export**: The frontend is statically exported — NO API routes, Server Actions, SSR, ISR, or middleware. Dynamic data (reports, sources, feedback) is fetched client-side from Supabase at runtime. `next/image` requires `unoptimized: true` or a custom loader.
- **Secrets**: API keys (Kimi, Supabase `service_role`, SMTP) must never appear in the frontend bundle — they belong only in Edge Functions / Actions env vars. The frontend may only use the Supabase anon key under RLS.
- **Adapters**: Use Adapter Pattern for Medium, Dev.to, GitHub, and RSS to ensure extensibility.
- **AI Workflow**: Reports must follow the "Four-Layer Structure":
    - L1 (Summary): Market sentiment.
    - L2 (Analysis): Trend analysis and value assessment.
    - L3 (Prediction): Industry impact.
    - L4 (Action): Final conclusions and key takeaways.
- **Database**: All vector operations must use `pgvector` via Supabase.
