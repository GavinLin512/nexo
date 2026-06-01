# Nexo (Nexo)

Nexo 取自「連接」之意，象徵將碎片化的多源資訊匯聚合成結構化的知識體系。

Nexo 是一個專為 AI Agent 設計的私有化行業洞察系統。它能自動聚合多源資訊（RSS, Medium, Dev.to, GitHub），並透過 AI 篩選與分析，每週生成結構化的行業分析報告。

## 🚀 快速開始

### 安裝步驟
```bash
npm install
```

### 環境變數
請在根目錄建立 `.env.local` 並設定以下變數：
```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI 配置 (OpenRouter)
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 執行指令
```bash
npm run dev   # 啟動開發伺服器
npm run build # 編譯專案
npm run start # 啟動生產環境伺服器
```

## 🛠️ 技術棧
- **Frontend/Backend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Database & Vector DB**: Supabase (PostgreSQL + pgvector)
- **AI Model**: OpenRouter / Kimi k2.6

## 🗺️ Roadmap
- [x] **Phase 1**: 基礎設施搭建 (專案初始化, DB Schema, 基礎 Adapters)
- [ ] **Phase 2**: 資訊處理管線 (硬性過濾 $\rightarrow$ AI 預篩選)
- [ ] **Phase 3**: 核心分析 Agent (聚類分析, RAG 記憶體, 四層結構報告生成)
- [ ] **Phase 4**: 展示與反饋 (Blog UI, 趨勢圖表, Email 通知, 反饋迴圈)

## 📐 報告結構 (Four-Layer Structure)
生成的週報將嚴格遵守以下結構：
1. **L1 (Summary)**: 市場情緒總結
2. **L2 (Analysis)**: 趨勢分析與價值評估
3. **L3 (Prediction)**: 行業影響預測
4. **L4 (Action)**: 最終結論與關鍵行動建議

