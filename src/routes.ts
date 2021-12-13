/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-09 14:36:57
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-13 09:39:04
 */
import { lazy } from "react";
import Layout from "./layout";
import Home from "./pages/Home";

const Login = lazy(() => import(/* webpackPrefetch: true */ "./pages/Login"));
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
    ],
  },
];

export default routes;
