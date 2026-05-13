## ADDED Requirements

### Requirement: 状态目录名为 .cimiclaw
系统 SHALL 使用 `.cimiclaw` 作为默认状态目录名。`src/config/paths.ts` 中 `NEW_STATE_DIRNAME` 的值 SHALL 为 `".cimiclaw"`。`src/utils.ts` 中硬编码的 `.openclaw` SHALL 替换为 `.cimiclaw`。

#### Scenario: 默认状态目录解析
- **WHEN** 在未设置 `OPENCLAW_STATE_DIR` 环境变量且 `~/.cimiclaw` 目录存在的情况下调用 `resolveStateDir()`
- **THEN** 返回 `<homedir>/.cimiclaw`

#### Scenario: 新安装时创建 .cimiclaw
- **WHEN** 用户首次运行 CLI，home 目录下既无 `.cimiclaw` 也无旧版目录
- **THEN** 系统创建 `<homedir>/.cimiclaw` 作为状态目录

### Requirement: 配置文件名为 cimiclaw.json
系统 SHALL 使用 `cimiclaw.json` 作为默认配置文件名。`src/config/paths.ts` 中 `CONFIG_FILENAME` 的值 SHALL 为 `"cimiclaw.json"`。

#### Scenario: 默认配置路径
- **WHEN** 在未设置 `OPENCLAW_CONFIG_PATH` 的情况下调用 `resolveCanonicalConfigPath()`
- **THEN** 返回 `<stateDir>/cimiclaw.json`

#### Scenario: 配置路径候选列表
- **WHEN** 调用 `resolveDefaultConfigCandidates()`
- **THEN** 候选列表中包含 `<homedir>/.cimiclaw/cimiclaw.json`

### Requirement: 所有散落的 .openclaw 路径引用统一替换
源码中所有直接硬编码 `.openclaw` 目录名的地方 SHALL 替换为 `.cimiclaw`。涉及文件包括但不限于：
- `src/plugins/roots.ts`
- `src/plugins/manifest-metadata-scan.ts`
- `src/plugins/conversation-binding.ts`
- `src/infra/exec-approvals.ts`
- `src/infra/exec-approvals-effective.ts`
- `src/infra/dotenv.ts`
- `src/trajectory/export.ts`
- `src/trajectory/command-export.ts`
- `src/gateway/server-startup-post-attach.ts`
- `src/gateway/session-transcript-files.fs.ts`
- `src/agents/tool-display-exec.ts`
- `src/commands/doctor-state-integrity.ts`

#### Scenario: 插件审批路径
- **WHEN** `conversation-binding.ts` 引用审批文件路径
- **THEN** 路径为 `~/.cimiclaw/plugin-binding-approvals.json`

#### Scenario: exec 审批默认路径
- **WHEN** `exec-approvals.ts` 引用默认审批文件
- **THEN** 默认路径为 `~/.cimiclaw/exec-approvals.json` 和 `~/.cimiclaw/exec-approvals.sock`

### Requirement: SecretTargetConfigFile 类型使用 cimiclaw.json
`src/secrets/target-registry-types.ts` 中 `SecretTargetConfigFile` 类型 SHALL 为 `"cimiclaw.json" | "auth-profiles.json"`。所有 `target-registry-data.ts`、`target-registry-query.ts`、`configure.ts`、`configure-plan.ts` 中引用 `"openclaw.json"` 的地方 SHALL 替换为 `"cimiclaw.json"`。

#### Scenario: 密钥注册表条目使用新文件名
- **WHEN** 遍历 `target-registry-data.ts` 中的所有条目
- **THEN** `configFile` 字段的值为 `"cimiclaw.json"` 或 `"auth-profiles.json"`，不含 `"openclaw.json"`
