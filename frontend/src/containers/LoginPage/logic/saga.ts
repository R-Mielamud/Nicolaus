import { all, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as service from "../../../services/auth.service";
import { getToken, setToken } from "../../../helpers/token.helper";

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
        yield put(actions.loadProfileSuccess({}));
    }
}

function* watchLoadProfile() {
    yield takeEvery(actionTypes.LOAD_PROFILE, loadProfile);
}

export default function* authSaga() {
    yield all([watchLogin(), watchLoadProfile()]);
}
