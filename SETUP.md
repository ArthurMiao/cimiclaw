# OpenClaw 快速启动指南

## 1. 环境要求

| 项 | 要求 |
|---|---|
| **Node.js** | >= 22.16.0 |
| **包管理器** | pnpm@11.0.8（通过 Corepack） |

## 2. 安装依赖

```bash
pnpm install
```

## 3. 配置 API Key

```bash
cp .env.example .env
```

编辑 `.env`，取消注释并填入至少一个模型 API Key：

```
ZAI_API_KEY=你的智谱API Key
```

## 4. 配置默认模型（可选）

编辑 `~/.openclaw/openclaw.json`，在 `agents.defaults` 下添加：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "zai/glm-5.1"
      }
    }
  }
}
```

## 5. 构建 UI

```bash
pnpm ui:build
```

首次启动前必须执行一次，后续 UI 代码变更后需重新构建。

## 6. 启动开发服务器

```bash
pnpm dev gateway
```

首次启动会自动构建 TypeScript（约 3-5 分钟），后续启动仅增量构建。

启动成功后看到：

```
[gateway] agent model: zai/glm-5.1
[gateway] http server listening
[gateway] ready
```

## 7. 访问页面

- **聊天界面**：http://127.0.0.1:18789/
- **健康检查**：http://127.0.0.1:18789/healthz

首次访问会显示登录页面（这是前端 WebSocket 连接入口）。由于已配置免认证（`auth.mode: none`），直接点击 **Connect** 按钮即可进入聊天界面，无需填写 Token。

## 8. 常用命令

```bash
pnpm dev gateway          # 启动开发服务器
pnpm gateway:dev          # 跳过渠道的快速开发模式
pnpm ui:dev               # UI 开发
pnpm test                 # 运行测试
pnpm check                # 代码检查
pnpm format               # 格式化
```
