## Why

系統需要儲存從各種數據源抓取的文章內容及其對應的向量表示，以便進行後續的 AI 篩選、主題聚類與 RAG 檢索。

## What Changes

- 建立 `articles` 表：儲存文章的元數據（標題、摘要、鏈接、日期）與來源關聯。
- 建立 `article_embeddings` 表：儲存文章內容的向量化表示。
- 在 Supabase 中啟用 `pgvector` 擴展以支持向量存儲與搜索。

## Capabilities

### New Capabilities
- `article-storage`: 實作高效的文章內容存儲與管理。
- `vector-storage`: 實作基於 `pgvector` 的向量數據存儲與相似度檢索基礎。

### Modified Capabilities
- 無

## Impact

- **Database**: 需要在 PostgreSQL 中執行 `CREATE EXTENSION vector`。
- **Schema**: 擴展 Prisma Schema 以包含文章與向量模型。
- **Storage**: 向量數據將增加資料庫的儲存空間需求。
