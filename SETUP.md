# CimiClaw 快速启动指南

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

编辑 `.env`，填入至少一个模型 API Key。例如使用智谱：

```
ZAI_API_KEY=你的智谱API Key
```

也支持其他提供商（按需填一个即可）：

```
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...
# GEMINI_API_KEY=...
# OPENROUTER_API_KEY=sk-or-...
```

## 4. 初始化配置

运行 onboard 向导，交互式完成模型选择、网关认证等初始配置：

```bash
pnpm openclaw onboard
```

向导会在 `~/.cimiclaw/` 下生成 `cimiclaw.json` 配置文件。

> **已有旧配置？** 如果之前使用过 `~/.openclaw/`，系统会自动迁移到 `~/.cimiclaw/`。也可以手动将 `~/.openclaw/openclaw.json` 复制到 `~/.cimiclaw/cimiclaw.json`。

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

首次访问会显示登录页面。如果 onboard 时选择了免认证（`auth.mode: none`），直接点击 **Connect** 即可进入聊天界面，无需填写 Token。

## 8. 常用命令

```bash
pnpm dev gateway          # 启动开发服务器
pnpm gateway:dev          # 跳过渠道的快速开发模式
pnpm ui:dev               # UI 开发（热更新）
pnpm test                 # 运行测试
pnpm check                # 代码检查
pnpm format               # 格式化
pnpm openclaw onboard     # 重新运行配置向导
pnpm openclaw doctor      # 诊断和修复配置问题
```

## 配置文件位置

| 路径 | 说明 |
|---|---|
| `~/.cimiclaw/cimiclaw.json` | 主配置文件（模型、网关、渠道等） |
| `~/.cimiclaw/.env` 或项目 `.env` | API Key 和环境变量 |
| `~/.cimiclaw/workspace/` | Agent 工作区 |
| `~/.cimiclaw/credentials/` | 渠道/提供商凭证 |
