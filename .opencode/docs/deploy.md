# 部署文件 (Deployment)

## 平台

- **托管**：VibeHost（Cloudflare static）
- **建置輸出**：`out/`（Next.js `output: 'export'` 靜態匯出，根目錄含 `index.html`）
- **App 名稱**：`nexo`
- **正式網址**：<https://nexo-mvp.vibehost.space>

## 標準部署流程

```bash
npm run build                              # 產生 out/
vibehost deploy ./out --app nexo --json    # 部署；exit 0 即代表 healthy 上線
```

`--json` 回傳 `{ ok: true, data: { url, immutableUrl, ... } }`：
- `url`：分享用，永遠指向最新部署。
- `immutableUrl`：釘選到該次 build 的不可變連結（給 bug report / 審查用）。

## 已知問題與解法

### 1. `VALIDATION_FAILED: blob <sha> not found in R2 — re-upload required`

**現象**

```json
{"ok":false,"error":{"code":"VALIDATION_FAILED","message":"blob <sha> not found in R2 — re-upload required"}}
```

**原因**

VibeHost 用檔案 SHA-256 做 content-addressed dedup，且 dedup 完全在伺服器端。伺服器的 `check_blobs_missing` 回報某個 blob「已存在於 R2」，CLI 就略過上傳，但 R2 實際上沒有那個檔案，於是部署驗證階段失敗。本機沒有可清的 blob 快取（`~/.config/vibehost/` 只有 `config.json`）。

**解法：加上 `--no-chunked` 重跑**

```bash
vibehost deploy ./out --app nexo --no-chunked --json
```

`--no-chunked` 改成整包單一 tarball 上傳，完全跳過 per-file blob dedup，避開出錯的快取判斷。

**取捨**

- tarball 模式回傳 `immutableUrl: null`（不產生釘選的 per-build hash）。
- 待 R2 恢復正常後，改回一般 `vibehost deploy` 即可重新取得 immutable URL。

**實測紀錄（2026-06-01）**

一般 `vibehost deploy ./out --app nexo --json` 觸發此錯誤；改用 `--no-chunked` 後成功，`status: healthy`，網址 <https://nexo-mvp.vibehost.space>。

## 注意事項（靜態匯出限制）

- 維持 `output: 'export'`，禁用 API routes / Server Actions / SSR / ISR / middleware。
- `next/image` 需 `images.unoptimized: true` 或自訂 loader。
- 所有 secret key（Kimi、Supabase `service_role`、SMTP）不可進前端 bundle，只放 Edge Functions / GitHub Actions。

## 參考

- CLI 參考：<https://docs.vibehost.com/guides/cli>
- 錯誤碼：<https://docs.vibehost.com/reference/errors>
