# 🌳 微前端Git管理指南

## 📁 独立Git仓库结构

每个微前端现在都有独立的Git仓库：

```
gaming-admin-react/
├── apps/
│   ├── shell/                    ✅ 独立Git仓库
│   │   ├── .git/
│   │   ├── .gitignore
│   │   ├── package.json
│   │   └── README.md
│   ├── user-report/              ✅ 独立Git仓库
│   │   ├── .git/
│   │   ├── .gitignore  
│   │   ├── package.json
│   │   └── README.md
│   ├── user-transaction/         ✅ 独立Git仓库
│   │   ├── .git/
│   │   ├── .gitignore
│   │   ├── package.json
│   │   └── README.md
│   ├── user-profile/             ✅ 独立Git仓库
│   │   ├── .git/
│   │   ├── .gitignore
│   │   ├── package.json
│   │   └── README.md
│   └── app-user/                 ✅ 独立Git仓库
│       ├── .git/
│       ├── .gitignore
│       ├── package.json
│       └── README.md
└── .gitignore                    # 主项目忽略所有微前端目录
```

## 🛠️ Git管理工具

### 使用便捷脚本

```bash
# 查看所有微前端的Git状态
./scripts/git-microfrontends.sh status

# 为所有微前端添加远程仓库
./scripts/git-microfrontends.sh add-remote https://github.com/username

# 提交所有微前端的更改
./scripts/git-microfrontends.sh commit "feat: add new feature"

# 推送所有微前端到远程仓库
./scripts/git-microfrontends.sh push origin main
```

## 📋 .gitignore 配置

### 各微前端的 .gitignore
每个微前端都有标准的Node.js + React项目ignore规则：

```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Production
/build
/dist

# Environment
.env*

# IDE & OS
.vscode/
.idea/
.DS_Store
Thumbs.db

# TypeScript
*.tsbuildinfo

# Module Federation
/.federation

# Webpack
.webpack/
```

### 主项目的 .gitignore
主项目完全忽略所有微前端目录：

```gitignore
# Micro-frontend apps (managed with independent Git repositories)
apps/shell/
apps/user-report/
apps/user-transaction/
apps/user-profile/
apps/app-user/
```

## 🚀 推荐工作流程

### 1. 开发新功能
```bash
# 进入特定微前端
cd apps/user-profile

# 创建功能分支
git checkout -b feature/new-user-search

# 开发和提交
git add .
git commit -m "feat: implement advanced user search"

# 推送到远程
git push origin feature/new-user-search
```

### 2. 批量操作
```bash
# 查看所有仓库状态
./scripts/git-microfrontends.sh status

# 批量提交（适合配置更新等）
./scripts/git-microfrontends.sh commit "chore: update dependencies"

# 批量推送
./scripts/git-microfrontends.sh push origin main
```

### 3. 同步更新
```bash
# 拉取所有最新更改
./scripts/git-microfrontends.sh pull origin main

# 切换所有仓库到主分支
./scripts/git-microfrontends.sh checkout main
```

## 🎯 优势

### ✅ **独立开发**
- 每个团队可以独立管理自己的微前端
- 不同的发布节奏和版本控制
- 独立的分支策略和权限管理

### ✅ **清晰权限**
- 可以为不同微前端设置不同的访问权限
- 精确的代码审查范围
- 独立的CI/CD流水线

### ✅ **减少冲突**  
- 避免多团队在同一仓库中的合并冲突
- 清晰的代码所有权
- 独立的版本历史

### ✅ **灵活部署**
- 每个微前端可以独立部署
- 支持渐进式发布和回滚
- 独立的性能监控和错误追踪

## ⚠️ 注意事项

1. **共享依赖同步**: 需要手动同步共享库的版本更新
2. **集成测试**: 需要额外的集成测试流程
3. **文档管理**: 需要维护各仓库间的文档一致性
4. **CI/CD配置**: 每个仓库都需要独立的构建配置

## 📖 常用命令参考

```bash
# 脚本命令
./scripts/git-microfrontends.sh status      # 查看状态
./scripts/git-microfrontends.sh commit      # 批量提交
./scripts/git-microfrontends.sh push        # 批量推送
./scripts/git-microfrontends.sh add-remote  # 添加远程仓库

# 单独操作
cd apps/user-profile                        # 进入特定微前端
git status                                   # 查看状态
git add . && git commit -m "message"        # 提交更改
git push origin main                         # 推送到远程

# 主项目操作
git status                                   # 主项目状态（不包含微前端）
git add libs/ scripts/ *.md *.json          # 只提交共享资源
git commit -m "chore: update shared config" # 提交共享配置
```

---

🎉 **现在每个微前端都有独立的Git管理，支持团队独立开发和部署！**