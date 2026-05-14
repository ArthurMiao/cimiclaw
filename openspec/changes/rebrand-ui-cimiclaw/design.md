## Context

Control UI 是 OpenClaw 项目的 Web 管理界面，使用 Lit + TypeScript 构建，通过 i18n 系统支持 18 种语言。当前 UI 中品牌名和 CLI 命令仍使用 "OpenClaw" / `openclaw`，而部分 embed 模式已切换到 "CimiClaw"（如 `chat-welcome.ts`、embed utility bar）。需要将全部用户可见文本统一为新品牌名。

i18n 系统的工作方式：
- `ui/src/i18n/locales/en.ts` 是英文 source of truth
- 其他 17 个 locale 文件通过 `pnpm ui:i18n:sync` 自动生成
- 术语表在 `ui/src/i18n/.i18n/glossary.*.json`

## Goals / Non-Goals

**Goals:**
- 将 UI 中所有用户可见的 "OpenClaw" 替换为 "CimiClaw"
- 将 UI 中所有 CLI 命令显示从 `openclaw` 替换为 `cimiclaw`
- 将所有 docs 链接域名从 `docs.openclaw.ai` 替换为 `docs.cimiclaw.ai`
- 将用户可见的 client/sender 标识替换为 cimiclaw
- 保持测试全部通过

**Non-Goals:**
- 不改自定义元素标签名（`<openclaw-app>`、`<openclaw-modal-dialog>`）
- 不改 `customElements.define`/`.get` 注册名
- 不改 localStorage key（`openclaw.control.settings.v1`）
- 不改全局变量 `__OPENCLAW_CONTROL_UI_BASE_PATH__`
- 不改内部协议字段（`x-openclaw-*` headers、`openclaw:navigate` 消息类型）
- 不改 source ID（`openclaw-bundled`、`openclaw-workspace` 等）
- 不改 dreaming diary 内部标记
- 不改 CSS 选择器 `openclaw-app { ... }`
- 不改后端代码或 CLI 二进制
- 不改 `openclaw-device-identity-v1` storage key
- 不改 `openclaw-custom-theme` style ID

## Decisions

### 1. 替换策略：逐文件精确替换，不使用全局 sed

**选择**：按文件逐个定位并替换，区分用户可见文本与内部标识符。

**理由**：同一文件中混合了需要改和不能改的 `openclaw` 引用（如 `app.ts` 中有用户可见的 `"OpenClaw": ` 文本也有 `<openclaw-app>` 标签名）。全局替换会误伤内部标识符，导致功能破坏。

**替代方案**：全局 find-and-replace → 风险太高，无法区分 `openclaw-app`（标签名）和 `openclaw dashboard`（CLI 命令显示）。

### 2. i18n 策略：改 en.ts + 术语表，再 sync

**选择**：手工修改 `en.ts` 中的品牌/命令/链接文本，更新所有 glossary 文件中的 `"OpenClaw"` → `"CimiClaw"` entry，然后运行 `pnpm ui:i18n:sync` 自动生成其余 locale。

**理由**：`ui/AGENTS.md` 明确规定非英文 locale 是生成输出，不应手工编辑。术语表控制了翻译一致性。

### 3. docs 链接统一替换域名

**选择**：所有 `docs.openclaw.ai` → `docs.cimiclaw.ai`，包括代码注释中的示例 URL。

**理由**：用户明确要求全部替换，内网环境下这些链接本身都无法访问，域名一致性优先。

### 4. clientName 协议标识替换

**选择**：`app-gateway.ts` 中 `clientName: "openclaw-control-ui"` → `"cimiclaw-control-ui"`，同时更新测试中的 sender metadata 断言。

**理由**：这个 clientName 会作为聊天消息的 sender label 展示给用户，属于用户可见文本。虽然这是网关协议字段，但在 UI 层面修改只影响显示名称。

## Risks / Trade-offs

- **[i18n sync 生成质量]** → 术语表更新后 `ui:i18n:sync` 应能正确传播。验证：运行 sync 后检查 zh-CN.ts 等文件确认替换完成。
- **[clientName 协议兼容]** → `clientName` 改为 `cimiclaw-control-ui` 后，如果后端对该字段有校验或匹配逻辑，可能影响连接。缓解：这是纯标识字段，后端通常不做值校验。如有问题，可在后端侧同步调整。
- **[测试遗漏]** → 35+ 文件改动，可能有断言遗漏。缓解：运行 `pnpm test` 全量验证。
- **[markdown.ts 注释]** → `markdown.ts:312` 注释中包含 `docs.openclaw.ai` 示例 URL，作为代码注释不影响功能但属于用户可见的文档引用，一并替换。
