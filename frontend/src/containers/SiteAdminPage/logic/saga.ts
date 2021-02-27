import { all, put, takeEvery, call } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as authorsService from "../../../services/authors.service";
import { error } from "../../../helpers/notifications.helper";

function* loadAdminAuthors() {
    try {
        const authors: WebApi.Entity.ChangeAuthor[] = yield call(authorsService.getAdminAuthors);
        yield put(actions.loadAdminAuthorsSuccess({ authors }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadAdminAuthors() {
    yield takeEvery(actionTypes.LOAD_ADMIN_AUTHORS, loadAdminAuthors);
}

function* createAuthor(action: ReturnType<typeof actions.createAuthor>) {
    try {
        const author: WebApi.Entity.ChangeAuthor = yield call(authorsService.createAuthor, action.data);
        yield put(actions.createAuthorSuccess({ author }));
    } catch (err) {
        error(err.text);
    }
}

function* watchCreateAuthor() {
    yield takeEvery(actionTypes.CREATE_AUTHOR, createAuthor);
}

function* updateAuthor(action: ReturnType<typeof actions.updateAuthor>) {
    try {
        const author: WebApi.Entity.ChangeAuthor = yield call(authorsService.updateAuthor, action.id, action.data);
        yield put(actions.updateAuthorSuccess({ id: action.id, author }));
    } catch (err) {
        error(err.text);
    }
}

function* watchUpdateAuthor() {
    yield takeEvery(actionTypes.UPDATE_AUTHOR, updateAuthor);
}

function* deleteAuthor(action: ReturnType<typeof actions.deleteAuthor>) {
    try {
        yield call(authorsService.deleteAuthor, action.id);
        yield put(actions.deleteAuthorSuccess({ id: action.id }));
    } catch (err) {
        error(err.text);
    }
}

function* watchDeleteAuthor() {
    yield takeEvery(actionTypes.DELETE_AUTHOR, deleteAuthor);
}

function* bulkAuthors(action: ReturnType<typeof actions.bulkAuthors>) {
    try {
        yield call(authorsService.bulkAuthors, action.authors);
        window.location.reload();
    } catch (err) {
        error(err.text);
    }
}

function* watchBulkAuthors() {
    yield takeEvery(actionTypes.BULK_AUTHORS, bulkAuthors);
}

export default function* siteAdminSaga() {
    yield all([
        watchLoadAdminAuthors(),
        watchCreateAuthor(),
        watchUpdateAuthor(),
        watchDeleteAuthor(),
        watchBulkAuthors(),
    ]);
}
