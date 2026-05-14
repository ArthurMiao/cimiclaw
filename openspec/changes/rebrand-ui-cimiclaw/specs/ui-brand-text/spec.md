## ADDED Requirements

### Requirement: 品牌文本统一为 CimiClaw
Control UI 中所有用户可见的品牌名称 SHALL 显示为 "CimiClaw"，包括但不限于：sidebar 标题、login 页标题和 logo alt 文本、breadcrumb 面包屑、实时对话 transcript 标签、思考状态提示、Service Worker 通知标题、Web App Manifest 的 name/short_name、HTML 页面 title。

#### Scenario: sidebar 品牌显示
- **WHEN** 用户打开 Control UI 并查看侧边栏
- **THEN** sidebar 品牌标题 SHALL 显示 "CimiClaw"，logo alt 属性 SHALL 为 "CimiClaw"

#### Scenario: 登录页品牌显示
- **WHEN** 用户访问登录页面
- **THEN** 登录页标题 SHALL 显示 "CimiClaw"，logo alt 属性 SHALL 为 "CimiClaw"

#### Scenario: 实时对话标签
- **WHEN** 用户使用 Talk 功能且 assistant 回复
- **THEN** transcript 中 assistant 消息前缀 SHALL 显示 "CimiClaw:"

#### Scenario: 思考状态提示
- **WHEN** Talk 功能处于 thinking 状态
- **THEN** 状态文本 SHALL 显示 "Asking CimiClaw..."

#### Scenario: 页面标题
- **WHEN** 用户在浏览器中打开 Control UI
- **THEN** 浏览器标签页标题 SHALL 显示 "CimiClaw Control"

#### Scenario: 通知标题
- **WHEN** 浏览器收到来自 Service Worker 的推送通知
- **THEN** 通知标题默认 SHALL 为 "CimiClaw"

#### Scenario: 导出文件名前缀
- **WHEN** 用户导出 usage 数据或日志文件
- **THEN** 文件名前缀 SHALL 使用 "cimiclaw-"（如 `cimiclaw-usage-sessions-*.csv`）

#### Scenario: dashboard 面包屑
- **WHEN** 用户在非 overview 页面查看 dashboard header
- **THEN** 面包屑根链接文本 SHALL 显示 "CimiClaw"
