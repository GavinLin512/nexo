# Agent Instructions: Nexo

## 📚 Knowledge Base (Lazy Loading)
Refer to these documents for detailed project context:
- **Architecture & Tech Stack**: `.opencode/docs/architecture.md`
- **Project Plan**: `.opencode/docs/plan.md`
- **Current Tasks**: `openspec/changes/*/tasks.md`

## 🛠️ Developer Commands
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`

## ⚠️ Critical Constraints (Do NOT Ignore)
- **UI**: ALWAYS use `shadcn/ui` components from `@/components/ui`. Do not implement custom primitive UI elements if a shadcn component exists.
- **AI**: Only use `OpenRouter/Kimi k2.6` for all analysis and screening tasks.
- **Database**: Never perform raw vector calculations in application code; offload all vector searches to Supabase/pgvector.
- **Consistency**: Strictly adhere to the "Four-Layer Structure" for all generated reports.
