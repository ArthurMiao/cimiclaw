## ADDED Requirements

### Requirement: Embed mode MUST provide a minimal shell for iframe use
系统 MUST 为 `/chat` 提供显式的 embed 模式。在该模式下，页面 MUST 隐藏 Control UI 的全局左侧菜单、顶部栏以及默认内容头部，并在非 embed 模式下保持现有控制台行为不变。

#### Scenario: Embed mode hides shared chrome
- **WHEN** 用户以 embed 模式打开 `/chat`
- **THEN** 页面仅展示嵌入式聊天壳层所需的导航与内容区域

#### Scenario: Standard mode preserves existing shell
- **WHEN** 用户以非 embed 模式打开 `/chat`
- **THEN** 页面继续显示现有 Control UI shell 与聊天页行为

### Requirement: Chat page MUST show a dedicated left rail for conversations and scheduled tasks
在 embed 模式下，`/chat` 页面 MUST 在左侧提供专用栏，并至少包含“新对话”入口、“历史对话”与“定时任务”两个分区、搜索输入，以及可滚动的列表区域。历史对话 MUST 映射现有 sessions 数据，定时任务 MUST 映射现有 cron/job 数据。

#### Scenario: User starts a new conversation from the left rail
- **WHEN** 用户点击左侧栏中的“新对话”入口
- **THEN** 系统创建或切换到新的 chat 会话，并将主区聚焦到该会话

#### Scenario: User switches between history and scheduled tasks
- **WHEN** 用户在左侧栏选择历史对话项或定时任务项
- **THEN** 系统 MUST 打开对应的会话或目标页面/视图，而不依赖全局左侧菜单

### Requirement: Chat page MUST provide top-right shortcuts for Skills and Usage
在 embed 模式下，聊天主区右上角 MUST 提供 `Skills` 与“使用情况”两个轻量导航入口。这两个入口 MUST 复用现有 `skills` 与 `usage` 路由语义，并且导航后 MUST 继续维持最小化 shell，而不是恢复完整后台导航。

#### Scenario: User opens Skills from the embed shell
- **WHEN** 用户点击右上角 `Skills`
- **THEN** 系统导航到 `skills` 对应内容，并保持 embed 模式的最小 chrome

#### Scenario: User opens Usage from the embed shell
- **WHEN** 用户点击右上角“使用情况”入口
- **THEN** 系统导航到 `usage` 对应内容，并保持 embed 模式的最小 chrome

### Requirement: Empty chat state MUST match the embedded landing layout
当当前 chat 会话没有消息时，embed 模式下的主区 MUST 显示居中的欢迎文案、品牌 logo 和辅助说明，并在底部显示大尺寸输入框和发送按钮。欢迎区域 MUST 与实际会话线程互斥：一旦存在消息，系统 MUST 改为显示正常消息线程。

#### Scenario: Empty session shows branded welcome state
- **WHEN** 当前 chat 会话没有任何消息
- **THEN** 主区显示欢迎标题、辅助文案、品牌 logo 和底部输入区

#### Scenario: Active session replaces welcome state with thread
- **WHEN** 当前 chat 会话已有消息
- **THEN** 主区显示消息线程与输入区，而不再显示欢迎空态

### Requirement: Parent window messages MUST drive hidden-route navigation safely
embed 模式 MUST 支持接收父窗口 `message` 事件来执行页面跳转或会话切换。系统 MUST 仅响应受支持的消息类型和合法 payload；对于未知、非法或不完整的消息，系统 MUST 忽略且不得改变当前页面状态。

#### Scenario: Parent window navigates to a supported tab
- **WHEN** 父窗口发送合法的导航消息，目标为受支持的 tab
- **THEN** 系统切换到对应内容，并保持 embed 模式的最小 chrome

#### Scenario: Parent window selects a specific chat session
- **WHEN** 父窗口发送合法消息并包含有效的 chat session 标识
- **THEN** 系统切换到该 session，并在主区展示对应聊天内容

#### Scenario: Invalid message is ignored
- **WHEN** 页面接收到未知类型、缺失字段或非法 payload 的 `message` 事件
- **THEN** 系统忽略该消息，且当前 tab、session 与界面状态保持不变
