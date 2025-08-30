# Gaming Admin React

游戏平台管理系统 - 基于 React + Webpack + Module Federation 的微前端架构

## 项目架构

这是一个采用微前端架构的游戏平台管理系统，借鉴了Nx的项目结构设计理念，基于以下技术栈：

- **⚛️ React 18**: 现代React开发
- **📦 Module Federation**: 运行时模块加载和共享
- **🔧 Webpack 5**: 模块打包和构建工具
- **🎨 Ant Design**: 企业级UI组件库
- **📝 TypeScript**: 类型安全
- **🔒 认证系统**: 完整的登录认证和状态管理
- **🌐 React Query**: API状态管理和数据缓存

## 项目结构

这个主仓库包含Shell应用和共享库，微前端应用在独立仓库中管理：

```
gaming-admin-react/                    # 🏠 主仓库
├── apps/
│   └── shell/              # 🏠 Shell主应用（Host）- 端口4200
│       ├── src/app/        # 主应用逻辑
│       ├── src/fallbacks/  # 🛡️ 微前端降级组件
│       └── webpack.config.js
├── libs/
│   └── shared/
│       ├── ui/            # 🎨 共享UI组件库
│       │   ├── components/  # 基础组件(Layout、UserAvatar等)
│       │   ├── contexts/    # React Context(AuthContext等)
│       │   └── providers/   # 全局Provider(QueryProvider等)
│       ├── utils/         # 🛠️ 共享工具库
│       │   ├── api/        # API请求封装(BaseApi、ApiHeaderFactory)
│       │   ├── auth/       # 认证相关(AuthStorage等)
│       │   ├── hooks/      # React Hooks(useApiRequest等)
│       │   └── constants/  # 常量配置(AppConfig等)
│       └── types/         # 📋 共享类型定义
└── scripts/               # 🔧 构建和管理脚本
```

### 独立微前端仓库

每个微前端都有独立的Git仓库，支持独立开发和部署：

- 📊 **user-report** → [`user_report_admin_react`](https://github.com/kevinanew/user_report_admin_react) (端口4201)
- 💰 **user-transaction** → [`user_transaction_admin_react`](https://github.com/kevinanew/user_transaction_admin_react) (端口4202)  
- 👤 **user-profile** → [`user_profile_admin_react`](https://github.com/kevinanew/user_profile_admin_react) (端口4203)
- 📱 **app-user** → [`app_user_admin_react`](https://github.com/kevinanew/app_user_admin_react) (端口4204)

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 8+

### 一键安装（推荐）
使用自动化脚本安装整个系统：

```bash
# 安装所有应用和依赖
./scripts/setup-all.sh install

# 启动所有服务
./scripts/manage-services.sh start

# 打开浏览器访问
open http://localhost:4200
```

### 一键服务管理
```bash
# 启动所有服务（Shell + 微前端）
./scripts/manage-services.sh start

# 停止所有服务
./scripts/manage-services.sh stop

# 重启所有服务
./scripts/manage-services.sh restart

# 查看服务状态
./scripts/manage-services.sh status

# 查看日志文件
./scripts/manage-services.sh logs
```

### 手动安装（高级用户）

#### 安装依赖
```bash
npm install
```

#### 启动Shell主应用
```bash
# 启动主应用（本仓库）
npm run serve:shell
```

#### 启动微前端应用
每个微前端需要在其独立仓库中启动：

```bash
# 克隆并启动各个微前端仓库
git clone https://github.com/kevinanew/user_report_admin_react.git
cd user_report_admin_react && npm install && npm run dev

git clone https://github.com/kevinanew/user_transaction_admin_react.git  
cd user_transaction_admin_react && npm install && npm run dev

git clone https://github.com/kevinanew/user_profile_admin_react.git
cd user_profile_admin_react && npm install && npm run dev

git clone https://github.com/kevinanew/app_user_admin_react.git
cd app_user_admin_react && npm install && npm run dev
```

### 生产环境配置
```bash
# 设置API域名环境变量
export REACT_APP_API_DOMAIN=https://admin.laiwan.io/admin/

# 或使用.env文件配置
echo "REACT_APP_API_DOMAIN=https://admin.laiwan.io/admin/" > .env.production
```

## 📋 功能特性

### 🔒 认证系统
- 统一登录页面 (`/login`)
- JWT令牌管理
- 自动登录状态持久化
- 401错误处理和重定向
- 路由权限守卫

### 🎨 默认头像系统
- 智能头像组件 `UserAvatar`
- CSS纯代码实现的恶魔默认头像
- 自动降级显示机制
- 统一的头像管理

### 📊 微前端模块
- **用户报告**: 数据统计和报告展示
- **用户交易**: 钱包管理和交易记录
- **用户档案**: 基础信息和资料管理  
- **应用用户**: 用户权限和设置管理

## 🔧 可用脚本

### 🚀 系统管理脚本（推荐）
- `./scripts/setup-all.sh install` - 一键安装所有应用和依赖
- `./scripts/setup-all.sh update` - 一键更新所有应用和依赖
- `./scripts/setup-all.sh clean` - 清理所有 node_modules
- `./scripts/setup-all.sh status` - 查看系统安装状态

- `./scripts/manage-services.sh start` - 启动所有服务
- `./scripts/manage-services.sh stop` - 停止所有服务
- `./scripts/manage-services.sh restart` - 重启所有服务
- `./scripts/manage-services.sh status` - 查看服务运行状态
- `./scripts/manage-services.sh logs` - 查看服务日志

### Shell主应用
- `npm start` - 启动Shell主应用
- `npm run serve:shell` - 启动Shell主应用 (端口4200)
- `npm run build` - 构建Shell应用
- `npm run clean` - 清理构建产物

### 微前端Git管理
- `./scripts/git-microfrontends.sh status` - 查看所有微前端Git状态
- `./scripts/git-microfrontends.sh commit "message"` - 批量提交微前端更改
- `./scripts/git-microfrontends.sh push origin master` - 批量推送微前端

### 代码质量
- `npm run lint` - 代码检查
- `npm run typecheck` - TypeScript类型检查

## 🏗️ 微前端特性

### Host应用 (Shell)
- 🏠 统一的应用入口和路由管理
- 🛡️ 错误边界和降级处理  
- 🔄 动态模块加载
- 📱 响应式布局框架
- 🔒 完整的登录认证系统
- 🎨 默认头像系统(恶魔设计)

### Remote应用
- 📊 **User Report**: 用户报告和数据分析
- 💰 **User Transaction**: 用户交易和钱包管理  
- 👤 **User Profile**: 用户档案和基础信息管理
- 📱 **App User**: 应用用户管理
- 🖼️ **User Avatar**: 用户头像管理 (暂时移除)

### 共享库
- 🎨 **Shared UI**: 统一的UI组件库
  - `Layout` - 页面布局组件
  - `UserAvatar` - 智能头像组件(支持默认头像)
  - `AuthRoute` - 认证路由守卫
  - `AuthContext` - 认证状态管理
- 🛠️ **Shared Utils**: 通用工具和API封装
  - `BaseApi` - 统一API请求基类
  - `AuthStorage` - 令牌存储管理
  - `useApiRequest` - API请求Hook
- 📋 **Shared Types**: TypeScript类型定义

## 🔧 技术特点

### Module Federation配置
- ✅ 运行时依赖共享
- ✅ 独立部署能力
- ✅ 渐进式加载
- ✅ 版本隔离
- ✅ 错误降级处理

### 认证与状态管理
- 🔒 JWT令牌认证
- 🌐 React Query + Context模式
- 💾 本地存储状态持久化
- 🔄 自动刷新机制
- 🛡️ 路由权限守卫

### 开发体验
- 🚀 HMR热更新支持
- 🔍 TypeScript智能提示
- 🎯 按需加载和代码分割
- 🔧 自定义构建脚本
- 🎨 统一UI组件系统

### 生产优化
- 📦 Bundle分析和优化
- 🗜️ 代码压缩和Tree Shaking
- 💾 智能缓存策略
- 🌐 CDN友好部署
- 📊 API请求优化

## 🚀 部署

### 生产构建

#### Shell主应用（本仓库）
```bash
# 构建Shell应用
npm run build
```

#### 微前端应用（独立仓库）
每个微前端需要在其独立仓库中构建：
```bash
# 在各自仓库中构建
cd user_report_admin_react && npm run build
cd user_transaction_admin_react && npm run build  
cd user_profile_admin_react && npm run build
cd app_user_admin_react && npm run build
```

### 部署架构

#### 独立部署模式
每个应用可以独立部署到不同的域名或CDN：

- **Shell主应用**: `https://admin.example.com/` (主域名)
- **用户报告**: `https://reports.example.com/` (独立域名)
- **用户交易**: `https://transactions.example.com/` (独立域名)
- **用户档案**: `https://profiles.example.com/` (独立域名)
- **应用用户**: `https://users.example.com/` (独立域名)

#### 仓库对应关系
- 📊 [`user_report_admin_react`](https://github.com/kevinanew/user_report_admin_react) → 用户报告服务
- 💰 [`user_transaction_admin_react`](https://github.com/kevinanew/user_transaction_admin_react) → 用户交易服务
- 👤 [`user_profile_admin_react`](https://github.com/kevinanew/user_profile_admin_react) → 用户档案服务
- 📱 [`app_user_admin_react`](https://github.com/kevinanew/app_user_admin_react) → 应用用户服务

### 环境变量配置
创建 `.env.production` 文件：
```bash
# API服务器域名
REACT_APP_API_DOMAIN=https://admin.laiwan.io/admin/

# 应用名称
REACT_APP_NAME=Gaming Admin

# 应用版本
REACT_APP_VERSION=1.0.0
```

## 🐛 故障排除

### 常见问题

1. **Federation Runtime 错误**
   ```bash
   # 检查所有微前端服务是否启动
   npm run serve:all
   ```

2. **API请求失败**
   ```bash
   # 确认API域名配置正确
   echo $REACT_APP_API_DOMAIN
   ```

3. **登录认证问题**
   - 检查本地存储中的认证令牌
   - 确认API返回的token字段名称

4. **默认头像不显示**
   - 确认使用 `UserAvatar` 组件而不是 `Avatar`
   - 检查 `src` 属性为空或null时的降级逻辑

## 📁 微前端仓库管理

### Git仓库架构
本项目采用独立仓库模式管理微前端：

- **主仓库**: [`gaming-admin-react`](https://github.com/tokinonagare/gaming-admin-react) - Shell + 共享库
- **微前端仓库**: 各自独立的Git仓库，支持独立开发和部署

### 管理脚本
使用便捷脚本管理所有微前端仓库：
```bash
# 查看所有微前端状态
./scripts/git-microfrontends.sh status

# 批量提交更改
./scripts/git-microfrontends.sh commit "feat: add new feature"

# 批量推送到远程
./scripts/git-microfrontends.sh push origin master
```

### 优势
- ✅ **独立开发**: 团队可以独立管理各自的微前端
- ✅ **独立部署**: 支持不同的发布节奏和版本控制  
- ✅ **权限管理**: 可以为不同微前端设置不同的访问权限
- ✅ **减少冲突**: 避免多团队在同一仓库中的合并冲突

## 🤝 贡献

### 主仓库贡献
1. Fork [`gaming-admin-react`](https://github.com/tokinonagare/gaming-admin-react) 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 微前端仓库贡献
对应各自的独立仓库进行贡献，流程相同

## 📄 许可证

MIT License