## Why

系統需要從多種不同格式（RSS, JSON API, HTML）的來源攝取數據。為了避免核心邏輯與特定平台的實現強耦合，需要建立一套標準化的適配器 (Adapter) 體系，使新增數據源只需實作接口而無需修改核心同步邏輯。

## What Changes

- 定義 `BaseAdapter` 抽象接口/基類，統一數據攝取的輸入與輸出格式。
- 實作 `SyncService` 核心調度器，負責遍歷所有啟用的適配器並執行同步。
- 建立標準化的 `Article` 數據傳輸對象 (DTO)，確保數據在適配器與資料庫之間傳遞的一致性。

## Capabilities

### New Capabilities
- `adapter-framework`: 提供標準化的數據攝取接口與調度機制。

### Modified Capabilities
- 無

## Impact

- **Code Architecture**: 引入適配器模式 (Adapter Pattern)，增加一個抽象層。
- **Dependencies**: 可能需要引入 `rss-parser` 等基礎解析庫。
- **Database**: 頻繁調用 `articles` 表的寫入操作。
