import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

export const login = createAction<actionTypes.Login>(actionTypes.LOGIN);
export const loginSuccess = createAction<actionTypes.LoginSuccess>(actionTypes.LOGIN_SUCCESS);
export const loginFail = createAction(actionTypes.LOGIN_FAIL);
