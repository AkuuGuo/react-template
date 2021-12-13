/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-09 14:32:16
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-10 09:48:41
 */
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
