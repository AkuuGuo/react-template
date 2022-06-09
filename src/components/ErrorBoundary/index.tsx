import { Component, ErrorInfo } from "react";
import { notFound } from "../../assets/images";
import { Redirect } from "react-router";
import styles from "./styles.module.scss";

interface AppProps {}
interface AppState {
  hasError: false;
  error: any;
  redirect: boolean;
}
class ErrorBoundary extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      redirect: false,
    };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  // 神策埋点上报
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("ErrorBoundary caught an error", error, info);
  }

  componentDidMount() {
    window.addEventListener(
      "error",
      (e) => {
        if (!e.isTrusted) {
          console.log(e, "WebError=========>>>>>>>");
        }
      },
      true
    );
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  handleClick() {
    window.location.reload();
  }
  render() {
    const { error, hasError, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/home" />;
    }

    if (hasError) {
      return (
        <div className={styles.networkdelay}>
          <div
            onClick={this.handleClick}
            className={styles.networkwapper}
            style={{ backgroundImage: `url(${notFound}) ` }}
          >
            {error.name === "ChunkLoadError" ? (
              <p>应用程序已更新，点击重新加载~</p>
            ) : (
              <p>前方拥堵，点击重新加载~</p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
