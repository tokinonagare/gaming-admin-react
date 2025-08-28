# Gaming Admin React

游戏平台管理系统 - 基于 Nx + React + Module Federation 的微前端架构

## 项目架构

这是一个采用微前端架构的游戏平台管理系统，基于以下技术栈：

- **🏗️ Nx Workspace**: 提供monorepo管理和构建工具链
- **⚛️ React 18**: 现代React开发
- **📦 Module Federation**: 运行时模块加载和共享
- **🎨 Ant Design**: 企业级UI组件库
- **📝 TypeScript**: 类型安全

## 项目结构

```
gaming-admin-react/
├── apps/
│   ├── shell/                 # 🏠 主应用（Host）
│   ├── gaming-admin/          # 🎮 游戏管理微应用
│   ├── user-management/       # 👥 用户管理微应用
│   └── game-management/       # 🎯 游戏管理微应用
├── libs/
│   └── shared/
│       ├── ui/               # 🎨 共享UI组件库
│       ├── utils/            # 🛠️ 共享工具库
│       └── types/            # 📋 共享类型定义
└── tools/                    # 🔧 构建工具和脚本
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

# 启动游戏管理微应用
npm run serve:admin

# 构建所有应用
npm run build:all
```

### 可用脚本

- `npm start` - 启动Shell主应用
- `npm run serve:shell` - 启动Shell主应用
- `npm run serve:admin` - 启动游戏管理微应用  
- `npm run build:all` - 构建所有应用
- `npm run lint` - 代码检查
- `npm run test` - 运行测试
- `npm run affected:build` - 构建受影响的应用

## 🏗️ 微前端特性

### Host应用 (Shell)
- 🏠 统一的应用入口和路由管理
- 🛡️ 错误边界和降级处理  
- 🔄 动态模块加载
- 📱 响应式布局框架

### Remote应用
- 🎮 **Gaming Admin**: 仪表盘和数据分析
- 👥 **User Management**: 用户管理功能
- 🎯 **Game Management**: 游戏内容管理

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
- 📦 Nx缓存加速构建
- 🎯 按需加载和代码分割

### 生产优化
- 📦 Bundle分析和优化
- 🗜️ 代码压缩和Tree Shaking
- 💾 智能缓存策略
- 🌐 CDN友好部署

## 🚀 部署

```bash
# 生产构建
npm run build:all

# 部署到各自的域名/路径
# Shell: /
# Gaming Admin: /gaming-admin/
# User Management: /user-management/  
# Game Management: /game-management/
```

## 🤝 贡献

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License