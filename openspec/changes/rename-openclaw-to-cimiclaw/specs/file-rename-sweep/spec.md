## ADDED Requirements

### Requirement: 源码文件名中无 openclaw 残留
所有 `src/` 目录下文件名包含 `openclaw` 的文件 SHALL 重命名为对应 `cimiclaw` 名称。这包括但不限于：
- `src/**/openclaw-*.ts` (~45 个文件)
- `src/config/types.openclaw.ts` → `types.cimiclaw.ts`
- `src/test-utils/openclaw-test-state.ts` → `cimiclaw-test-state.ts`

#### Scenario: src 目录无 openclaw 文件名残留
- **WHEN** 在 `src/` 目录下搜索文件名包含 `openclaw` 的文件
- **THEN** 零匹配结果

### Requirement: import 路径同步更新
所有因文件重命名而失效的 import 路径 SHALL 同步更新。特别是 `types.openclaw.js` → `types.cimiclaw.js` 以及所有 `openclaw-*.js` → `cimiclaw-*.js` 的 import。

#### Scenario: TypeScript 编译通过
- **WHEN** 文件重命名和 import 更新完成后运行 `pnpm build`
- **THEN** 编译成功，无未解析模块错误

### Requirement: 脚本文件名更新
`scripts/` 目录下所有文件名包含 `openclaw` 的文件 SHALL 重命名为对应 `cimiclaw` 名称。`package.json` scripts 字段中的引用 SHALL 同步更新。

#### Scenario: npm scripts 引用正确
- **WHEN** 运行 `pnpm run` 列出所有脚本
- **THEN** 所有脚本目标路径指向 `cimiclaw-*` 文件

### Requirement: CI 工作流文件名更新
`.github/workflows/` 下所有文件名包含 `openclaw` 的工作流文件 SHALL 重命名为对应 `cimiclaw` 名称。工作流文件内部引用的脚本路径和 artifact 名称 SHALL 同步更新。

#### Scenario: CI 工作流文件名无 openclaw
- **WHEN** 在 `.github/workflows/` 目录下搜索文件名包含 `openclaw` 的文件
- **THEN** 零匹配结果

### Requirement: 测试文件名更新
`test/` 和 `src/` 下的测试文件名包含 `openclaw` 的 SHALL 重命名为对应 `cimiclaw` 名称。

#### Scenario: 测试文件名无 openclaw
- **WHEN** 搜索所有 `*.test.ts` 和 `*.e2e.test.ts` 文件名
- **THEN** 文件名中不含 `openclaw`

### Requirement: packages 目录文件名更新
`packages/memory-host-sdk/src/host/` 下所有 `openclaw-*.ts` 文件 SHALL 重命名为对应 `cimiclaw-*.ts`，import 路径同步更新。

#### Scenario: packages 目录无 openclaw 文件名
- **WHEN** 在 `packages/` 目录下搜索文件名包含 `openclaw` 的文件（排除 node_modules）
- **THEN** 零匹配结果

### Requirement: 部署配置中的路径更新
`Dockerfile`、`docker-compose.yml`、`fly.toml`、`render.yaml`、`deploy/fly.private.toml` 中所有 `.openclaw` 路径引用 SHALL 替换为 `.cimiclaw`。

#### Scenario: Dockerfile 中无 .openclaw 路径
- **WHEN** 搜索 Dockerfile 中的 `.openclaw`
- **THEN** 零匹配，所有路径引用为 `.cimiclaw`

### Requirement: 文档中的路径和命令名更新
`docs/`、`SETUP.md`、`src/hooks/bundled/*/HOOK.md`、`appcast.xml` 中所有用户可见的 `~/.openclaw/` 路径和 `openclaw` CLI 命令名 SHALL 替换为 `~/.cimiclaw/` 和 `cimiclaw`。

#### Scenario: 文档中路径一致
- **WHEN** 搜索文档中的 `~/.openclaw`
- **THEN** 零匹配

### Requirement: 安全规则目录更新
`security/opengrep/rules/openclaw-policy/` 目录 SHALL 重命名为 `cimiclaw-policy/`，内部引用同步更新。

#### Scenario: 安全规则目录名无 openclaw
- **WHEN** 搜索 `security/` 目录下的目录名
- **THEN** 不含 `openclaw`
