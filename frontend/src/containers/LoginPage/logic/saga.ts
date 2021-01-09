import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as service from "../../../services/auth.service";
import { getToken, removeToken, setToken } from "../../../helpers/token.helper";
import history from "../../../helpers/history.helper";

function* login(action: ReturnType<typeof actions.login>) {
    try {
        const result: WebApi.Specific.AuthResult = yield call(service.login, action.email, action.password);
        setToken(result.jwt_token);

        yield put(
            actions.loadProfileSuccess({
                jwtToken: result.jwt_token,
                user: result.user,
            }),
        );
    } catch (err) {
        yield put(actions.loadProfileSuccess({}));
        alert(err.text); ///
    }
}

function* watchLogin() {
    yield takeEvery(actionTypes.LOGIN, login);
}

function* register(action: ReturnType<typeof actions.register>) {
    try {
        const { type, ...data } = action;
        const result: WebApi.Specific.AuthResult = yield call(service.register, data);
        setToken(result.jwt_token);

        yield put(
            actions.loadProfileSuccess({
                jwtToken: result.jwt_token,
                user: result.user,
            }),
        );
    } catch (err) {
        yield put(actions.loadProfileSuccess({}));
        alert(err.text); ///
    }
}

function* watchRegister() {
    yield takeEvery(actionTypes.REGISTER, register);
}

function* loadProfile() {
    try {
        const user: WebApi.Entity.User = yield call(service.getProfile);

        yield put(
            actions.loadProfileSuccess({
                jwtToken: getToken() as string,
                user,
            }),
        );
    } catch (err) {
        if (!/login|register|/.test(window.location.href)) {
            removeToken();
            history.push("/");
        }

        yield put(actions.loadProfileSuccess({}));
    }
}

function* watchLoadProfile() {
    yield takeEvery(actionTypes.LOAD_PROFILE, loadProfile);
}

export default function* authSaga() {
    yield all([watchLogin(), watchRegister(), watchLoadProfile()]);
}
