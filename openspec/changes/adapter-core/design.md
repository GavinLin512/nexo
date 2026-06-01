## Context

目前系統已具備基礎資料庫結構，但缺乏將外部數據導入資料庫的機制。由於數據來源多樣（RSS, APIs），直接在業務邏輯中編寫抓取代碼將導致維護困難且缺乏擴展性。

## Goals / Non-Goals

**Goals:**
- 建立統一的 `BaseAdapter` 接口，強制所有數據源實作相同的 `fetch()` 方法。
- 實作 `SyncService`，能夠動態加載並執行所有已註冊的適配器。
- 定義標準化的 `ArticleDTO` 格式，確保適配器輸出與資料庫模型 (`Article`) 兼容。
- 實作基礎的日誌紀錄，以追蹤每個適配器的執行狀態（成功/失敗）。

**Non-Goals:**
- 實作具體的數據抓取邏輯（如 RSS 解析），這將在 `adapter-rss-medium` 等具體實作模組中完成。
- 實作複雜的並發控制（初期採用順序執行）。
- 實作數據清洗（Normalization）邏輯。

## Decisions

- **Pattern: Adapter Pattern**: 採用適配器模式。`SyncService` 僅依賴於 `BaseAdapter` 接口，不關心具體是哪個平台，實現高度解耦。
- **Language: TypeScript Interfaces**: 使用 TS Interface 定義 `BaseAdapter`，確保在編譯階段就能發現不符合規範的適配器。
- **Sync Logic: Sequential Execution**: 考慮到外部 API 的 Rate Limit，初期採取順序同步，避免同時發起大量請求導致被封鎖。

## Risks / Trade-offs

- [外部 API 阻塞] $\rightarrow$ 為 `BaseAdapter.fetch()` 設置超時時間 (Timeout)，防止單個失效的數據源導致整個同步流程掛起。
- [數據重複] $\rightarrow$ 依賴於 `db-schema-articles` 中定義的 URL 唯一性約束，適配器僅負責推送，由 DB 層處理 Upsert 邏輯。

## Migration Plan

- **Step 1**: 定義 `ArticleDTO` 與 `SyncResult` 類型。
- **Step 2**: 實作 `BaseAdapter` 抽象接口。
- **Step 3**: 實作 `SyncService` 的註冊與執行邏輯。
- **Step 4**: 建立 `MockAdapter` 進行全流程集成測試。
- **Step 5**: 驗證同步流程在面對單一適配器崩潰時的魯棒性。

## Open Questions

- `SyncService` 的執行應採取完全同步順序執行，還是採取 `Promise.allSettled` 形式的有限並發？
- 數據攝取的日誌是否需要存入資料庫以供後台追蹤，還是僅記錄在伺服器 Log 中？
