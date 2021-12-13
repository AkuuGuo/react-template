/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 10:36:22
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-13 10:38:39
 */
import { call, put, takeEvery } from "@redux-saga/core/effects";
import { Action } from "redux-actions";
import { SagaAction } from ".";
import fetchServerDataSaga, { Result, RequestPayload } from "../server";
import { LOGIN, LOGINSTATE, GETDEPTLIST } from "../actions";
import { getDeptList } from "../constants/api/home";

const fetch: any = (param: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: { state: true },
        message: "成功",
      });
    }, 1000);
  });
};

function* login(action: Action<SagaAction>) {
  const response: Result = yield call(fetch);
  yield put({
    type: LOGINSTATE,
    payload: {
      loginState: true,
    },
  });
  return response;
}

function* getDeptListHandle(action: Action<SagaAction>) {
  const params: RequestPayload = {
    path: getDeptList,
    method: "get",
    ...action.payload,
  };
  yield fetchServerDataSaga(params);
}

function* watchLogin() {
  yield takeEvery(LOGIN, login);
  yield takeEvery(GETDEPTLIST, getDeptListHandle);
}

export default watchLogin;
