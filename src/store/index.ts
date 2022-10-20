import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootReducers } from "../reducers";
import saga from "../saga";
import { composeWithDevTools } from "redux-devtools-extension";
const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(saga);
export default store;
