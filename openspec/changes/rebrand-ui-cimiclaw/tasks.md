## 1. i18n Source of Truth

- [x] 1.1 修改 `ui/src/i18n/locales/en.ts`：将所有 "OpenClaw" 品牌文本替换为 "CimiClaw"，所有 `openclaw` CLI 命令替换为 `cimiclaw`，所有 `docs.openclaw.ai` 替换为 `docs.cimiclaw.ai`，所有 `OPENCLAW_` 环境变量前缀替换为 `CIMICLAW_`
- [x] 1.2 修改 `ui/src/i18n/.i18n/glossary.*.json`（所有语言的术语表）：将 source/target `"OpenClaw"` 更新为 `"CimiClaw"`
- [x] 1.3 修改 `ui/src/i18n/.i18n/raw-copy-baseline.json`：更新所有品牌文本引用

## 2. 静态入口文件

- [x] 2.1 修改 `ui/index.html`：`<title>OpenClaw Control</title>` → `<title>CimiClaw Control</title>`
- [x] 2.2 修改 `ui/public/manifest.webmanifest`：`name` → `"CimiClaw Control"`，`short_name` → `"CimiClaw"`
- [x] 2.3 修改 `ui/public/sw.js`：注释、`CACHE_NAME` 值、通知标题 `"OpenClaw"` → `"CimiClaw"`、notification tag

## 3. 核心渲染文件 — 品牌文本

- [x] 3.1 修改 `ui/src/ui/app-render.ts`：sidebar logo alt `"OpenClaw"` → `"CimiClaw"`（L1453）、sidebar 品牌标题 `"OpenClaw"` → `"CimiClaw"`（L1457）、docs sidebar 链接域名（L1521）
- [x] 3.2 修改 `ui/src/ui/app.ts`：talk transcript 中 `"OpenClaw"` → `"CimiClaw"`（L1078）
- [x] 3.3 修改 `ui/src/ui/views/chat.ts`：`"Asking OpenClaw..."` → `"Asking CimiClaw..."`（L1480）
- [x] 3.4 修改 `ui/src/ui/views/login-gate.ts`：logo alt + 标题 `"OpenClaw"` → `"CimiClaw"`（L287-288）、placeholder `OPENCLAW_GATEWAY_TOKEN` → `CIMICLAW_GATEWAY_TOKEN`（L315）、CLI 命令 `openclaw` → `cimiclaw`（L380,382）、所有 `docs.openclaw.ai` → `docs.cimiclaw.ai`（L77,105,151,170,186,388）
- [x] 3.5 修改 `ui/src/ui/components/dashboard-header.ts`：面包屑 `"OpenClaw"` → `"CimiClaw"`（L43）
- [x] 3.6 修改 `ui/src/ui/chat/realtime-talk-shared.ts`：所有错误消息中 `"OpenClaw"` → `"CimiClaw"`（L219,224,228,242,246,250,298）
- [x] 3.7 修改 `ui/src/ui/views/config-quick.ts`：描述文本 `"OpenClaw injects"` → `"CimiClaw injects"`（L864）
- [x] 3.8 修改 `ui/src/ui/controllers/config.ts`：CLI 命令文本 `openclaw update/doctor` → `cimiclaw update/doctor`（L170,171,179,184）

## 4. 核心渲染文件 — CLI 命令 & docs 链接

- [x] 4.1 修改 `ui/src/ui/views/overview.ts`：所有 `openclaw` CLI 命令 → `cimiclaw`（L122,125,158,159,176,384,387,392）、`OPENCLAW_GATEWAY_TOKEN` → `CIMICLAW_GATEWAY_TOKEN`（L292）、所有 `docs.openclaw.ai` → `docs.cimiclaw.ai`（L131,164,180,213,222,400）
- [x] 4.2 修改 `ui/src/ui/views/debug.ts`：CLI 命令 `openclaw security audit` → `cimiclaw security audit`（L63）
- [x] 4.3 修改 `ui/src/ui/views/usage.ts`：导出文件名 `openclaw-usage-*` → `cimiclaw-usage-*`（L492,504,516）
- [x] 4.4 修改 `ui/src/ui/app-scroll.ts`：日志文件名 `openclaw-logs-*` → `cimiclaw-logs-*`（L182）
- [x] 4.5 修改 `ui/src/ui/app-settings.ts`：docs 链接域名（L766）
- [x] 4.6 修改 `ui/src/ui/views/agents-panels-status-files.ts`：docs 链接域名（L300）
- [x] 4.7 修改 `ui/src/ui/app-gateway.ts`：`clientName: "openclaw-control-ui"` → `"cimiclaw-control-ui"`（L490）
- [x] 4.8 修改 `ui/src/ui/markdown.ts`：注释中示例 URL `docs.openclaw.ai` → `docs.cimiclaw.ai`（L312）

## 5. 测试文件

- [x] 5.1 修改 `ui/src/ui/views/overview.render.test.ts`：CLI 命令断言 `openclaw` → `cimiclaw`（L109,123,124）
- [x] 5.2 修改 `ui/src/ui/views/login-gate.test.ts`：CLI 命令断言（L58,59,101,142,197）+ docs 链接断言（L199）
- [x] 5.3 修改 `ui/src/ui/views/debug.test.ts`：CLI 命令断言（L64）
- [x] 5.4 修改 `ui/src/ui/views/skills.test.ts`：mock 数据中品牌名 `OpenClaw` → `CimiClaw`（L168,182,210,223,238）
- [x] 5.5 修改 `ui/src/ui/views/config-quick.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L64）
- [x] 5.6 修改 `ui/src/ui/views/config.browser.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L61）
- [x] 5.7 修改 `ui/src/ui/chat/grouped-render.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L141,166,198,271）
- [x] 5.8 修改 `ui/src/ui/chat/chat-avatar.test.ts`：name mock `"OpenClaw"` → `"CimiClaw"`（L65）
- [x] 5.9 修改 `ui/src/ui/app-lifecycle.node.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L12）
- [x] 5.10 修改 `ui/src/ui/app-lifecycle-connect.node.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L62）
- [x] 5.11 修改 `ui/src/ui/app-gateway.sessions.node.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L120）
- [x] 5.12 修改 `ui/src/ui/app-gateway.node.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L157）
- [x] 5.13 修改 `ui/src/ui/app-gateway-chat-load.node.test.ts`：`assistantName: "OpenClaw"` → `"CimiClaw"`（L154）
- [x] 5.14 修改 `ui/src/ui/chat/build-chat-items.test.ts`：sender label `"openclaw-control-ui"` → `"cimiclaw-control-ui"`（L6,207）
- [x] 5.15 修改 `ui/src/ui/chat/message-normalizer.test.ts`：sender metadata `"openclaw-control-ui"` → `"cimiclaw-control-ui"`（L5）
- [x] 5.16 修改 `ui/src/ui/markdown.test.ts`：示例 URL 断言 `docs.openclaw.ai` → `docs.cimiclaw.ai`（L205,206）

## 6. i18n Sync & 验证

- [x] 6.1 运行 `pnpm ui:i18n:sync` 自动生成所有非英文 locale 文件
- [x] 6.2 运行 `pnpm test` 验证全部测试通过
