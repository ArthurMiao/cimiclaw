## 1. 核心常量修改

- [x] 1.1 修改 `src/cli/cli-name.ts`: `DEFAULT_CLI_NAME = "cimiclaw"`，正则中 `openclaw` → `cimiclaw`
- [x] 1.2 修改 `src/cli/command-format.ts`: `CLI_PREFIX_RE` 和 `UPDATE_COMMAND_RE` 中 `openclaw` → `cimiclaw`
- [x] 1.3 修改 `src/config/paths.ts`: `NEW_STATE_DIRNAME = ".cimiclaw"`、`CONFIG_FILENAME = "cimiclaw.json"`、tmp lock dir 中 `openclaw` → `cimiclaw`
- [x] 1.4 修改 `src/plugins/manifest.ts`: `PLUGIN_MANIFEST_FILENAME = "cimiclaw.plugin.json"`
- [x] 1.5 修改 `src/plugins/manifest-metadata-scan.ts`: 独立硬编码的 `PLUGIN_MANIFEST_FILENAME` → `"cimiclaw.plugin.json"`
- [x] 1.6 修改 `src/utils.ts:131`: `.openclaw` → `.cimiclaw`

## 2. 散落路径字符串替换（源码）

- [x] 2.1 替换 `src/plugins/roots.ts:24` 中 `.openclaw` → `.cimiclaw`
- [x] 2.2 替换 `src/plugins/manifest-metadata-scan.ts:51` 中 `.openclaw` → `.cimiclaw`
- [x] 2.3 替换 `src/plugins/conversation-binding.ts:32` 中 `~/.openclaw/` → `~/.cimiclaw/`
- [x] 2.4 替换 `src/infra/exec-approvals.ts:209-210` 中 `~/.openclaw/` → `~/.cimiclaw/`
- [x] 2.5 替换 `src/infra/exec-approvals-effective.ts:18` 中 `~/.openclaw/` → `~/.cimiclaw/`
- [x] 2.6 替换 `src/infra/dotenv.ts:250` 中 `.openclaw` → `.cimiclaw`
- [x] 2.7 替换 `src/trajectory/export.ts:829` 中 `.openclaw` → `.cimiclaw`
- [x] 2.8 替换 `src/trajectory/command-export.ts:54` 中 `.openclaw` → `.cimiclaw`
- [x] 2.9 替换 `src/gateway/server-startup-post-attach.ts:185` 中 `.openclaw` → `.cimiclaw`
- [x] 2.10 替换 `src/gateway/session-transcript-files.fs.ts:121` 中 `.openclaw` → `.cimiclaw`
- [x] 2.11 替换 `src/agents/tool-display-exec.ts:316` 中 `.openclaw` → `.cimiclaw`
- [x] 2.12 替换 `src/commands/doctor-state-integrity.ts:252` 中 `.openclaw` → `.cimiclaw`

## 3. SecretTargetConfigFile 及密钥注册表更新

- [x] 3.1 修改 `src/secrets/target-registry-types.ts`: `SecretTargetConfigFile = "cimiclaw.json" | "auth-profiles.json"`
- [x] 3.2 批量替换 `src/secrets/target-registry-data.ts` 中所有 `"openclaw.json"` → `"cimiclaw.json"` (~26 处)
- [x] 3.3 替换 `src/secrets/target-registry-query.ts` 中 `"openclaw.json"` → `"cimiclaw.json"` (3 处)
- [x] 3.4 替换 `src/secrets/configure.ts` 和 `src/secrets/configure-plan.ts` 中的 `"openclaw.json"` 引用

## 4. 用户可见帮助文本和字符串更新

- [x] 4.1 替换 `src/wizard/setup.finalize.ts` 中的 `~/.openclaw/` 路径提示
- [x] 4.2 替换 `src/config/schema.help.ts` 中的 `~/.openclaw/` 路径
- [x] 4.3 替换 `src/config/nix-mode-write-guard.ts` 中的 `programs.openclaw` 引用
- [x] 4.4 替换 `src/infra/dotenv.ts` 注释中的 `~/.openclaw/` 路径
- [x] 4.5 替换 `src/status/status-message.ts` 注释中的 `~/.openclaw/` 路径
- [x] 4.6 替换 `src/gateway/server.impl.ts` 注释中的 `openclaw.json` 引用

## 5. 入口文件和 package.json 更新

- [x] 5.1 `git mv openclaw.mjs cimiclaw.mjs`
- [x] 5.2 修改 `package.json` bin 字段: `{"cimiclaw": "cimiclaw.mjs"}`
- [x] 5.3 修改 `package.json` files 数组中 `openclaw.mjs` → `cimiclaw.mjs`
- [x] 5.4 修改 `package.json` exports 中 `./cli-entry` 指向 `cimiclaw.mjs`
- [x] 5.5 修改 `package.json` scripts 中所有 `openclaw` → `cimiclaw` 命令引用（含引用 `scripts/openclaw-*` 的路径）

## 6. 物理文件重命名 — src/ 源码文件

- [x] 6.1 `git mv src/config/types.openclaw.ts src/config/types.cimiclaw.ts`
- [x] 6.2 批量 `git mv` src/**/openclaw-*.ts → cimiclaw-*.ts（约 45 个源码文件）
- [x] 6.3 批量 `git mv` src/test-utils/openclaw-test-state.ts → cimiclaw-test-state.ts 及其 .test.ts
- [x] 6.4 更新所有 import `types.openclaw.js` → `types.cimiclaw.js`（约 60 处）
- [x] 6.5 更新所有 import `openclaw-*.js` → `cimiclaw-*.js`（约 200 处）

## 7. 物理文件重命名 — packages/ 文件

- [x] 7.1 批量 `git mv` packages/memory-host-sdk/src/host/openclaw-*.ts → cimiclaw-*.ts（9 个文件）
- [x] 7.2 更新 packages/ 内的 import 路径引用
- [x] 7.3 更新 `extensions/browser/src/infra/tmp-openclaw-dir.ts` 重命名及引用
- [x] 7.4 更新 `extensions/codex/src/app-server/openclaw-*.test.ts` 重命名及引用

## 8. 物理文件重命名 — 插件清单

- [x] 8.1 批量 `git mv` extensions/*/openclaw.plugin.json → cimiclaw.plugin.json（约 100 个文件）
- [x] 8.2 `git mv docs/snippets/plugin-publish/minimal-openclaw.plugin.json → minimal-cimiclaw.plugin.json`

## 9. 物理文件重命名 — 脚本和 CI

- [x] 9.1 批量 `git mv` scripts/openclaw-* → scripts/cimiclaw-*（10 个脚本）
- [x] 9.2 批量 `git mv` .github/workflows/openclaw-* → .github/workflows/cimiclaw-*（7 个工作流）
- [x] 9.3 更新 .github/workflows/ 内部引用的脚本路径和 artifact 名称
- [x] 9.4 `git mv` security/opengrep/rules/openclaw-policy/ → cimiclaw-policy/

## 10. 物理文件重命名 — 测试和文档

- [x] 10.1 批量 `git mv` test/*openclaw* → test/*cimiclaw*（13 个测试文件）
- [x] 10.2 `git mv` docs/*openclaw* → docs/*cimiclaw*（6 个文档/资源文件）
- [x] 10.3 更新 test/ 和 src/ 下的 import 引用

## 11. 测试文件内容批量替换

- [x] 11.1 批量替换所有测试文件中硬编码的 `".openclaw"` → `".cimiclaw"`（约 500 处）
- [x] 11.2 批量替换所有测试文件中硬编码的 `"openclaw.json"` → `"cimiclaw.json"`（约 150 处）
- [x] 11.3 批量替换所有测试文件中硬编码的 `"openclaw.plugin.json"` → `"cimiclaw.plugin.json"`（约 300 处）

## 12. 配置和部署文件更新

- [x] 12.1 更新 `Dockerfile` 中 `.openclaw` → `.cimiclaw` 路径
- [x] 12.2 更新 `docker-compose.yml` 中 `.openclaw` → `.cimiclaw` 路径
- [x] 12.3 更新 `fly.toml` 中 `.openclaw` → `.cimiclaw` 路径
- [x] 12.4 更新 `render.yaml` 中 `.openclaw` → `.cimiclaw` 路径
- [x] 12.5 更新 `deploy/fly.private.toml` 中路径引用
- [x] 12.6 更新 `.env` 和 `.env.example` 中的 `~/.openclaw` 路径注释
- [x] 12.7 更新 `pnpm-workspace.yaml` 中的 `openclaw` 引用
- [x] 12.8 更新 `config/knip.config.ts` 中的 `openclaw.mjs` 引用
- [x] 12.9 更新 `config/swiftlint.yml` 中的 `OpenClawProtocol` 引用
- [x] 12.10 更新 `appcast.xml` 中的路径和命令名引用

## 13. 文档更新

- [x] 13.1 替换 `docs/` 目录下所有 `~/.openclaw/` → `~/.cimiclaw/` 和 `openclaw` CLI 命令名
- [x] 13.2 替换 `SETUP.md` 中的路径和命令名
- [x] 13.3 替换 `src/hooks/bundled/*/HOOK.md` 中的 `~/.openclaw/` 路径
- [x] 13.4 替换 `src/hooks/bundled/README.md` 中的路径引用

## 14. 构建验证

- [x] 14.1 运行 `pnpm build` 确认编译通过
- [x] 14.2 运行 `pnpm test` 确认关键测试通过
- [x] 14.3 全局搜索验证：在 `src/`、`extensions/`、`test/`、`docs/` 中搜索文件名包含 `openclaw` 的文件，确认零残留
- [x] 14.4 全局搜索验证：在非 node_modules 中搜索 `.openclaw`、`openclaw.json`、`openclaw.plugin.json`、`openclaw.mjs` 字符串，确认零残留
