import createReducer from "../../../helpers/createReducer.helper";
import { AuthState, initialState } from "./state";
import * as actionTypes from "./actionTypes";

export const authReducer = createReducer<AuthState>(initialState, {
    [actionTypes.LOGIN](state) {
        return {
            ...state,
            requestingLogin: true,
            isAuthorized: false,
        };
    },
    [actionTypes.LOGIN_SUCCESS](state, action: actionTypes.LoginSuccess) {
        return {
            ...state,
            jwtToken: action.jwtToken,
            user: action.user,
            requestingLogin: false,
            isAuthorized: true,
        };
    },
    [actionTypes.LOGIN_FAIL](state) {
        return {
            ...state,
            requestingLogin: false,
            isAuthorized: false,
        };
    },
});
