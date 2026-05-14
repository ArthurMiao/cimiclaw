## ADDED Requirements

### Requirement: CLI 命令引用统一为 cimiclaw
Control UI 中所有向用户展示的 CLI 命令示例 SHALL 使用 `cimiclaw` 作为命令前缀，包括 overview 连接指引、login-gate 操作步骤、debug 安全审计命令、config 更新/修复命令、环境变量提示。

#### Scenario: overview 连接指引
- **WHEN** 用户查看 overview 页面的连接步骤
- **THEN** 所有 CLI 命令 SHALL 显示为 `cimiclaw gateway run`、`cimiclaw dashboard`、`cimiclaw doctor --generate-gateway-token` 等

#### Scenario: login-gate 操作步骤
- **WHEN** 用户在登录页看到认证失败或设备配对指引
- **THEN** CLI 命令 SHALL 显示为 `cimiclaw dashboard --no-open`、`cimiclaw devices approve`、`cimiclaw devices list` 等

#### Scenario: debug 安全命令
- **WHEN** 用户查看 debug 页面
- **THEN** 安全审计命令 SHALL 显示为 `cimiclaw security audit --deep`

#### Scenario: config 更新命令
- **WHEN** 用户在 config 页面看到更新/修复提示
- **THEN** 命令 SHALL 显示为 `cimiclaw update`、`cimiclaw doctor --non-interactive` 等

#### Scenario: 环境变量提示
- **WHEN** 用户看到 token 输入框的 placeholder
- **THEN** placeholder SHALL 显示 `CIMICLAW_GATEWAY_TOKEN` 而非 `OPENCLAW_GATEWAY_TOKEN`
