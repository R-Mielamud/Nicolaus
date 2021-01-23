import createReducer from "../../../helpers/createReducer.helper";
import { AuthState, initialState } from "./state";
import * as actionTypes from "./actionTypes";

export const authReducer = createReducer<AuthState>(initialState, {
    [actionTypes.LOGIN](state) {
        return {
            ...state,
            requestingLogin: true,
        };
    },
    [actionTypes.REGISTER](state) {
        return {
            ...state,
            requestingRegister: true,
        };
    },
    [actionTypes.LOAD_PROFILE_SUCCESS](state, action: actionTypes.LoadProfileSuccess) {
        const userData = action.user
            ? {
                  user: action.user,
                  isAuthorized: Boolean(action.user),
              }
            : {};

        const jwtData = action.jwtToken
            ? {
                  jwtToken: action.jwtToken,
              }
            : {};

        return {
            ...state,
            ...userData,
            ...jwtData,
            profileLoaded: true,
            requestingLogin: false,
            requestingRegister: false,
        };
    },
});
