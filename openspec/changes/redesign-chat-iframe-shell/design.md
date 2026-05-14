## Context

当前 Control UI 采用共享 shell：`ui/src/ui/app-render.ts` 负责顶部栏、全局左侧导航和内容头部，`/chat` 只是其中一个 tab。聊天主体由 `ui/src/ui/views/chat.ts` 渲染，默认结构偏向“线程 + 可选右侧 sidebar”的控制台形态，而不是独立的嵌入式聊天页面。

目标页面最终会被宿主系统通过 iframe 承载，因此有三类约束同时存在：

- 视觉约束：需要贴近给定设计稿，保留左侧专用栏、右上角轻量入口、居中空态和底部大输入框。
- 路由约束：需要隐藏现有全局菜单，但又不能切断到 `skills`、`usage` 等现有 tab 的访问。
- 宿主约束：需要接受父窗口 `message` 指令执行页面跳转或会话切换，同时避免把现有 WebView2 native bridge 逻辑混成同一种通信渠道。

此外，新的 claw logo 当前来源于本地桌面路径，真正实现时必须进入 UI 可分发的静态资源体系，不能依赖绝对本机路径。

## Goals / Non-Goals

**Goals:**

- 为 `/chat` 提供明确的 iframe/embed 模式，并在该模式下隐藏全局 shell chrome。
- 将聊天页重构为“左侧专用导航栏 + 右侧主区”的布局，同时复用已有 sessions、cron、skills、usage 数据与路由。
- 定义浏览器级 `window.message` 导航协议，使父窗口可以驱动 tab 跳转和会话切换。
- 保持非 embed 场景下的现有 Control UI 行为不变，降低对普通控制台用户的影响。

**Non-Goals:**

- 不重写 Gateway、chat controller、消息流式渲染或工具调用机制。
- 不在本次设计中重构 `skills`、`usage`、`sessions`、`cron` 对应的数据接口。
- 不把所有非聊天页面都重做成设计稿样式，只保证 embed 模式下能在最小 chrome 中访问必要页面。

## Decisions

### 1. 采用显式 embed 模式，而不是自动根据 iframe 环境切换

`/chat` 将引入显式 embed 开关，由 URL 或宿主注入状态决定是否进入嵌入式壳层。这样可以避免开发环境、独立打开页面、截图测试等场景因为运行在 iframe 内就意外进入极简模式。

备选方案：

- **自动检测 `window.self !== window.top`**：实现简单，但容易误伤预览和测试环境。
- **仅靠父窗口首条 message 激活**：依赖时序，首屏可能先闪现旧 UI。

选择显式模式，是为了保证首屏稳定和回滚简单。

### 2. 在 shell 层隐藏全局 chrome，在 chat view 层重建页面结构

embed 模式的“隐藏菜单”属于全局 shell 问题，应落在 `ui/src/ui/app-render.ts` 与 `ui/src/styles/layout.css`：隐藏顶部栏、全局左侧菜单、内容头部等共享元素。聊天页的左侧栏、空态、输入区属于 `renderChat()` 内部结构问题，应落在 `ui/src/ui/views/chat.ts` 与 `ui/src/styles/chat/layout.css`。

备选方案：

- **只在 CSS 上覆盖现有 shell**：改动少，但容易和现有 header/sidebar DOM 互相干扰。
- **完全新建独立页面入口**：隔离最好，但会复制现有 chat 路由、状态和数据加载逻辑。

选择“shell 收口 + chat 内重构”，是为了最大化复用现有状态管理与路由同步逻辑。

### 3. 左侧专用栏复用现有 sessions/cron 数据，不新建独立数据模型

“历史对话”直接消费现有 sessions 数据，“定时任务”消费现有 cron/job 数据。左侧栏只改变呈现与筛选方式，不引入新接口，也不把它们重新建模成新的资源类型。

备选方案：

- **新建 chat rail API**：可以做更贴合 UI 的聚合结构，但会扩大后端和前端改动面。
- **保留现有顶部 session selector**：实现快，但与设计稿不符，也无法承载“定时任务”并排导航。

选择复用现有数据，是因为本次变化的核心是 shell 和导航体验，而不是数据域本身。

### 4. 浏览器级父窗口通信与 WebView2 native bridge 分离

当前仓库已有 `ui/src/ui/app-native-bridge.ts`，但它只面向 WebView2。embed 模式将新增浏览器级 `window.addEventListener("message", ...)` 监听，使用独立的消息 schema 处理父窗口导航，例如 tab 跳转、进入 chat、选择指定 session。

该监听必须执行严格校验：

- 仅识别白名单 `type`
- 校验 `payload` 结构
- 对未知消息无副作用
- 仅触发现有允许的 tab/session 迁移路径

备选方案：

- **复用 native bridge 类型**：会混淆浏览器宿主和 WebView2 宿主的职责边界。
- **暴露全局函数给父窗口调用**：耦合更高，也更难做安全边界控制。

### 5. top-right 入口保留现有 tab 语义，但在 embed 模式下使用最小导航呈现

右上角的 `Skills` 和 `使用情况` 不重新发明路由语义，而是继续映射到 `skills`、`usage` tab。区别在于 embed 模式下不再显示完整的 Control UI 导航，只显示这两个轻量入口，以匹配设计稿并减少 iframe 内的导航噪音。

这意味着 embed 模式不仅影响 `/chat` 主体，也要求共享 shell 在相关 tab 下维持最小 chrome，避免用户点击 `Skills` 或 `使用情况` 后重新看到完整后台导航。

### 6. 品牌资源进入仓库管理的静态资源路径

`chat_claw_logo.png` 必须迁移到 UI 可服务的静态资源目录，并通过仓库内路径引用。实现阶段不允许直接引用 `C:\Users\...` 这类绝对路径。

## Risks / Trade-offs

- **[embed 模式影响共享 shell]** → 通过显式开关隔离默认行为，并把条件判断收敛到 shell 级状态，避免散落在各个 view 中。
- **[父窗口 message 存在误触发风险]** → 只接受受限 schema，忽略未知消息；实现时优先限定来源窗口和可执行动作集合。
- **[左侧栏承载 sessions + cron 后密度变高]** → 通过分组、搜索和滚动区域控制复杂度，移动端再降级为抽屉或折叠模式。
- **[右侧 markdown/canvas sidebar 与新布局冲突]** → embed 模式下保留能力，但避免默认常驻分栏，优先采用叠层或按需打开。
- **[Skills/使用情况 页面未做同等级视觉改造]** → 本次先保证最小 chrome 一致性，不承诺对每个 tab 完成完整设计稿式重绘。

## Migration Plan

1. 先以显式 embed 模式落地，默认访问路径保持现状。
2. 由宿主 iframe URL 切换到 embed 模式入口，并逐步接入父窗口 `message` 导航。
3. 若上线后出现问题，可直接移除 embed 参数或关闭宿主入口，恢复到现有 `/chat` 行为。

## Open Questions

- `Skills` 和 `使用情况` 在 iframe 内是否只需要最小 chrome，还是也需要进一步贴近这套新视觉语言？
- 父窗口消息是否需要 origin allowlist，还是当前宿主环境可以接受仅按消息 schema 和来源窗口过滤？
- “定时任务”左栏是否展示任务详情预览，还是仅承担跳转入口？
