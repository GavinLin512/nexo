# Nexo: AI-Powered Industry Insight System Plan

## Project Goal
A private-by-default web hosting for agents that manages RSS/Multi-source feeds and generates weekly AI-driven industry analysis reports.

## System Architecture
`Multi-source Input (Adapters)` $\rightarrow$ `Hard Filter (Keyword)` $\rightarrow$ `Storage (DB)` $\rightarrow$ `AI Pre-screening (Fast LLM)` $\rightarrow$ `Candidate Pool` $\rightarrow$ `Weekly Report Generation (Agentic Workflow)` $\rightarrow$ `Blog-style Display` $\rightarrow$ `Email Notification` $\rightarrow$ `Feedback Loop` $\rightarrow$ `Memory Optimization (RAG)`

## Detailed Design

### 1. Input Pipeline
- **Adapters**: Adapter Pattern for Medium, Dev.to, GitHub Trending, and generic RSS.
- **Extensibility**: User-configurable via UI (URL + Template selection). The UI writes directly to Supabase via the client SDK (protected by RLS), not through a Next.js backend.
- **Sync**: Polling every 4 hours via an external Cron Job (GitHub Actions / Upstash), NOT a Next.js server process.

### 2. Processing Layer
- **Filtering**: 
    - Layer 1: Hard keyword/regex filter before DB entry.
    - Layer 2: AI Pre-screening (Kimi k2.6) to score relevance.
- **Data**: Store title, summary, and original link.

### 3. AI Analyst Agent (Weekly Workflow)
- **Clustering**: Group candidate articles into 3-5 core themes.
- **Memory**: Retrieve historical reports via Vector DB (RAG) for continuity.
- **Four-Layer Structure**:
    - L1 (Summary): Market sentiment.
    - L2 (Analysis): Trend analysis and value assessment.
    - L3 (Prediction): Industry impact.
    - L4 (Action): Final conclusions and key takeaways.
- **Visualization**: Extract JSON data for trend charts.

### 4. Display & Feedback
- **UI**: Blog-style archive for weekly reports with Markdown support.
- **Feedback**: $\text{👍}/\text{👎}$ marking to optimize future AI prompts.
- **Notification**: Email alerts upon report completion.
- **Visuals**: Trend distribution charts (Recharts/Chart.js).

## Tech Stack
- **Frontend**: Next.js 14 (`output: 'export'`, static-only — no Next.js server), Tailwind CSS, shadcn/ui
- **Hosting**: VibeHost (Cloudflare static). The site ships as pure static files; there is no Next.js runtime.
- **Backend (Data)**: Supabase client SDK + Row Level Security — the static frontend reads/writes Supabase directly. NO Next.js API routes or Server Actions.
- **Backend (Pipeline)**: Supabase Edge Functions and/or GitHub Actions workers run all heavy/secret-bearing logic (ingestion, Kimi LLM screening, report generation, pgvector RAG, email). Secret keys (Kimi, Supabase `service_role`, SMTP) live only in these environments, never in the frontend bundle.
- **Database & Vector DB**: Supabase (PostgreSQL + pgvector)
- **AI**: OpenRouter/Kimi k2.6 (Analysis & Screening) — invoked only from Edge Functions / Actions, never client-side
- **Scheduler**: Upstash Workflow / GitHub Actions

## Static Export Constraints
Because of `output: 'export'`, the following rules are mandatory:
- No Next.js API routes / Server Actions / middleware / SSR / ISR.
- `next/image` must use `images.unoptimized: true` or a custom loader.
- Dynamic report detail pages (`/reports/[id]`) render via client-side fetch from Supabase (runtime data), not SSG — since reports are created after build time.
- All API keys stay server-side (Edge Functions / Actions env vars).

## Roadmap
- [ ] **Phase 1**: Base infrastructure, DB schema, and basic Adapters.
- [ ] **Phase 2**: Hard filtering and AI pre-screening pipeline.
- [ ] **Phase 3**: Core Agentic Workflow (Clustering, RAG, Four-Layer Generation).
- [ ] **Phase 4**: Blog UI, Charts, Feedback loop, and Email notifications.
