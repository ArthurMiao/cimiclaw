## Context

项目从 OpenClaw fork 为 CimiClaw。代码中 `openclaw` 作为品牌标识出现在三类位置：

1. **集中定义的常量** — CLI 命令名、状态目录名、配置文件名、插件清单文件名各有权威常量，下游通过函数调用间接引用
2. **散落的硬编码** — 部分源码直接硬编码了 `.openclaw`、`openclaw.json` 等路径字符串，未走常量
3. **物理文件名** — ~200 个文件名含 `openclaw`（入口、源码、脚本、测试、CI、文档、插件清单）

当前状态：
- `src/cli/cli-name.ts` — `DEFAULT_CLI_NAME = "openclaw"`，`formatCliCommand()` 依赖此常量生成所有用户可见的 CLI 命令提示（322 处调用零散分布）
- `src/config/paths.ts` — `NEW_STATE_DIRNAME = ".openclaw"`、`CONFIG_FILENAME = "openclaw.json"`
- `src/plugins/manifest.ts` — `PLUGIN_MANIFEST_FILENAME = "openclaw.plugin.json"`
- `openclaw.mjs` — CLI 入口文件

## Goals / Non-Goals

**Goals:**

- 将所有用户在 PC 文件系统/终端中能直接看到的 `openclaw` 标识改为 `cimiclaw`
- CLI 命令从 `openclaw` 变为 `cimiclaw`
- 状态目录从 `~/.openclaw/` 变为 `~/.cimiclaw/`
- 配置文件从 `openclaw.json` 变为 `cimiclaw.json`
- 插件清单从 `openclaw.plugin.json` 变为 `cimiclaw.plugin.json`
- 所有物理文件名中的 `openclaw` 变为 `cimiclaw`
- 所有源码中散落的路径/命令字符串统一替换

**Non-Goals:**

- 不改 `OPENCLAW_*` 环境变量前缀
- 不改 `@openclaw/*` npm scope
- 不改 `openclaw/plugin-sdk/*` import 路径别名
- 不改 `OpenClaw*` 类名/类型名
- 不改 `"openclaw"` protocol namespace
- 不改 `openclaw-*` 自定义元素
- 不改 `docs.openclaw.ai` 域名
- 不提供旧→新迁移逻辑

## Decisions

### D1: 先改核心常量，再改散落引用，最后批量替换测试

**选择**: 分三阶段执行，核心常量优先
**替代方案**: 全局 find-replace 一步到位
**理由**: 核心常量改完后，`formatCliCommand()` 的 322 处调用自动生效，无需逐一修改。减少遗漏风险和 diff 噪音。

### D2: 文件重命名使用 git mv

**选择**: `git mv` 重命名物理文件
**理由**: 保留 git 历史可追溯性。`openclaw.mjs` → `cimiclaw.mjs`，`src/**/openclaw-*.ts` → `src/**/cimiclaw-*.ts`，`extensions/*/openclaw.plugin.json` → `extensions/*/cimiclaw.plugin.json` 等。

### D3: import 路径中 `types.openclaw.js` 要同步改

**选择**: 文件重命名后同步更新所有 import 引用
**理由**: `types.openclaw.ts` 重命名为 `types.cimiclaw.ts` 后，所有 `from "./types.openclaw.js"` 或 `from "../config/types.openclaw.js"` 的 import 都必须同步改为 `types.cimiclaw.js`，否则编译失败。

### D4: scripts 和 CI 工作流文件名一起改

**选择**: `scripts/openclaw-*` → `scripts/cimiclaw-*`，`.github/workflows/openclaw-*` → `.github/workflows/cimiclaw-*`
**理由**: 用户在 IDE 文件树和 CI 面板中能看到这些文件名。package.json 中引用这些脚本的路径也需同步更新。

### D5: SecretTargetConfigFile 类型中的 `"openclaw.json"` 字面量要改

**选择**: `src/secrets/target-registry-types.ts` 中 `SecretTargetConfigFile = "openclaw.json" | "auth-profiles.json"` 改为 `"cimiclaw.json"`
**理由**: 这是类型级别的约束，影响所有引用此类型的代码和测试。不改会导致类型不一致。

## Risks / Trade-offs

- **[遗漏引用]** → 正则全局搜索 `openclaw` 验证零遗漏。核心常量改完后，通过 `formatCliCommand` 间接引用的 322 处自动生效。散落引用清单已在探索阶段完整映射。
- **[import 路径断裂]** → 文件重命名后立即用 AST grep 或全局搜索验证所有 `types.openclaw` 和 `openclaw-` import 引用已更新。
- **[CI 工作流引用断裂]** → 工作流文件重命名后，`package.json` scripts 字段和 workflow 内的 `uses:` / `run:` 引用需同步更新。
- **[pnpm-lock.yaml]** → `package.json` bin 字段改后 `pnpm install` 会自动更新 lockfile，无需手动处理。
- **[构建验证]** → 每个阶段完成后运行 `pnpm build` 和关键测试确认无断裂。
