import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGIN, GETDEPTLIST } from "../../actions";
import logo from "./logo.svg";
import styles from "./styles.module.scss";

const Home = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginHandle = useCallback(() => {
    dispatch({
      type: LOGIN,
      payload: { loginState: true },
    });
    // dispatch({
    //   type: GETDEPTLIST,
    //   payload: {
    //     callback: () => {},
    //   },
    // })
    history.push("/login");
  }, [dispatch, history]);

  const store = useSelector((store) => store);
  console.log("store", store);
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>
          <a
            className={styles.AppLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            首页展示
          </a>
        </p>
        <br />
        <button onClick={loginHandle}>立即登录</button>
      </header>
    </div>
  );
};

export default Home;
