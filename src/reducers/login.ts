/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 10:12:32
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-10 13:19:42
 */
import { handleActions } from "redux-actions";
import { LOGINSTATE } from "../actions";

export type LoginState = {
  loginState: Boolean;
};

const initState: LoginState = {
  loginState: false,
};

export const loginReducers = handleActions(
  {
    [LOGINSTATE]: (state, { payload }) => {
      console.log("reducers login", payload);
      return {
        ...state,
        loginState: payload.loginState,
      };
    },
  },
  initState
);
