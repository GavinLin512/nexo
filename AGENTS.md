# Agent Instructions: Nexo

## 📚 Knowledge Base (Lazy Loading)
Refer to these documents for detailed project context:
- **Architecture & Tech Stack**: `.opencode/docs/architecture.md`
- **Project Plan**: `.opencode/docs/plan.md`
- **Deployment**: `.opencode/docs/deploy.md`
- **Current Tasks**: `openspec/changes/*/tasks.md`

## 🛠️ Developer Commands
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`

## ⚠️ Critical Constraints (Do NOT Ignore)
- **File Deletion**: NEVER use `rm`, `truncate`, or any other deletion/overwrite commands without explicitly asking the user for confirmation first.
- **UI**: ALWAYS use `shadcn/ui` components from `@/components/ui`. Do not implement custom primitive UI elements if a shadcn component exists.
- **AI**: Only use `OpenRouter/Kimi k2.6` for all analysis and screening tasks.
- **Database**: Never perform raw vector calculations in application code; offload all vector searches to Supabase/pgvector.
- **Static Export**: The frontend MUST stay statically exportable (`output: 'export'`). NEVER use Next.js API routes, Server Actions, SSR, ISR, or middleware. Frontend data access goes through the Supabase client SDK (anon key + RLS); all secret-bearing logic (LLM, `service_role`, SMTP) runs in Supabase Edge Functions / GitHub Actions, never in the frontend bundle.
- **Consistency**: Strictly adhere to the "Four-Layer Structure" for all generated reports.
