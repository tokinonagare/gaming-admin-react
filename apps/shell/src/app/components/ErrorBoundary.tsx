import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status=\"error\"
          title=\"模块加载失败\"
          subTitle={`发生错误：${this.state.error?.message || '未知错误'}`}
          extra={[
            <Button 
              type=\"primary\" 
              key=\"reload\"
              onClick={() => window.location.reload()}
            >
              重新加载
            </Button>,
            <Button 
              key=\"home\"
              onClick={() => window.location.href = '/'}
            >
              返回首页
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;