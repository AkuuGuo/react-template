import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { useLocation, Redirect } from "react-router";
import ErrorBoundary from "../components/ErrorBoundary";
import styles from "./stylse.module.scss";

const Layout = ({ route }: RouteConfigComponentProps) => {
  const location = useLocation();
  if (location.pathname === "/") {
    return <Redirect to="/home" />;
  }
  return (
    <ErrorBoundary>
      <div className={styles.layout}>
        <div className={styles.layoutHeader}>头部导航</div>
        <div className={styles.layoutContent}>
          {route && renderRoutes(route.routes)}
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default Layout;
