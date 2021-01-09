import { all } from "redux-saga/effects";
import authSaga from "../containers/LoginPage/logic/saga";

export default function* rootSaga() {
    yield all([authSaga()]);
}
