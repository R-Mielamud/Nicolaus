import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

export const loadMessengerBills = createAction(actionTypes.LOAD_MESSENGER_BILLS);
export const loadMessengerUsers = createAction(actionTypes.LOAD_MESSENGER_USERS);
export const loadMessengerOrders = createAction(actionTypes.LOAD_MESSENGER_ORDERS);
export const loadOperationSuccess = createAction<actionTypes.LoadOperationSuccess>(actionTypes.LOAD_OPERATION_SUCCESS);
