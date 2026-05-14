## Why

项目需要将 Control UI 中所有用户可见的 "OpenClaw" 品牌文本替换为 "CimiClaw"，同时将所有 CLI 命令引用从 `openclaw` 更新为 `cimiclaw`。当前 UI 中品牌名和命令引用仍大量使用旧名，与已部分完成的 embed 模式品牌替换（如 chat-welcome 中的 CimiClaw）不一致，给用户造成困惑。

## What Changes

- 所有用户可见的品牌文本 `"OpenClaw"` → `"CimiClaw"`（sidebar 标题、登录页、面包屑、实时对话标签、思考状态提示等）
- 所有 CLI 命令显示文本 `"openclaw xxx"` → `"cimiclaw xxx"`（overview、login-gate、debug、config 等视图中的操作指引）
- 所有环境变量提示文本 `"OPENCLAW_"` → `"CIMICLAW_"`（placeholder 文本）
- 所有 docs 文档链接 `"docs.openclaw.ai"` → `"docs.cimiclaw.ai"`（19 处）
- 所有用户可见的 client/sender 标识 `"openclaw-control-ui"` → `"cimiclaw-control-ui"`（聊天消息中可见）
- 所有导出/下载文件名前缀 `"openclaw-"` → `"cimiclaw-"`（usage CSV/JSON、日志文件）
- Service Worker 注释、缓存名、通知标题中的品牌引用
- Web App Manifest 中的 name/short_name
- HTML 页面 `<title>`
- i18n 英文源文件 (`en.ts`) 及通过 `ui:i18n:sync` 自动生成的全部 locale 文件
- i18n 术语表 (`glossary.*.json`) 和 baseline 文件
- 所有对应测试文件中的断言和 mock 数据

**不动的内容**：自定义元素标签名 (`<openclaw-app>`)、`customElements.define` 注册名、localStorage key、全局变量名 (`__OPENCLAW_CONTROL_UI_BASE_PATH__`)、内部协议字段 (`x-openclaw-*` headers、`openclaw:navigate` 消息类型)、source ID (`openclaw-bundled` 等)、dreaming diary 内部标记、CSS 选择器。

## Capabilities

### New Capabilities

（无新增能力，纯文本替换）

### Modified Capabilities

- `ui-brand-text`: Control UI 中所有用户可见品牌文本的命名规范，从 OpenClaw 统一切换为 CimiClaw
- `ui-cli-commands`: UI 中显示的所有 CLI 命令引用，从 `openclaw` 切换为 `cimiclaw`
- `ui-docs-links`: UI 中所有文档链接域名从 `docs.openclaw.ai` 切换为 `docs.cimiclaw.ai`
- `ui-i18n-locales`: i18n 多语言包中上述品牌/命令/链接文本的同步更新

## Impact

- **代码范围**：`ui/` 目录下约 35+ 文件（13 核心渲染 + 3 静态入口 + 15 测试 + i18n 文件）
- **i18n**：需先改 `en.ts`（source of truth），再跑 `pnpm ui:i18n:sync` 自动生成其余 17 个 locale
- **测试**：所有涉及品牌名/CLI 命令的断言和 mock 数据需同步更新
- **无 breaking change**：不涉及 API、协议、数据格式变更，纯展示层文本替换
- **非目标**：不改后端、不改 CLI 二进制名称、不改自定义元素标签名/注册名、不改内部协议字段
