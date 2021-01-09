import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

export const login = createAction<actionTypes.Login>(actionTypes.LOGIN);
export const register = createAction<actionTypes.Register>(actionTypes.REGISTER);
export const loadProfile = createAction(actionTypes.LOAD_PROFILE);
export const loadProfileSuccess = createAction<actionTypes.LoadProfileSuccess>(actionTypes.LOAD_PROFILE_SUCCESS);
