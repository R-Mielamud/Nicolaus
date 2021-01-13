import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

export const loadMessengerUsers = createAction(actionTypes.LOAD_MESSENGER_USERS);
export const loadOperationSuccess = createAction<actionTypes.LoadOperationSuccess>(actionTypes.LOAD_OPERATION_SUCCESS);
