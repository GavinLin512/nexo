## 1. Database Schema Update

- [ ] 1.1 Add `ai_score` (Float, nullable) field to the `Article` model in `schema.prisma`
- [ ] 1.2 Add `is_candidate` (Boolean, default false) field to the `Article` model
- [ ] 1.3 Run `npx prisma db push` to apply changes to Supabase
- [ ] 1.4 Verify the new columns exist using Prisma Studio

## 2. AI Screening Service Implementation

- [ ] 2.1 Create `AIScreeningService` class with a `scoreArticle(article: ArticleDTO): Promise<ScoreResult>` method
- [ ] 2.2 Implement the LLM client integration (e.g., using OpenAI SDK) with `gpt-4o-mini`
- [ ] 2.3 Design and implement the system prompt for relevance scoring (including few-shot examples)
- [ ] 2.4 Implement structured JSON parsing to extract the numeric score and reasoning from the LLM response
- [ ] 2.5 Implement a retry mechanism or fallback value for malformed LLM outputs

## 3. Pipeline Integration

- [ ] 3.1 Modify `SyncService` to call `AIScreeningService.scoreArticle()` for every article that passes the `KeywordFilter`
- [ ] 3.2 Implement logic to update the `ai_score` and `is_candidate` status in the database based on the threshold (default 0.7)
- [ ] 3.3 Add logging to track how many articles were processed by AI and how many were marked as candidates

## 4. Verification & Tuning

- [ ] 4.1 Create a test set of articles (high relevance vs. low relevance)
- [ ] 4.2 Run the screening service and verify that the scores align with human expectations
- [ ] 4.3 Tune the Prompt and threshold to minimize false positives and false negatives
- [ ] 4.4 Verify that the end-to-end sync flow (Fetch -> Keyword Filter -> AI Score -> Store) works correctly
