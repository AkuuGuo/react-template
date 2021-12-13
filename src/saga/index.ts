/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 10:36:12
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-10 11:16:38
 */

import { all } from "redux-saga/effects";
import watchLogin from "./login";

export interface SagaAction {}

function* watchAll() {
  yield all([watchLogin()]);
}

export default watchAll;
