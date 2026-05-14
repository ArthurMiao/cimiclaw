## Why

当前 `/chat` 仍依附于 Control UI 的全局壳层：左侧总导航、顶部操作区、会话选择器和其他菜单都会占据空间，这与它作为 iframe 内嵌聊天页的最终使用方式不匹配。现在需要先把 `/chat` 收敛成一个可嵌入、可被父窗口驱动、并且视觉上更贴近业务设计稿的专用聊天入口，避免后续在接入宿主页面时继续叠加兼容逻辑。

## What Changes

- 为 `/chat` 引入面向 iframe 的嵌入式聊天壳层模式，隐藏当前 Control UI 的全局左侧菜单和无关页面 chrome。
- 将“历史对话”和“定时任务”聚合到聊天页左侧专用栏，提供新对话入口、搜索框和列表区域。
- 将“Skills”和“使用情况”以轻量入口放到聊天主区右上角，替代当前全局导航中的访问方式。
- 将聊天空态与输入区重构为新的视觉布局：居中欢迎文案、品牌 logo、底部大输入框和发送按钮。
- 新增父窗口 `message` 驱动的页面跳转/切换机制，使 iframe 宿主可以控制聊天页进入指定区域或会话。

## Capabilities

### New Capabilities
- `chat-embed-shell`: 定义 `/chat` 在 iframe 场景下的专用壳层、导航入口布局、父窗口消息驱动跳转，以及空态聊天体验要求。

### Modified Capabilities
- 无

## Impact

- 受影响 UI 壳层与路由：`ui/src/ui/app-render.ts`、`ui/src/styles/layout.css`、`ui/src/ui/app-settings.ts`
- 受影响聊天页结构与样式：`ui/src/ui/views/chat.ts`、`ui/src/ui/chat/chat-welcome.ts`、`ui/src/styles/chat/layout.css`
- 受影响导航与 tab 入口：`ui/src/ui/navigation.ts`
- 可能新增 iframe/父窗口通信处理与静态资源引用，用于接入宿主页面和新的 chat logo

## Non-goals

- 不重做整个 Control UI 的全局导航体系，只限定 `/chat` 的嵌入式体验。
- 不在本次变更中重构聊天消息渲染、模型调用、工具卡片或发送协议。
- 不改变 `skills`、`usage`、`sessions`、`cron` 的后端数据来源，只调整在 `/chat` 中的入口与呈现方式。
