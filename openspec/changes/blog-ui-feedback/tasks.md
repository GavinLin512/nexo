## 1. Frontend Infrastructure & Report Display

- [ ] 1.1 Install `react-markdown` and `tailwind-merge` for high-fidelity report rendering
- [ ] 1.2 Implement `ReportArchive` page: a chronological list of report cards using shadcn/ui
- [ ] 1.3 Implement `ReportDetail` page: a professional reading layout with `prose` (Tailwind Typography)
- [ ] 1.4 Create a Markdown rendering component that handles source links as clickable footnotes
- [ ] 1.5 Integrate `Recharts` to create a Theme Distribution Pie Chart on the report header

## 2. Source Management Interface

- [ ] 2.1 Create `SourceManager` page with a data table listing all current sources
- [ ] 2.2 Implement the "Add Source" modal with fields for URL, Name, and Type
- [ ] 2.3 Implement the "Keyword Editor" component for managing Must-include/Must-exclude lists
- [ ] 2.4 Implement Server Actions for CRUD operations on the `sources` table
- [ ] 2.5 Verify that updating keywords in the UI immediately affects the next `SyncService` run

## 3. Feedback Loop & Data Collection

- [ ] 3.1 Create the `feedback` table in Supabase: `id`, `reportId`, `sectionType`, `score`, `comment`, `createdAt`
- [ ] 3.2 Implement the Thumb Up/Down interactive buttons for each of the 4 report layers
- [ ] 3.3 Implement the API endpoint/Server Action to save user feedback to the DB
- [ ] 3.4 Create a utility to aggregate feedback (e.g., "average score per section") for the AI Agent
- [ ] 3.5 Integrate the feedback summary into the `WeeklyReportAgent` prompt to refine future outputs

## 4. Final E2E Integration & Polish

- [ ] 4.1 Verify the full flow: Update Source $\rightarrow$ Sync Data $\rightarrow$ Generate Report $\rightarrow$ View in UI $\rightarrow$ Give Feedback
- [ ] 4.2 Ensure responsive design for the Report Detail page (mobile friendly reading)
- [ ] 4.3 Optimize image/chart loading times for the dashboard
- [ ] 4.4 Conduct a final UX review to ensure the transition from "Archive" to "Detail" is seamless
