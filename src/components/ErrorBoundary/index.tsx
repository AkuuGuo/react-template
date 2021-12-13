/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-09 14:27:14
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-10 09:58:59
 */
import React, { ErrorInfo } from "react";

interface AppProps {}
interface AppState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong...</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
