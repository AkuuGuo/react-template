/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 10:11:10
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-10 10:27:11
 */
import { combineReducers } from "redux";
import { LoginState, loginReducers } from "./login";

export interface RootState {
  login: LoginState;
}

export const rootReducers = combineReducers({
  login: loginReducers,
});
