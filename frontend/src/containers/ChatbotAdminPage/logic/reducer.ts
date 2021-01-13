import createReducer from "../../../helpers/createReducer.helper";
import { initialState } from "./state";
import * as actionTypes from "./actionTypes";

export const chatbotAdminReducer = createReducer(initialState, {
    [actionTypes.LOAD_OPERATION_SUCCESS](state, action: actionTypes.LoadOperationSuccess) {
        return {
            ...state,
            ...action,
        };
    }
});
