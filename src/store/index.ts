/*
 * @Description: 😊
 * @Author: Gooyh
 * @Date: 2021-12-10 10:07:47
 * @LastEditors: Gooyh
 * @LastEditTime: 2021-12-10 11:19:28
 */
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducers } from "../reducers";
import saga from "../saga";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
export default store;
