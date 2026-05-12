## ADDED Requirements

### Requirement: CLI 命令名为 cimiclaw
系统 SHALL 使用 `cimiclaw` 作为默认 CLI 命令名。`src/cli/cli-name.ts` 中 `DEFAULT_CLI_NAME` 的值 SHALL 为 `"cimiclaw"`。

#### Scenario: 默认 CLI 名称解析
- **WHEN** 在未设置特殊环境的情况下调用 `resolveCliName()`
- **THEN** 返回 `"cimiclaw"`

#### Scenario: formatCliCommand 生成 cimiclaw 命令
- **WHEN** 调用 `formatCliCommand("cimiclaw setup")`
- **THEN** 返回包含 `cimiclaw` 而非 `openclaw` 的命令字符串

### Requirement: CLI 入口文件名为 cimiclaw.mjs
项目根目录 SHALL 包含 `cimiclaw.mjs` 作为 CLI 入口文件。`package.json` 的 `bin` 字段 SHALL 为 `{"cimiclaw": "cimiclaw.mjs"}`。

#### Scenario: npm bin 链接
- **WHEN** 用户通过 npm/pnpm 全局安装此包
- **THEN** 创建名为 `cimiclaw` 的可执行命令，指向 `cimiclaw.mjs`

### Requirement: CLI 命令正则匹配 cimiclaw
`src/cli/cli-name.ts` 和 `src/cli/command-format.ts` 中所有匹配 CLI 命令名的正则表达式 SHALL 匹配 `cimiclaw` 而非 `openclaw`。

#### Scenario: CLI_PREFIX_RE 匹配 cimiclaw
- **WHEN** 输入字符串为 `"cimiclaw gateway run"`
- **THEN** `CLI_PREFIX_RE` 正则成功匹配
