/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-09 11:23:47
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-10 11:23:53
 */
import { Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import reportWebVitals from "./reportWebVitals";
import routes from "./routes";
import { Provider } from "react-redux";
import LodingPage from "./components/LodingPage";
import store from "./store";
import "./global.css";

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={<LodingPage />}>{renderRoutes(routes)}</Suspense>
      </HashRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
