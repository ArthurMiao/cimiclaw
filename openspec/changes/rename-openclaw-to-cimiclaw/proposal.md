## Why

项目 fork 后品牌从 OpenClaw 更名为 CimiClaw。当前代码中所有用户在 PC 上能直接看到的文件名、目录名、CLI 命令名、配置文件名仍为 `openclaw`。需要将这些用户可见标识统一改为 `cimiclaw`，使品牌一致性贯穿整个用户触面。

项目尚在开发中，无需兼容旧名称或提供迁移路径。

## What Changes

- **BREAKING** CLI 命令名从 `openclaw` 改为 `cimiclaw`（影响 `package.json` bin 字段、所有 CLI 调用脚本）
- **BREAKING** 状态目录从 `~/.openclaw/` 改为 `~/.cimiclaw/`
- **BREAKING** 配置文件从 `openclaw.json` 改为 `cimiclaw.json`
- 插件清单文件从 `openclaw.plugin.json` 改为 `cimiclaw.plugin.json`（~100 个插件目录）
- 入口文件从 `openclaw.mjs` 改为 `cimiclaw.mjs`
- 所有用户可见的 CLI 命令提示字符串（`formatCliCommand("openclaw ...")`）自动通过常量生效
- 所有用户可见的路径字符串（`~/.openclaw/`、帮助文本中的路径）统一替换
- 约 200 个物理文件重命名（git mv）
- 源码中散落的硬编码路径字符串替换
- 测试文件中的硬编码字符串批量替换
- CI 工作流文件名及内部引用更新
- 脚本文件名及内部引用更新
- 文档中的路径和命令名引用更新
- Dockerfile、docker-compose、fly.toml、render.yaml 等部署配置中的路径更新

## Capabilities

### New Capabilities

- `cli-branding`: CLI 命令名、入口文件名、命令格式化函数中的品牌标识统一为 cimiclaw
- `state-dir-branding`: 状态目录 ~/.cimiclaw/、配置文件 cimiclaw.json 的路径常量及散落引用
- `plugin-manifest-branding`: 插件清单文件 cimiclaw.plugin.json 的文件名常量、物理文件重命名及引用更新
- `file-rename-sweep`: 所有含 openclaw 的物理文件（源码、脚本、测试、CI、文档、部署）重命名及 import 路径同步

### Modified Capabilities

（无既有 spec 需要修改——这是纯品牌重命名，不改变功能行为）

## Impact

- **源码**: `src/` 下 ~45 个 `openclaw-*.ts` 文件重命名 + 内容引用更新
- **插件**: `extensions/` 下 ~100 个 `openclaw.plugin.json` 文件重命名
- **配置**: `package.json`、`tsconfig.json`、`pnpm-workspace.yaml`、`config/knip.config.ts` 等
- **脚本**: `scripts/` 下 ~10 个 `openclaw-*` 脚本重命名
- **CI**: `.github/workflows/` 下 7 个工作流文件重命名 + 内容更新
- **测试**: ~500 处测试文件中的硬编码路径/文件名替换
- **部署**: `Dockerfile`、`docker-compose.yml`、`fly.toml`、`render.yaml` 中的路径引用
- **文档**: `docs/`、`SETUP.md`、`HOOK.md`、`appcast.xml` 中的路径和命令名

### Non-goals

- 不修改 `OPENCLAW_*` 环境变量前缀（内部契约，用户不可见）
- 不修改 `@openclaw/*` npm scope（内部标识符）
- 不修改 `openclaw/plugin-sdk/*` import 路径别名（内部标识符）
- 不修改 `OpenClaw*` 类名/类型名（内部标识符）
- 不修改 `"openclaw"` protocol namespace（内部协议）
- 不修改 `openclaw-*` 自定义元素名（内部 Web Components）
- 不修改 `docs.openclaw.ai` 域名（上游文档）
- 不提供旧名称到新名称的迁移逻辑
- 不修改 `node_modules/` 或 `pnpm-lock.yaml`
