#!/bin/bash

# Git operations for all micro-frontends
# Usage: ./scripts/git-microfrontends.sh <command> [args...]

set -e

# Define micro-frontend apps
APPS=("user-report" "user-transaction" "user-profile" "app-user")

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}🏗️  Gaming Admin Micro-frontends Git Manager${NC}"
    echo "=================================================="
}

print_app_header() {
    local app=$1
    echo -e "\n${GREEN}📦 Processing: ${app}${NC}"
    echo "----------------------------------------"
}

print_error() {
    local app=$1
    local error=$2
    echo -e "${RED}❌ Error in ${app}: ${error}${NC}"
}

print_success() {
    local app=$1
    local message=$2
    echo -e "${GREEN}✅ ${app}: ${message}${NC}"
}

# Function to execute git command in each app directory
execute_git_command() {
    local command="$1"
    local args="${@:2}"
    
    print_header
    echo "Executing: git $command $args"
    echo ""
    
    for app in "${APPS[@]}"; do
        print_app_header "$app"
        
        if [ -d "apps/$app" ]; then
            cd "apps/$app"
            
            if [ -d ".git" ]; then
                if git $command $args; then
                    print_success "$app" "Command executed successfully"
                else
                    print_error "$app" "Command failed"
                fi
            else
                print_error "$app" "Not a git repository"
            fi
            
            cd - > /dev/null
        else
            print_error "$app" "Directory not found"
        fi
    done
}

# Function to show status of all repositories
show_status() {
    print_header
    echo "Git Status for all micro-frontends:"
    echo ""
    
    for app in "${APPS[@]}"; do
        print_app_header "$app"
        
        if [ -d "apps/$app/.git" ]; then
            cd "apps/$app"
            
            # Get current branch
            branch=$(git branch --show-current 2>/dev/null || echo "unknown")
            
            # Get status
            if git diff-index --quiet HEAD -- 2>/dev/null; then
                status="clean"
                color=$GREEN
            else
                status="modified"
                color=$YELLOW
            fi
            
            # Get commit count
            commits=$(git rev-list --count HEAD 2>/dev/null || echo "0")
            
            echo -e "Branch: ${BLUE}${branch}${NC}"
            echo -e "Status: ${color}${status}${NC}"
            echo -e "Commits: ${commits}"
            
            # Show uncommitted changes if any
            if [ "$status" = "modified" ]; then
                echo -e "${YELLOW}Modified files:${NC}"
                git status --porcelain | head -5
                if [ $(git status --porcelain | wc -l) -gt 5 ]; then
                    echo "  ... and more"
                fi
            fi
            
            cd - > /dev/null
        else
            print_error "$app" "Not a git repository"
        fi
    done
}

# Function to add remote repositories
add_remotes() {
    local base_url=$1
    if [ -z "$base_url" ]; then
        echo -e "${RED}Usage: $0 add-remote <base-url>${NC}"
        echo -e "Example: $0 add-remote https://github.com/username"
        exit 1
    fi
    
    print_header
    echo "Adding remote repositories..."
    echo "Base URL: $base_url"
    echo ""
    
    # Define repository mappings (bash 3.2 compatible)
    get_repo_name() {
        case "$1" in
            "user-report") echo "gaming-admin-user-report" ;;
            "user-transaction") echo "gaming-admin-user-transaction" ;;
            "user-profile") echo "gaming-admin-user-profile" ;;
            "app-user") echo "gaming-admin-app-user" ;;
            *) echo "gaming-admin-$1" ;;
        esac
    }
    
    for app in "${APPS[@]}"; do
        print_app_header "$app"
        
        if [ -d "apps/$app/.git" ]; then
            cd "apps/$app"
            
            repo_name=$(get_repo_name "$app")
            remote_url="$base_url/$repo_name.git"
            
            if git remote add origin "$remote_url" 2>/dev/null; then
                print_success "$app" "Remote added: $remote_url"
            else
                echo -e "${YELLOW}⚠️  Remote 'origin' already exists, updating...${NC}"
                git remote set-url origin "$remote_url"
                print_success "$app" "Remote updated: $remote_url"
            fi
            
            cd - > /dev/null
        else
            print_error "$app" "Not a git repository"
        fi
    done
}

# Main command dispatcher
case "$1" in
    "status"|"st")
        show_status
        ;;
    "add-remote")
        add_remotes "$2"
        ;;
    "commit")
        if [ -z "$2" ]; then
            echo -e "${RED}Usage: $0 commit <message>${NC}"
            exit 1
        fi
        execute_git_command "add" "."
        execute_git_command "commit" "-m" "$2"
        ;;
    "push")
        execute_git_command "push" "${@:2}"
        ;;
    "pull")
        execute_git_command "pull" "${@:2}"
        ;;
    "branch")
        execute_git_command "branch" "${@:2}"
        ;;
    "checkout")
        execute_git_command "checkout" "${@:2}"
        ;;
    *)
        echo -e "${BLUE}🏗️  Gaming Admin Micro-frontends Git Manager${NC}"
        echo ""
        echo "Available commands:"
        echo "  status, st          - Show git status for all micro-frontends"
        echo "  add-remote <url>    - Add remote origin to all repositories"
        echo "  commit <message>    - Add and commit changes in all repositories"
        echo "  push [args...]      - Push changes in all repositories"
        echo "  pull [args...]      - Pull changes in all repositories"
        echo "  branch [args...]    - Execute git branch in all repositories"
        echo "  checkout [args...]  - Execute git checkout in all repositories"
        echo ""
        echo "Examples:"
        echo "  $0 status"
        echo "  $0 add-remote https://github.com/username"
        echo "  $0 commit 'feat: add new feature'"
        echo "  $0 push origin main"
        ;;
esac