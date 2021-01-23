import { all } from "redux-saga/effects";
import chatbotAdminSaga from "../containers/ChatbotAdminPage/logic/saga";
import authSaga from "../containers/LoginPage/logic/saga";

export default function* rootSaga() {
    yield all([authSaga(), chatbotAdminSaga()]);
}
