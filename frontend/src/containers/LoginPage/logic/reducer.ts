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
    [actionTypes.LOAD_PROFILE_SUCCESS](state, action: actionTypes.LoadProfileSuccess) {
        return {
            ...state,
            user: action.user,
            profileLoaded: true,
            requestingLogin: false,
            jwtToken: action.jwtToken,
            isAuthorized: Boolean(action.user),
        };
    },
});
