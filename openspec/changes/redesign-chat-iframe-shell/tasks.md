## 1. Embed 模式与共享 shell 收口

- [x] 1.1 为 `/chat` 及相关 iframe 入口定义显式 embed 模式状态，并接入现有路由/设置同步逻辑
- [x] 1.2 在 `ui/src/ui/app-render.ts` 和 `ui/src/styles/layout.css` 中隐藏 embed 模式下的全局左侧菜单、顶部栏和默认内容头部
- [x] 1.3 确保非 embed 模式下现有 Control UI shell 与聊天行为保持不变

## 2. 聊天页左栏与主区重构

- [x] 2.1 在 `ui/src/ui/views/chat.ts` 中重构 `/chat` 的页面骨架，形成“左侧专用栏 + 右侧主区”布局
- [x] 2.2 将“新对话”“历史对话”“定时任务”和搜索区域接入左侧栏，并复用现有 sessions/cron 数据源
- [x] 2.3 调整 chat 样式文件，使空态、消息线程、底部输入框和发送按钮符合新视觉结构

## 3. 轻量导航与父窗口消息驱动

- [x] 3.1 在 embed 模式下为主区右上角添加 `Skills` 和“使用情况”入口，并保持最小 chrome 导航体验
- [x] 3.2 增加浏览器级 `window.message` 监听与消息 schema 校验，支持父窗口驱动 tab 跳转和 session 切换
- [x] 3.3 处理未知、非法或不完整消息的忽略路径，确保不会破坏当前 tab、session 或聊天状态

## 4. 品牌资源、兼容性与验证

- [x] 4.1 将 `chat_claw_logo.png` 纳入 UI 可服务的静态资源路径，并替换欢迎空态中的品牌图引用
- [x] 4.2 处理 embed 模式下现有 sidebar/canvas 预览与响应式布局的兼容行为，避免与新左栏冲突
- [x] 4.3 为 embed 模式路由、父窗口消息导航和聊天空态补充/更新测试，并执行相关 UI 验证
