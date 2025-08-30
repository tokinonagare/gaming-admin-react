# 🏗️ 微前端结构说明

## 📁 项目结构

```
gaming-admin-react/
├── package.json                 # 根项目配置
├── apps/                        # 微前端应用目录
│   ├── shell/                   # 主应用 (端口: 4200)
│   │   ├── package.json         ✅ 新增
│   │   ├── webpack.config.js
│   │   └── src/
│   ├── user-report/             # 用户举报 (端口: 4201)  
│   │   ├── package.json         ✅ 新增
│   │   ├── webpack.config.js
│   │   └── src/
│   ├── user-transaction/        # 用户交易 (端口: 4202)
│   │   ├── package.json         ✅ 新增
│   │   ├── webpack.config.js
│   │   └── src/
│   ├── user-profile/           # 用户档案 (端口: 4203)
│   │   ├── package.json         ✅ 新增
│   │   ├── webpack.config.js
│   │   └── src/
│   └── app-user/               # 应用用户 (端口: 4204)
│       ├── package.json         ✅ 新增
│       ├── webpack.config.js
│       └── src/
└── libs/                       # 共享库
    └── shared/
        ├── ui/                 # 共享UI组件
        ├── utils/              # 共享工具
        └── types/              # 共享类型
```

## 📦 各微前端 package.json 特点

### 1. 独立依赖管理
每个微前端都有自己的：
- React、Ant Design 等核心依赖
- 各自特定的业务依赖
- 独立的构建和开发脚本

### 2. 统一版本控制
所有微前端使用相同版本的：
- React: ^18.2.0
- Ant Design: ^5.4.0
- TanStack Query: ^5.85.5
- Module Federation: ^0.2.5

### 3. 独立开发端口
- Shell: 4200 (主应用)
- User Report: 4201
- User Transaction: 4202  
- User Profile: 4203
- App User: 4204

## 🚀 使用方式

### 安装依赖
```bash
# 安装根项目 + 所有微前端依赖
npm run install:all

# 只安装微前端依赖
npm run install:apps
```

### 开发模式
```bash
# 启动所有微前端
npm run serve:all

# 启动单个微前端
npm run serve:shell
npm run serve:report
npm run serve:transaction
npm run serve:profile
npm run serve:app-user
```

### 构建生产版本
```bash
# 构建所有应用
npm run build

# 构建单个应用
npm run build:shell
npm run build:report
npm run build:transaction
npm run build:profile
npm run build:app-user
```

### 清理
```bash
# 清理构建文件 + 所有node_modules
npm run clean:all

# 只清理微前端node_modules
npm run clean:apps
```

## ✅ 优势

1. **🔧 独立开发**: 每个团队可以独立开发和部署
2. **📦 依赖隔离**: 避免依赖版本冲突
3. **🚀 并行构建**: 可以并行构建多个微前端
4. **🎯 精确控制**: 每个应用可以有不同的构建配置
5. **🔄 技术多样性**: 不同微前端可以使用不同技术栈

## 📋 注意事项

1. **共享依赖**: React、Ant Design等通过Module Federation共享
2. **版本统一**: 核心依赖版本需要保持一致
3. **端口管理**: 开发时注意端口冲突
4. **构建顺序**: Shell应用需要最后构建（依赖其他微前端）

---

✅ **现在每个微前端都有独立的 package.json，支持独立开发和部署！**