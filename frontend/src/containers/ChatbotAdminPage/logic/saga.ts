import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as service from "../../../services/chatbot.service";
import { error } from "../../../helpers/notifications.helper";

function* loadMessengerUsers() {
    try {
        const messengerUsers: WebApi.BotEntity.User[] = yield call(service.getMessengerUsers);
        yield put(actions.loadOperationSuccess({ messengerUsers }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadMessengerUsers() {
    yield takeEvery(actionTypes.LOAD_MESSENGER_USERS, loadMessengerUsers);
}

function* loadMessengerBills() {
    try {
        const messengerBills: WebApi.BotEntity.Bill[] = yield call(service.getMessengerBills);
        yield put(actions.loadOperationSuccess({ messengerBills }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadMessengerBills() {
    yield takeEvery(actionTypes.LOAD_MESSENGER_BILLS, loadMessengerBills);
}

function* loadMessengerOrders() {
    try {
        const messengerOrders: WebApi.BotEntity.Order[] = yield call(service.getMessengerOrders);
        yield put(actions.loadOperationSuccess({ messengerOrders }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadMessengerOrders() {
    yield takeEvery(actionTypes.LOAD_MESSENGER_ORDERS, loadMessengerOrders);
}

export default function* chatbotAdminSaga() {
    yield all([watchLoadMessengerUsers(), watchLoadMessengerBills(), watchLoadMessengerOrders()]);
}
