## ADDED Requirements

### Requirement: 文档链接域名统一为 docs.cimiclaw.ai
Control UI 中所有指向文档的链接 SHALL 使用 `docs.cimiclaw.ai` 域名，替换原有的 `docs.openclaw.ai`。涵盖 sidebar 帮助链接、overview 页面文档链接、login-gate 文档链接、app-settings 文档链接、agents-panels-status-files 文档链接、代码注释中的示例 URL。

#### Scenario: sidebar 帮助链接
- **WHEN** 用户点击 sidebar 中的帮助链接
- **THEN** 链接 href SHALL 指向 `https://docs.cimiclaw.ai`

#### Scenario: overview 文档链接
- **WHEN** 用户查看 overview 页面中的文档链接
- **THEN** 所有文档链接 SHALL 使用 `docs.cimiclaw.ai` 域名

#### Scenario: login-gate 文档链接
- **WHEN** 用户在登录页看到帮助/文档链接
- **THEN** 默认 docsHref SHALL 为 `https://docs.cimiclaw.ai/web/dashboard`，所有特定场景链接 SHALL 使用 `docs.cimiclaw.ai` 域名

#### Scenario: 测试断言同步
- **WHEN** 运行 login-gate 相关测试
- **THEN** 链接断言 SHALL 检查 `docs.cimiclaw.ai` 而非 `docs.openclaw.ai`
