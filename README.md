# Gaming Admin React

游戏平台管理系统 - 基于微前端架构的现代化管理平台

## 🏗️ 架构概览

采用独立仓库的微前端架构，支持团队独立开发和部署：

```
📂 主仓库 (gaming-admin-react)           📂 独立微前端仓库
├── 🏠 Shell应用 (4200)                 ├── 📊 用户报告 (4201)
├── 🎨 共享UI库                          ├── 💰 用户交易 (4202)  
├── 🛠️ 工具库                           ├── 👤 用户档案 (4203)
└── 🔧 管理脚本                          └── 📱 应用用户 (4204)
```

## 🚀 快速开始

### 一键启动（推荐）
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

## 🎯 微前端应用

| 应用 | 端口 | 仓库 | 功能 |
|------|------|------|------|
| 🏠 Shell | 4200 | 本仓库 | 主应用、认证、路由 |
| 📊 用户报告 | 4201 | [user_report_admin_react](https://github.com/kevinanew/user_report_admin_react) | 数据统计和报告展示 |
| 💰 用户交易 | 4202 | [user_transaction_admin_react](https://github.com/kevinanew/user_transaction_admin_react) | 钱包管理和交易记录 |
| 👤 用户档案 | 4203 | [user_profile_admin_react](https://github.com/kevinanew/user_profile_admin_react) | 基础信息和资料管理 |
| 📱 应用用户 | 4204 | [app_user_admin_react](https://github.com/kevinanew/app_user_admin_react) | 用户权限和设置管理 |

## 🔧 技术栈

**前端框架**
- React 18 + TypeScript
- Webpack 5 + Module Federation
- Ant Design + 自定义组件库

**状态管理**
- React Query (API状态)
- React Context (全局状态)
- JWT认证 + AuthStorage

**开发工具**
- ESLint + TypeScript
- Git子模块管理
- 自动化脚本

## 💻 开发指南

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

## 🛠️ 项目结构

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

## 🌐 核心功能

### 🔒 认证系统
- 统一登录页面
- JWT令牌管理
- 自动状态持久化
- 401错误处理
- 路由权限守卫

### 🎨 共享组件库
- Layout布局组件
- UserAvatar智能头像（CSS恶魔默认头像）
- AuthRoute认证路由
- 统一的UI风格

### 📊 微前端集成
- Module Federation运行时加载
- 共享依赖管理
- 错误边界和降级处理
- 独立部署支持

## 🚀 部署

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

## 🏛️ 架构优势

### ✅ 独立开发
- 每个微前端有独立的Git仓库
- 团队可以独立管理代码和发布
- 不同的技术栈和开发节奏

### ✅ 灵活部署  
- 支持独立部署到不同域名
- 渐进式发布和回滚
- CDN友好的静态资源

### ✅ 代码共享
- 统一的UI组件库
- 共享的工具函数和类型
- 一致的认证和API层

## 🛡️ 故障排除

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

## 🤝 参与贡献

### 主仓库贡献
```bash
git clone https://github.com/tokinonagare/gaming-admin-react.git
cd gaming-admin-react
# 开发Shell应用和共享库
```

### 微前端贡献
```bash
# 贡献各个微前端
git clone https://github.com/kevinanew/user_report_admin_react.git
cd user_report_admin_react
# 开发对应的微前端功能
```

## 📄 许可证

MIT License

---

🎮 **Gaming Admin** - 现代化游戏平台管理系统