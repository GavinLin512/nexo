# VibeHost: AI-Powered Industry Insight System Plan

## Project Goal
A private-by-default web hosting for agents that manages RSS/Multi-source feeds and generates weekly AI-driven industry analysis reports.

## System Architecture
`Multi-source Input (Adapters)` $\rightarrow$ `Hard Filter (Keyword)` $\rightarrow$ `Storage (DB)` $\rightarrow$ `AI Pre-screening (Fast LLM)` $\rightarrow$ `Candidate Pool` $\rightarrow$ `Weekly Report Generation (Agentic Workflow)` $\rightarrow$ `Blog-style Display` $\rightarrow$ `Email Notification` $\rightarrow$ `Feedback Loop` $\rightarrow$ `Memory Optimization (RAG)`

## Detailed Design

### 1. Input Pipeline
- **Adapters**: Adapter Pattern for Medium, Dev.to, GitHub Trending, and generic RSS.
- **Extensibility**: User-configurable via UI (URL + Template selection).
- **Sync**: Polling every 4 hours via Cron Job.

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
- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API / Server Actions
- **Database & Vector DB**: Supabase (PostgreSQL + pgvector)
- **AI**: OpenRouter/Kimi k2.6 (Analysis & Screening)
- **Scheduler**: Upstash Workflow / GitHub Actions

## Roadmap
- [ ] **Phase 1**: Base infrastructure, DB schema, and basic Adapters.
- [ ] **Phase 2**: Hard filtering and AI pre-screening pipeline.
- [ ] **Phase 3**: Core Agentic Workflow (Clustering, RAG, Four-Layer Generation).
- [ ] **Phase 4**: Blog UI, Charts, Feedback loop, and Email notifications.
