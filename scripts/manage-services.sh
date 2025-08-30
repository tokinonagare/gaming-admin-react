#!/bin/bash

# Gaming Admin Services Management Script
# Usage: ./scripts/manage-services.sh [start|stop|restart|status]

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
WORKSPACE_DIR="../gaming-admin-workspace"
API_DOMAIN="${REACT_APP_API_DOMAIN:-https://admin.laiwan.io/admin/}"

# Service configuration
declare -A SERVICES=(
    ["shell"]="4200"
    ["user-report"]="4201"
    ["user-transaction"]="4202"
    ["user-profile"]="4203"
    ["app-user"]="4204"
)

# Process tracking file
PIDS_FILE="/tmp/gaming-admin-pids.txt"

print_header() {
    local message="$1"
    echo -e "${BLUE}🚀 Gaming Admin Services Manager${NC}"
    echo "=============================================="
    echo -e "${GREEN}$message${NC}"
    echo ""
}

print_section() {
    local section="$1"
    echo -e "\n${YELLOW}📊 $section${NC}"
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

print_warning() {
    local message="$1"
    echo -e "${YELLOW}⚠️  $message${NC}"
}

check_port() {
    local port="$1"
    if lsof -ti:$port >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

kill_port() {
    local port="$1"
    local pids=$(lsof -ti:$port 2>/dev/null || true)
    if [ -n "$pids" ]; then
        echo "$pids" | xargs kill -9 2>/dev/null || true
        sleep 1
        return 0
    fi
    return 1
}

start_shell() {
    print_info "Starting Shell application (port 4200)..."
    
    if check_port 4200; then
        print_warning "Port 4200 already in use, killing existing process"
        kill_port 4200
    fi
    
    cd "$(pwd)"
    REACT_APP_API_DOMAIN="$API_DOMAIN" nohup npm run serve:shell > /tmp/shell.log 2>&1 &
    local pid=$!
    echo "shell:$pid" >> "$PIDS_FILE"
    
    sleep 3
    if check_port 4200; then
        print_success "Shell started successfully (PID: $pid)"
    else
        print_error "Failed to start Shell"
        return 1
    fi
}

start_microfrontend() {
    local name="$1"
    local port="$2"
    local dir="$WORKSPACE_DIR/$name"
    
    print_info "Starting $name application (port $port)..."
    
    if [ ! -d "$dir" ]; then
        print_error "$name not found at $dir. Run setup-all.sh first."
        return 1
    fi
    
    if check_port "$port"; then
        print_warning "Port $port already in use, killing existing process"
        kill_port "$port"
    fi
    
    cd "$dir"
    REACT_APP_API_DOMAIN="$API_DOMAIN" nohup npm run dev > "/tmp/$name.log" 2>&1 &
    local pid=$!
    echo "$name:$pid" >> "$PIDS_FILE"
    cd - > /dev/null
    
    sleep 5
    if check_port "$port"; then
        print_success "$name started successfully (PID: $pid)"
    else
        print_error "Failed to start $name"
        return 1
    fi
}

start_all() {
    print_header "Starting all services"
    
    # Initialize PID file
    > "$PIDS_FILE"
    
    # Start shell first
    start_shell
    
    # Start micro-frontends
    for service in "${!SERVICES[@]}"; do
        if [ "$service" != "shell" ]; then
            start_microfrontend "$service" "${SERVICES[$service]}"
        fi
    done
    
    show_status
    
    echo ""
    print_success "All services started!"
    print_info "Main application: http://localhost:4200"
    print_info "API Domain: $API_DOMAIN"
    print_info "Log files location: /tmp/*.log"
}

stop_all() {
    print_header "Stopping all services"
    
    if [ ! -f "$PIDS_FILE" ]; then
        print_info "No PID file found, stopping by port..."
        for service in "${!SERVICES[@]}"; do
            local port="${SERVICES[$service]}"
            if kill_port "$port"; then
                print_success "Stopped service on port $port"
            fi
        done
    else
        print_info "Stopping services using PID file..."
        while IFS=':' read -r name pid; do
            if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
                kill -TERM "$pid" 2>/dev/null || kill -9 "$pid" 2>/dev/null
                print_success "Stopped $name (PID: $pid)"
            fi
        done < "$PIDS_FILE"
        rm -f "$PIDS_FILE"
    fi
    
    # Clean up any remaining processes on our ports
    print_info "Cleaning up ports..."
    for service in "${!SERVICES[@]}"; do
        local port="${SERVICES[$service]}"
        kill_port "$port" >/dev/null 2>&1 || true
    done
    
    print_success "All services stopped!"
}

restart_all() {
    print_header "Restarting all services"
    stop_all
    sleep 2
    start_all
}

show_status() {
    print_section "Service Status"
    
    printf "%-20s %-8s %-10s %-s\n" "Service" "Port" "Status" "URL"
    echo "--------------------------------------------------------"
    
    for service in shell user-report user-transaction user-profile app-user; do
        local port="${SERVICES[$service]}"
        local url="http://localhost:$port"
        
        if check_port "$port"; then
            local pid=$(lsof -ti:$port | head -1)
            printf "%-20s %-8s %-10s %-s\n" "$service" "$port" "✅ Running" "$url (PID: $pid)"
        else
            printf "%-20s %-8s %-10s %-s\n" "$service" "$port" "❌ Stopped" "$url"
        fi
    done
    
    echo ""
    if [ -f "$PIDS_FILE" ]; then
        echo "Managed PIDs:"
        cat "$PIDS_FILE" | while IFS=':' read -r name pid; do
            if kill -0 "$pid" 2>/dev/null; then
                echo "  $name: $pid (running)"
            else
                echo "  $name: $pid (dead)"
            fi
        done
    fi
}

show_logs() {
    print_header "Service Logs"
    
    echo "Available log files:"
    ls -la /tmp/{shell,user-report,user-transaction,user-profile,app-user}.log 2>/dev/null || print_info "No log files found"
    
    echo ""
    print_info "To view logs:"
    echo "  tail -f /tmp/shell.log"
    echo "  tail -f /tmp/user-report.log"
    echo "  tail -f /tmp/user-transaction.log"
    echo "  tail -f /tmp/user-profile.log"
    echo "  tail -f /tmp/app-user.log"
}

show_usage() {
    print_header "Usage Information"
    echo "Available commands:"
    echo "  start    - Start all services (shell + micro-frontends)"
    echo "  stop     - Stop all services"
    echo "  restart  - Restart all services"
    echo "  status   - Show service status"
    echo "  logs     - Show log file locations"
    echo ""
    echo "Environment variables:"
    echo "  REACT_APP_API_DOMAIN - API endpoint (default: https://admin.laiwan.io/admin/)"
    echo ""
    echo "Examples:"
    echo "  ./scripts/manage-services.sh start"
    echo "  ./scripts/manage-services.sh stop"
    echo "  REACT_APP_API_DOMAIN=https://admin.shafayouxi.org/admin/ ./scripts/manage-services.sh start"
}

# Main execution
case "${1:-status}" in
    "start")
        start_all
        ;;
    "stop")
        stop_all
        ;;
    "restart")
        restart_all
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    *)
        show_usage
        exit 1
        ;;
esac