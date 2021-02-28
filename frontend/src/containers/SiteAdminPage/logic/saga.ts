import { all, put, takeEvery, call } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as authorsService from "../../../services/authors.service";
import * as tagsService from "../../../services/tags.service";
import { error } from "../../../helpers/notifications.helper";

// Authors

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

        if (!window.location.href.includes("?")) {
            window.location.replace(window.location.href + "?activeIndex=" + action.index);
        }
    } catch (err) {
        error(err.text);
    }
}

function* watchBulkAuthors() {
    yield takeEvery(actionTypes.BULK_AUTHORS, bulkAuthors);
}

// Tag groups

function* loadAdminTagGroups() {
    try {
        const tagGroups: WebApi.Entity.ChangeTagGroup[] = yield call(tagsService.getAdminTagGroups);
        yield put(actions.loadAdminTagGroupsSuccess({ tagGroups }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadAdminTagGroups() {
    yield takeEvery(actionTypes.LOAD_ADMIN_TAG_GROUPS, loadAdminTagGroups);
}

function* createTagGroup(action: ReturnType<typeof actions.createAuthor>) {
    try {
        const tagGroup: WebApi.Entity.ChangeTagGroup = yield call(tagsService.createTagGroup, action.data);
        yield put(actions.createTagGroupSuccess({ tagGroup }));
    } catch (err) {
        error(err.text);
    }
}

function* watchCreateTagGroup() {
    yield takeEvery(actionTypes.CREATE_TAG_GROUP, createTagGroup);
}

function* updateTagGroup(action: ReturnType<typeof actions.updateTagGroup>) {
    try {
        const tagGroup: WebApi.Entity.ChangeTagGroup = yield call(tagsService.updateTagGroup, action.id, action.data);
        yield put(actions.updateTagGroupSuccess({ id: action.id, tagGroup }));
    } catch (err) {
        error(err.text);
    }
}

function* watchUpdateTagGroup() {
    yield takeEvery(actionTypes.UPDATE_TAG_GROUP, updateTagGroup);
}

function* deleteTagGroup(action: ReturnType<typeof actions.deleteTagGroup>) {
    try {
        yield call(tagsService.deleteTagGroup, action.id);
        yield put(actions.deleteTagGroupSuccess({ id: action.id }));
    } catch (err) {
        error(err.text);
    }
}

function* watchDeleteTagGroup() {
    yield takeEvery(actionTypes.DELETE_TAG_GROUP, deleteTagGroup);
}

function* bulkTagGroups(action: ReturnType<typeof actions.bulkTagGroups>) {
    try {
        yield call(tagsService.bulkTagGroups, action.tagGroups);

        if (!window.location.href.includes("?")) {
            window.location.replace(window.location.href + "?activeIndex=" + action.index);
        }
    } catch (err) {
        error(err.text);
    }
}

function* watchBulkTagGroups() {
    yield takeEvery(actionTypes.BULK_TAG_GROUPS, bulkTagGroups);
}

function* authorSaga() {
    yield all([
        watchLoadAdminAuthors(),
        watchCreateAuthor(),
        watchUpdateAuthor(),
        watchDeleteAuthor(),
        watchBulkAuthors(),
    ]);
}

function* tagGroupSaga() {
    yield all([
        watchLoadAdminTagGroups(),
        watchCreateTagGroup(),
        watchUpdateTagGroup(),
        watchDeleteTagGroup(),
        watchBulkTagGroups(),
    ]);
}

export default function* siteAdminSaga() {
    yield all([authorSaga(), tagGroupSaga()]);
}
