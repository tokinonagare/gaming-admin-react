# Gaming Admin React

游戏平台管理系统

## 架构概览

微前端架构，每个应用独立仓库：

```
主仓库 (gaming-admin-react)           独立微前端仓库
├── Shell应用 (4200)                  ├── 用户报告 (4201)
├── 共享UI库                          ├── 用户交易 (4202)  
├── 工具库                            ├── 用户档案 (4203)
└── 管理脚本                          └── 应用用户 (4204)
```

## 快速开始
```bash
# 1. 安装整个系统
./scripts/setup-all.sh install

# 2. 启动所有服务  
./scripts/manage-services.sh start

# 3. 访问应用
open http://localhost:4200
```

### 环境要求
- Node.js 18+
- npm 8+

## 微前端应用

| 应用 | 端口 | 仓库 |
|------|------|------|
| Shell | 4200 | 本仓库 |
| 用户报告 | 4201 | [user_report_admin_react](https://github.com/kevinanew/user_report_admin_react) |
| 用户交易 | 4202 | [user_transaction_admin_react](https://github.com/kevinanew/user_transaction_admin_react) |
| 用户档案 | 4203 | [user_profile_admin_react](https://github.com/kevinanew/user_profile_admin_react) |
| 应用用户 | 4204 | [app_user_admin_react](https://github.com/kevinanew/app_user_admin_react) |

## 技术栈

- React 18 + TypeScript
- Webpack 5 + Module Federation  
- Ant Design
- React Query + React Context
- JWT认证

## 开发指南

### 系统管理
```bash
# 安装/更新系统
./scripts/setup-all.sh install    # 首次安装
./scripts/setup-all.sh update     # 更新所有依赖
./scripts/setup-all.sh clean      # 清理node_modules
./scripts/setup-all.sh status     # 查看安装状态

# 服务管理
./scripts/manage-services.sh start     # 启动所有服务
./scripts/manage-services.sh stop      # 停止所有服务
./scripts/manage-services.sh restart   # 重启所有服务
./scripts/manage-services.sh status    # 查看服务状态
./scripts/manage-services.sh logs      # 查看日志位置
```

### Shell应用开发
```bash
# Shell应用（仅限本仓库开发）
npm start              # 启动Shell应用
npm run build          # 构建Shell应用
npm run lint           # 代码检查
npm run typecheck      # 类型检查
```

### 微前端Git管理
```bash
# 批量管理微前端仓库
./scripts/git-microfrontends.sh status           # 查看Git状态
./scripts/git-microfrontends.sh commit "message" # 批量提交
./scripts/git-microfrontends.sh push origin master # 批量推送
```

### 环境配置
```bash
# 使用不同环境启动
REACT_APP_API_DOMAIN=https://admin.laiwan.io/admin/ ./scripts/manage-services.sh start     # 生产环境
REACT_APP_API_DOMAIN=https://admin.shafayouxi.org/admin/ ./scripts/manage-services.sh start # Staging环境
```

## 项目结构

### 主仓库结构
```
gaming-admin-react/
├── apps/shell/                 # Shell主应用
│   ├── src/app/               # 应用主逻辑
│   ├── src/fallbacks/         # 微前端降级组件
│   └── webpack.config.js      # 构建配置
├── libs/shared/               # 共享库
│   ├── ui/                    # UI组件库
│   │   ├── components/        # 通用组件
│   │   ├── contexts/          # React Context
│   │   └── providers/         # 全局Provider
│   ├── utils/                 # 工具库
│   │   ├── api/              # API封装
│   │   ├── auth/             # 认证工具
│   │   └── hooks/            # 自定义Hooks
│   └── types/                 # TypeScript类型
├── scripts/                   # 管理脚本
│   ├── setup-all.sh          # 系统安装脚本
│   ├── manage-services.sh    # 服务管理脚本
│   └── git-microfrontends.sh # Git管理脚本
├── .env.example              # 环境变量示例
├── .env.production           # 生产环境配置
└── package.json              # Shell依赖配置
```

### 工作区结构
脚本会自动创建工作区目录：
```
../gaming-admin-workspace/     # 自动创建的工作区
├── user-report/              # 用户报告微前端
├── user-transaction/         # 用户交易微前端
├── user-profile/            # 用户档案微前端
└── app-user/                # 应用用户微前端
```


## 部署

### 开发环境
```bash
# 启动所有服务
./scripts/manage-services.sh start
# 访问: http://localhost:4200
```

### 生产构建
```bash
# 构建Shell应用
npm run build

# 各微前端在独立仓库中构建
cd ../gaming-admin-workspace/user-report && npm run build
cd ../gaming-admin-workspace/user-transaction && npm run build
# ... 其他微前端
```

### 环境变量
创建 `.env` 文件：
```bash
# API配置
REACT_APP_API_DOMAIN=https://admin.laiwan.io/admin/     # 生产环境
# REACT_APP_API_DOMAIN=https://admin.shafayouxi.org/admin/ # Staging环境

# 应用信息
REACT_APP_STAGE=production
REACT_APP_NAME=Gaming Admin  
REACT_APP_VERSION=1.0.0
```


## 故障排除

### 常见问题

**1. 服务启动失败**
```bash
# 检查端口占用
./scripts/manage-services.sh status

# 重启所有服务
./scripts/manage-services.sh restart
```

**2. 微前端加载失败**
```bash
# 检查微前端是否启动
./scripts/manage-services.sh status

# 查看错误日志
./scripts/manage-services.sh logs
tail -f /tmp/user-report.log
```

**3. API请求失败**
```bash
# 检查环境变量
echo $REACT_APP_API_DOMAIN

# 使用正确的API地址启动
REACT_APP_API_DOMAIN=https://admin.laiwan.io/admin/ ./scripts/manage-services.sh start
```

**4. 依赖安装问题**
```bash
# 清理并重新安装
./scripts/setup-all.sh clean
./scripts/setup-all.sh install
```

