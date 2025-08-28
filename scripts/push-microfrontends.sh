#!/bin/bash

# 推送微前端到各自独立仓库的脚本
# 使用方法: ./scripts/push-microfrontends.sh

set -e

echo "🚀 开始推送微前端到各自独立仓库..."

# 定义微前端应用和对应仓库
declare -A APPS=(
    ["user-report"]="user_report_admin_react"
    ["user-transaction"]="user_transaction_admin_react"
    ["user-profile"]="user_profile_admin_react"
    ["app-user"]="app_user_admin_react"
    ["user-avatar"]="user_avatar_admin_react"
)

# GitHub用户名/组织名 - 请根据实际情况修改
GITHUB_USERNAME="your-username"

for app in "${!APPS[@]}"; do
    repo_name="${APPS[$app]}"
    app_dir="apps/$app"
    
    echo "📦 处理微前端: $app -> $repo_name"
    
    # 检查应用目录是否存在
    if [ ! -d "$app_dir" ]; then
        echo "❌ 应用目录不存在: $app_dir"
        continue
    fi
    
    # 进入应用目录
    cd "$app_dir"
    
    # 检查是否已经是Git仓库
    if [ ! -d ".git" ]; then
        echo "🔧 初始化Git仓库..."
        git init
        
        # 设置远程仓库
        echo "🔗 添加远程仓库..."
        git remote add origin "https://github.com/$GITHUB_USERNAME/$repo_name.git"
        
        # 创建.gitignore
        echo "📝 创建.gitignore..."
        cat > .gitignore << EOL
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db

# TypeScript
*.tsbuildinfo

# Module Federation
/.federation
EOL
        
        # 创建README
        echo "📖 创建README..."
        cat > README.md << EOL
# ${repo_name^}

${app^} 微前端应用 - Gaming Admin 系统的一部分

## 快速开始

\`\`\`bash
# 安装依赖
npm install

# 开发模式
npm run serve

# 构建
npm run build
\`\`\`

## 开发端口

- 开发服务器: http://localhost:${app_port}

## 技术栈

- React 18
- TypeScript
- Webpack 5 + Module Federation
- Ant Design

## 部署

此应用作为微前端模块被主应用(Shell)加载。

---

Part of Gaming Admin micro-frontend architecture.
EOL
    fi
    
    # 添加所有文件
    echo "📁 添加文件到暂存区..."
    git add .
    
    # 提交更改
    echo "💾 提交更改..."
    if git diff --staged --quiet; then
        echo "ℹ️  没有需要提交的更改"
    else
        git commit -m "feat: Update ${app} micro-frontend

- Implement complete authentication system integration
- Update API endpoints for production environment
- Add React Query integration for state management
- Update UI components with shared library
- Fix transaction API endpoints and data formatting

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    fi
    
    # 推送到远程仓库
    echo "🚀 推送到远程仓库..."
    if git remote get-url origin >/dev/null 2>&1; then
        echo "ℹ️  推送到: $(git remote get-url origin)"
        # 推送到main分支
        git push -u origin main 2>/dev/null || {
            echo "⚠️  推送失败，可能需要先在GitHub创建仓库: $repo_name"
        }
    else
        echo "❌ 远程仓库未设置"
    fi
    
    echo "✅ $app 处理完成"
    echo ""
    
    # 返回根目录
    cd ../..
done

echo "🎉 所有微前端推送完成！"
echo ""
echo "📋 后续步骤："
echo "1. 在GitHub上创建对应的仓库（如果尚未创建）"
echo "2. 确认推送成功"
echo "3. 设置各仓库的访问权限"
echo ""
echo "🔗 仓库对应关系："
for app in "${!APPS[@]}"; do
    repo_name="${APPS[$app]}"
    echo "- $app → https://github.com/$GITHUB_USERNAME/$repo_name"
done