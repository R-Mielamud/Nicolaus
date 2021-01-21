import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as service from "../../../services/chatbot.service";
import { error } from "../../../helpers/notifications.helper";

function* getMessengerUsers() {
    try {
        const messengerUsers: WebApi.BotEntity.User[] = yield call(service.getMessengerUsers);
        yield put(actions.loadOperationSuccess({ messengerUsers }));
    } catch (err) {
        error(err.text);
    }
}

function* watchGetMessengerUsers() {
    yield takeEvery(actionTypes.LOAD_MESSENGER_USERS, getMessengerUsers);
}

function* getMessengerBills() {
    try {
        const messengerBills: WebApi.BotEntity.Bill[] = yield call(service.getMessengerBills);
        yield put(actions.loadOperationSuccess({ messengerBills }));
    } catch (err) {
        error(err.text);
    }
}

function* watchGetMessengerBills() {
    yield takeEvery(actionTypes.LOAD_MESSENGER_BILLS, getMessengerBills);
}

export default function* chatbotAdminSaga() {
    yield all([watchGetMessengerUsers(), watchGetMessengerBills()]);
}
