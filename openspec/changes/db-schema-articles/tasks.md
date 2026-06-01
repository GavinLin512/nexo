## 1. Database Extension Setup

- [ ] 1.1 Execute `CREATE EXTENSION IF NOT EXISTS vector;` in Supabase SQL Editor
- [ ] 1.2 Verify the `vector` extension is active by running `SELECT * FROM pg_extension WHERE extname = 'vector';`

## 2. Article Metadata Schema

- [ ] 2.1 Define the `Article` model in `schema.prisma` with fields: `id`, `sourceId`, `title`, `summary`, `url`, `publishedAt`
- [ ] 2.2 Configure the foreign key relation from `Article` to `Source`
- [ ] 2.3 Set a unique constraint on `url` per `sourceId` to prevent duplicates
- [ ] 2.4 Run `npx prisma db push` to apply the article schema to Supabase

## 3. Vector Storage Schema

- [ ] 3.1 Define the `ArticleEmbedding` model in `schema.prisma` with fields: `id`, `articleId`, `embedding` (Unsupported("vector(1536)"))
- [ ] 3.2 Configure the `CASCADE DELETE` relation from `ArticleEmbedding` to `Article`
- [ ] 3.3 Run `npx prisma db push` to apply the embedding schema to Supabase
- [ ] 3.4 Verify table creation via Prisma Studio

## 4. Verification & Testing

- [ ] 4.1 Manually insert a test article and a dummy vector into the database via SQL editor
- [ ] 4.2 Execute a test cosine similarity query using the `<=>` operator to verify `pgvector` is working
- [ ] 4.3 Verify that deleting an article also removes its corresponding embedding
