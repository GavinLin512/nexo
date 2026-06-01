## 1. Supabase & Prisma Setup

- [ ] 1.1 Create a Supabase project and obtain the Project URL and API Keys
- [ ] 1.2 Install Prisma CLI as a development dependency: `npm install prisma --save-dev`
- [ ] 1.3 Initialize Prisma schema: `npx prisma init`
- [ ] 1.4 Configure the `.env` file with the Supabase connection string (`DATABASE_URL` and `DIRECT_URL`)
- [ ] 1.5 Verify database connectivity using `npx prisma db pull` or a simple connection test

## 2. Core Schema Definition

- [ ] 2.1 Define the `Profile` model in `schema.prisma` with fields: `id`, `userId`, `preferences`, `updatedAt`
- [ ] 2.2 Define the `Source` model in `schema.prisma` with fields: `id`, `name`, `url`, `type`, `keywords`
- [ ] 2.3 Set up the relationship between `Profile` and `Source` (if applicable) or keep them independent for MVP
- [ ] 2.4 Run `npx prisma db push` to sync the schema with the Supabase database

## 3. Verification & Client Generation

- [ ] 3.1 Generate the Prisma Client: `npx prisma generate`
- [ ] 3.2 Open Prisma Studio (`npx prisma studio`) to verify the tables `profiles` and `sources` are created
- [ ] 3.3 Manually insert one test record into `sources` via Prisma Studio to verify write access
- [ ] 3.4 Run a basic script to fetch the test record and verify read access
