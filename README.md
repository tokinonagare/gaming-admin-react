# Gaming Admin React

游戏平台管理系统 - 基于 React + Webpack + Module Federation 的微前端架构

## 项目架构

这是一个采用微前端架构的游戏平台管理系统，借鉴了Nx的项目结构设计理念，基于以下技术栈：

- **⚛️ React 18**: 现代React开发
- **📦 Module Federation**: 运行时模块加载和共享
- **🔧 Webpack 5**: 模块打包和构建工具
- **🎨 Ant Design**: 企业级UI组件库
- **📝 TypeScript**: 类型安全

## 项目结构

```
gaming-admin-react/
├── apps/
│   ├── shell/              # 🏠 主应用（Host） - 端口4200
│   ├── user-report/        # 📊 用户报告管理 - 端口4201  
│   ├── user-transaction/   # 💰 用户交易管理 - 端口4202
│   ├── user-profile/       # 👤 用户档案管理 - 端口4203
│   ├── app-user/          # 📱 应用用户管理 - 端口4204
│   └── user-avatar/       # 🖼️ 用户头像管理 - 端口4205
├── libs/
│   └── shared/
│       ├── ui/            # 🎨 共享UI组件库
│       ├── utils/         # 🛠️ 共享工具库
│       └── types/         # 📋 共享类型定义
└── scripts/               # 🔧 构建脚本
```

## 🚀 快速开始

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
npm run serve:avatar        # 用户头像
npm run serve:app-user      # 应用用户

# 同时启动所有应用
npm run serve:all
```

### 可用脚本

**启动服务:**
- `npm start` - 启动Shell主应用
- `npm run serve:shell` - 启动Shell主应用 (端口4200)
- `npm run serve:report` - 启动用户报告微应用 (端口4201)
- `npm run serve:transaction` - 启动用户交易微应用 (端口4202)
- `npm run serve:profile` - 启动用户档案微应用 (端口4203)
- `npm run serve:avatar` - 启动用户头像微应用 (端口4205)
- `npm run serve:app-user` - 启动应用用户微应用 (端口4204)
- `npm run serve:all` - 同时启动所有应用

**构建部署:**
- `npm run build` - 构建所有应用
- `npm run build:parallel` - 并行构建所有应用(更快)
- `npm run clean` - 清理构建产物

**代码质量:**
- `npm run lint` - 代码检查
- `npm run typecheck` - TypeScript类型检查

## 🏗️ 微前端特性

### Host应用 (Shell)
- 🏠 统一的应用入口和路由管理
- 🛡️ 错误边界和降级处理  
- 🔄 动态模块加载
- 📱 响应式布局框架

### Remote应用
- 📊 **User Report**: 用户报告和数据分析
- 💰 **User Transaction**: 用户交易管理  
- 👤 **User Profile**: 用户档案管理
- 🖼️ **User Avatar**: 用户头像管理
- 📱 **App User**: 应用用户管理

### 共享库
- 🎨 **Shared UI**: 统一的UI组件和样式
- 🛠️ **Shared Utils**: 通用工具函数
- 📋 **Shared Types**: TypeScript类型定义

## 🔧 技术特点

### Module Federation配置
- ✅ 运行时依赖共享
- ✅ 独立部署能力
- ✅ 渐进式加载
- ✅ 版本隔离

### 开发体验
- 🚀 HMR热更新支持
- 🔍 TypeScript智能提示
- 🎯 按需加载和代码分割
- 🔧 自定义构建脚本

### 生产优化
- 📦 Bundle分析和优化
- 🗜️ 代码压缩和Tree Shaking
- 💾 智能缓存策略
- 🌐 CDN友好部署

## 🚀 部署

```bash
# 生产构建
npm run build

# 或者并行构建（更快）
npm run build:parallel

# 部署到各自的域名/路径
# Shell: /
# Gaming Admin: /gaming-admin/
```

### 部署结构
构建后的文件位于 `dist/` 目录：
- `dist/apps/shell/` - 主应用构建产物
- `dist/apps/user-report/` - 用户报告应用构建产物  
- `dist/apps/user-transaction/` - 用户交易应用构建产物
- `dist/apps/user-profile/` - 用户档案应用构建产物
- `dist/apps/user-avatar/` - 用户头像应用构建产物
- `dist/apps/app-user/` - 应用用户应用构建产物

每个应用对应你的独立仓库，可以独立部署到不同的域名或路径下，支持独立发版和灰度发布。

**仓库对应关系：**
- `user_report_admin_react` → `apps/user-report`
- `user_transaction_admin_react` → `apps/user-transaction`
- `user_profile_admin_react` → `apps/user-profile`
- `user_avatar_admin_react` → `apps/user-avatar`
- `app_user_admin_react` → `apps/app-user`

## 🤝 贡献

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License