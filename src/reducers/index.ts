import { combineReducers } from "redux";
import { LoginState, loginReducers } from "./login";

export interface RootState {
  login: LoginState;
}

export const rootReducers = combineReducers({
  login: loginReducers,
});
