import { all } from "redux-saga/effects";
import watchLogin from "./login";

export interface SagaAction {}

function* watchAll() {
  yield all([watchLogin()]);
}

export default watchAll;
