## Context

在建立完基礎管理表 (`profiles`, `sources`) 後，系統需要能夠儲存大量攝取的文章數據及其向量化表示，以便支持 AI 篩選與 RAG (Retrieval-Augmented Generation) 功能。

## Goals / Non-Goals

**Goals:**
- 建立 `articles` 表：儲存文章元數據，並建立與 `sources` 表的外鍵關聯。
- 建立 `article_embeddings` 表：專門儲存向量數據，優化檢索效能。
- 在 Supabase 中啟用 `pgvector` 擴展。
- 定義高效的索引策略，以支持快速的相似度搜索。

**Non-Goals:**
- 實作 Embedding 的生成邏輯（將在後續 `vector-memory-rag` 處理）。
- 實作文章內容的清洗與正規化。
- 實作全文搜索 (Full-text search)。

## Decisions

- **Extension: pgvector**: 選擇使用 Supabase 內建的 `pgvector` 擴展，避免引入額外的向量資料庫（如 Pinecone），簡化基礎設施並維持數據一致性。
- **Schema Separation**: 將 `articles`（元數據）與 `article_embeddings`（向量數據）分開。這樣可以避免在查詢文章基本資訊時讀取巨大的向量數據，提升查詢效能。
- **Vector Dimension**: 預設支持 1536 維度（對應 OpenAI `text-embedding-3-small`），但設計上保留靈活性。

## Risks / Trade-offs

- [向量搜索效能] $\rightarrow$ 隨著數據量增加，平面搜索 (Flat search) 會變慢。計劃在未來引入 HNSW 索引以提升速度。
- [數據同步] $\rightarrow$ 文章刪除時需確保對應的 Embedding 同時被刪除（使用 CASCADE 刪除）。
