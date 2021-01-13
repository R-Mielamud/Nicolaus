import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as service from "../../../services/chatbot.service";
import { error } from "../../../helpers/notifications.helper";

function* getMessengerUsers() {
    try {
        const res = yield call(service.getMessengerUsers);

        yield put(
            actions.loadOperationSuccess({
                messengerUsers: res
            })
        );
    } catch (err) {
        error(err.text);
    }
}

function* watchGetMessengerUsers() {
    yield takeEvery(actionTypes.LOAD_MESSENGER_USERS, getMessengerUsers);
}

export default function* chatbotAdminSaga() {
    yield all([watchGetMessengerUsers()]);
}
