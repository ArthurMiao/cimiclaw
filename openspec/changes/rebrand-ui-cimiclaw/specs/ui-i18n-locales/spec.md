## ADDED Requirements

### Requirement: i18n locale 同步品牌替换
英文源文件 (`en.ts`) 中所有品牌文本、CLI 命令、docs 链接 SHALL 先完成替换，然后通过 `pnpm ui:i18n:sync` 自动生成其余所有 locale 文件。术语表 glossary 文件中 `OpenClaw` 条目 SHALL 更新为 `CimiClaw`。raw-copy-baseline.json 中的品牌引用 SHALL 同步更新。

#### Scenario: en.ts 源文件更新
- **WHEN** 英文 source of truth `en.ts` 被修改
- **THEN** 其中所有 "OpenClaw" 品牌文本 SHALL 为 "CimiClaw"，所有 `openclaw` CLI 命令 SHALL 为 `cimiclaw`，所有 `docs.openclaw.ai` SHALL 为 `docs.cimiclaw.ai`

#### Scenario: locale 自动生成
- **WHEN** 运行 `pnpm ui:i18n:sync`
- **THEN** 所有非英文 locale 文件 SHALL 自动反映 en.ts 中的品牌/命令/链接替换

#### Scenario: 术语表一致性
- **WHEN** 查看 `ui/src/i18n/.i18n/glossary.*.json` 术语表
- **THEN** 所有 glossary 文件中 source/target "OpenClaw" SHALL 更新为 "CimiClaw"

#### Scenario: sender label 显示
- **WHEN** 用户在聊天界面查看来自 Control UI 的消息 sender
- **THEN** sender label SHALL 显示 "cimiclaw-control-ui" 而非 "openclaw-control-ui"
