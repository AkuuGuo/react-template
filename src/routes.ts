import { lazy } from "react";
import Layout from "./layout";
import Home from "./pages/Home";

const Login = lazy(() => import("./pages/Login"));
const NoMatch = lazy(() => import("./pages/404"));
const routes = [
  {
    key: "layout",
    path: "/",
    component: Layout,
    routes: [
      {
        key: "home",
        path: "/home",
        exact: true,
        component: Home,
        pathname: "首页",
      },
      {
        key: "login",
        path: "/login",
        exact: true,
        component: Login,
        pathname: "登录页",
      },
      {
        key: "noMath",
        path: "*",
        exact: true,
        component: NoMatch,
        pathname: "页面不存在",
      },
    ],
  },
];

export default routes;
