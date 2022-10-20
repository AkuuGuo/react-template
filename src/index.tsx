import "react-app-polyfill/stable";
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

import VConsole from "vconsole";
new VConsole();

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
