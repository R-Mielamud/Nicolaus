import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as service from "../../../services/auth.service";

function* login(action: ReturnType<typeof actions.login>) {
    try {
        const result: WebApi.Specific.AuthResult = yield call(service.login, action.email, action.password);

        yield put(
            actions.loginSuccess({
                jwtToken: result.jwt_token,
                user: result.user,
            }),
        );
    } catch (err) {
        yield put(actions.loginFail());
        alert(err.text); ///
    }
}

function* watchLogin() {
    yield takeEvery(actionTypes.LOGIN, login);
}

export default function* authSaga() {
    yield all([watchLogin()]);
}
