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
