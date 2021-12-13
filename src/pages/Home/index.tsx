/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-09 13:56:51
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-13 10:34:11
 */

import { useDispatch, useSelector } from "react-redux";
import { LOGIN, GETDEPTLIST } from "../../actions";
import logo from "./logo.svg";
import styles from "./styles.module.scss";

const Home = (props: any) => {
  const dispatch = useDispatch();

  const loginHandle = () => {
    dispatch({
      type: LOGIN,
      payload: { loginState: true },
    });
    dispatch({
      type: GETDEPTLIST,
      payload: {
        callback: callback,
      },
    });
    // props.history.push("/login");
  };

  const callback = (res: any) => {
    console.log("res", res);
  };

  const store = useSelector((store) => store);
  console.log("store", store);
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={loginHandle}>立即登录</button>
      </header>
    </div>
  );
};

export default Home;
