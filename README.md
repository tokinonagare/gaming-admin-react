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

```
gaming-admin-react/
├── apps/
│   ├── shell/              # 🏠 主应用（Host）- 端口4200
│   │   ├── src/pages/      # 📄 登录页面等
│   │   └── src/fallbacks/  # 🛡️ 微前端降级组件
│   ├── user-report/        # 📊 用户报告管理 - 端口4201  
│   ├── user-transaction/   # 💰 用户交易管理 - 端口4202
│   ├── user-profile/       # 👤 用户档案管理 - 端口4203
│   ├── app-user/          # 📱 应用用户管理 - 端口4204
│   └── user-avatar/       # 🖼️ 用户头像管理 - 端口4205 (暂时移除)
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
└── scripts/               # 🔧 构建脚本
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 8+

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
# 启动主应用
npm run serve:shell

# 启动各个微应用
npm run serve:report        # 用户报告
npm run serve:transaction   # 用户交易  
npm run serve:profile       # 用户档案
npm run serve:app-user      # 应用用户
# npm run serve:avatar      # 用户头像 (暂时移除)

# 同时启动所有应用
npm run serve:all
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

### 启动服务
- `npm start` - 启动Shell主应用
- `npm run serve:shell` - 启动Shell主应用 (端口4200)
- `npm run serve:report` - 启动用户报告微应用 (端口4201)
- `npm run serve:transaction` - 启动用户交易微应用 (端口4202)
- `npm run serve:profile` - 启动用户档案微应用 (端口4203)
- `npm run serve:app-user` - 启动应用用户微应用 (端口4204)
- `npm run serve:all` - 同时启动所有应用

### 构建部署
- `npm run build` - 构建所有应用
- `npm run build:parallel` - 并行构建所有应用(更快)
- `npm run clean` - 清理构建产物

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
```bash
# 生产构建
npm run build

# 或者并行构建（更快）
npm run build:parallel
```

### 部署结构
构建后的文件位于 `dist/` 目录：
- `dist/apps/shell/` - 主应用构建产物
- `dist/apps/user-report/` - 用户报告应用构建产物  
- `dist/apps/user-transaction/` - 用户交易应用构建产物
- `dist/apps/user-profile/` - 用户档案应用构建产物
- `dist/apps/app-user/` - 应用用户应用构建产物

### 仓库对应关系
每个应用对应独立仓库，可以独立部署到不同的域名或路径下：

- `user_report_admin_react` → `apps/user-report`
- `user_transaction_admin_react` → `apps/user-transaction`
- `user_profile_admin_react` → `apps/user-profile`
- `app_user_admin_react` → `apps/app-user`

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

## 🤝 贡献

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

MIT License