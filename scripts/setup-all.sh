#!/bin/bash

# Gaming Admin Setup Script  
# Usage: ./scripts/setup-all.sh [install|update|clean|status]
# This script manages external micro-frontend repositories for team collaboration

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
APPS_DIR="apps"
MAIN_REPO="gaming-admin-react"

# Micro-frontend repositories (bash 3.2 compatible)
REPOS_user_report="https://github.com/kevinanew/user_report_admin_react.git"
REPOS_user_transaction="https://github.com/kevinanew/user_transaction_admin_react.git" 
REPOS_user_profile="https://github.com/kevinanew/user_profile_admin_react.git"
REPOS_app_user="https://github.com/kevinanew/app_user_admin_react.git"

# Repository names
REPO_NAMES="user-report user-transaction user-profile app-user"

print_header() {
    local message="$1"
    echo -e "${BLUE}🏗️  Gaming Admin Setup Manager${NC}"
    echo "=============================================="
    echo -e "${GREEN}$message${NC}"
    echo ""
}

print_section() {
    local section="$1"
    echo -e "\n${YELLOW}📦 $section${NC}"
    echo "----------------------------------------"
}

print_success() {
    local message="$1"
    echo -e "${GREEN}✅ $message${NC}"
}

print_error() {
    local message="$1"
    echo -e "${RED}❌ $message${NC}"
}

print_info() {
    local message="$1"
    echo -e "${BLUE}ℹ️  $message${NC}"
}

setup_apps_directory() {
    print_section "Setting up apps directory"
    
    if [ ! -d "$APPS_DIR" ]; then
        mkdir -p "$APPS_DIR"
        print_success "Created apps directory: $APPS_DIR"
    else
        print_info "Apps directory already exists: $APPS_DIR"
    fi
}

get_repo_url() {
    local name="$1"
    local repo_var="REPOS_$(echo "$name" | tr '-' '_')"
    eval echo "\$$repo_var"
}

clone_or_update_repo() {
    local name="$1"
    local url=$(get_repo_url "$name")
    local dir="$APPS_DIR/$name"
    
    if [ ! -d "$dir" ]; then
        print_info "Cloning $name..."
        git clone "$url" "$dir"
        print_success "Cloned $name"
    else
        print_info "Updating $name..."
        cd "$dir"
        git fetch origin
        git reset --hard origin/master
        cd - > /dev/null
        print_success "Updated $name"
    fi
}

install_dependencies() {
    local name="$1"
    local dir="$APPS_DIR/$name"
    
    print_info "Installing dependencies for $name..."
    cd "$dir"
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    cd - > /dev/null
    print_success "Dependencies installed for $name"
}

clean_dependencies() {
    local name="$1"
    local dir="$APPS_DIR/$name"
    
    print_info "Cleaning dependencies for $name..."
    cd "$dir"
    
    if [ -d "node_modules" ]; then
        rm -rf node_modules
        print_success "Cleaned node_modules for $name"
    fi
    
    if [ -f "package-lock.json" ]; then
        rm -f package-lock.json
        print_success "Cleaned package-lock.json for $name"
    fi
    
    cd - > /dev/null
}

setup_main_app() {
    print_section "Setting up main application"
    
    print_info "Installing main app dependencies..."
    npm install
    print_success "Main app dependencies installed"
}

setup_micro_frontends() {
    print_section "Setting up micro-frontends"
    
    for name in $REPO_NAMES; do
        echo ""
        print_info "Processing $name..."
        
        clone_or_update_repo "$name"
        
        if [ "$1" != "clean" ]; then
            install_dependencies "$name"
        else
            clean_dependencies "$name"
        fi
    done
}

show_status() {
    print_section "Project Status"
    
    echo "📁 Main Application:"
    echo "   Location: $(pwd)"
    echo "   Status: ✅ Ready"
    
    echo ""
    echo "📁 Micro-frontends:"
    for name in $REPO_NAMES; do
        local dir="$APPS_DIR/$name"
        if [ -d "$dir" ]; then
            echo "   $name: ✅ Ready ($dir)"
        else
            echo "   $name: ❌ Not found"
        fi
    done
    
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Start services: ./scripts/manage-services.sh start"
    echo "   2. Open browser: http://localhost:4200"
}

show_usage() {
    print_header "Usage Information"
    echo "Available commands:"
    echo "  install  - Clone repos and install all dependencies"
    echo "  update   - Update repos and reinstall dependencies" 
    echo "  clean    - Clean all node_modules and package-lock files"
    echo "  status   - Show current setup status"
    echo ""
    echo "Examples:"
    echo "  ./scripts/setup-all.sh install"
    echo "  ./scripts/setup-all.sh update"
    echo "  ./scripts/setup-all.sh clean"
}

# Main execution
case "${1:-install}" in
    "install")
        print_header "Installing Gaming Admin System"
        setup_apps_directory
        setup_main_app
        setup_micro_frontends "install"
        show_status
        ;;
    "update")
        print_header "Updating Gaming Admin System"
        setup_apps_directory
        setup_main_app
        setup_micro_frontends "update"
        show_status
        ;;
    "clean")
        print_header "Cleaning Gaming Admin System"
        print_info "Cleaning main app..."
        rm -rf node_modules package-lock.json 2>/dev/null || true
        print_success "Main app cleaned"
        setup_micro_frontends "clean"
        print_success "All dependencies cleaned"
        ;;
    "status")
        show_status
        ;;
    *)
        show_usage
        exit 1
        ;;
esac

print_success "Operation completed!"