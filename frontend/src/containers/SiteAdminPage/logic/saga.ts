import { all, put, takeEvery, call } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as authorsService from "../../../services/authors.service";
import * as tagsService from "../../../services/tags.service";
import * as publishingsService from "../../../services/publishings.service";
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

// Publishings

function* loadAdminPublishings() {
    try {
        const publishings: WebApi.Entity.ChangePublishing[] = yield call(publishingsService.getAdminPublishings);
        yield put(actions.loadAdminPublishingsSuccess({ publishings }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadAdminPublishings() {
    yield takeEvery(actionTypes.LOAD_ADMIN_PUBLISHINGS, loadAdminPublishings);
}

function* createPublishing(action: ReturnType<typeof actions.createPublishing>) {
    try {
        const publishing: WebApi.Entity.ChangePublishing = yield call(publishingsService.createPublishing, action.data);
        yield put(actions.createPublishingSuccess({ publishing }));
    } catch (err) {
        error(err.text);
    }
}

function* watchCreatePublishing() {
    yield takeEvery(actionTypes.CREATE_PUBLISHING, createPublishing);
}

function* updatePublishing(action: ReturnType<typeof actions.updatePublishing>) {
    try {
        const publishing: WebApi.Entity.ChangePublishing = yield call(
            publishingsService.updatePublishing,
            action.id,
            action.data,
        );
        yield put(actions.updatePublishingSuccess({ id: action.id, publishing }));
    } catch (err) {
        error(err.text);
    }
}

function* watchUpdatePublishing() {
    yield takeEvery(actionTypes.UPDATE_PUBLISHING, updatePublishing);
}

function* deletePublishing(action: ReturnType<typeof actions.deletePublishing>) {
    try {
        yield call(publishingsService.deletePublishing, action.id);
        yield put(actions.deletePublishingSuccess({ id: action.id }));
    } catch (err) {
        error(err.text);
    }
}

function* watchDeletePublishing() {
    yield takeEvery(actionTypes.DELETE_PUBLISHING, deletePublishing);
}

function* bulkPublishings(action: ReturnType<typeof actions.bulkPublishings>) {
    try {
        yield call(publishingsService.bulkPublishings, action.publishings);

        const parts = window.location.href.split("?");
        const url = parts[0];
        window.location.replace(url + "?activeIndex=" + action.index);
    } catch (err) {
        error(err.text);
    }
}

function* watchBulkPublishings() {
    yield takeEvery(actionTypes.BULK_PUBLISHINGS, bulkPublishings);
}

// Tags

function* loadAdminTags() {
    try {
        const tags: WebApi.Entity.ChangeTag[] = yield call(tagsService.getAdminTags);
        yield put(actions.loadAdminTagsSuccess({ tags }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadAdminTags() {
    yield takeEvery(actionTypes.LOAD_ADMIN_TAGS, loadAdminTags);
}

function* createTag(action: ReturnType<typeof actions.createTag>) {
    try {
        const tag: WebApi.Entity.ChangeTag = yield call(tagsService.createTag, action.data);
        yield put(actions.createTagSuccess({ tag }));
    } catch (err) {
        error(err.text);
    }
}

function* watchCreateTag() {
    yield takeEvery(actionTypes.CREATE_TAG, createTag);
}

function* updateTag(action: ReturnType<typeof actions.updateTag>) {
    try {
        const tag: WebApi.Entity.ChangeTag = yield call(tagsService.updateTag, action.id, action.data);
        yield put(actions.updateTagSuccess({ id: action.id, tag }));
    } catch (err) {
        error(err.text);
    }
}

function* watchUpdateTag() {
    yield takeEvery(actionTypes.UPDATE_TAG, updateTag);
}

function* deleteTag(action: ReturnType<typeof actions.deleteTag>) {
    try {
        yield call(tagsService.deleteTag, action.id);
        yield put(actions.deleteTagSuccess({ id: action.id }));
    } catch (err) {
        error(err.text);
    }
}

function* watchDeleteTag() {
    yield takeEvery(actionTypes.DELETE_TAG, deleteTag);
}

function* bulkTags(action: ReturnType<typeof actions.bulkTags>) {
    try {
        yield call(tagsService.bulkTags, action.tags);

        const parts = window.location.href.split("?");
        const url = parts[0];
        window.location.replace(url + "?activeIndex=" + action.index);
    } catch (err) {
        error(err.text);
    }
}

function* watchBulkTags() {
    yield takeEvery(actionTypes.BULK_TAGS, bulkTags);
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

function* publishingSaga() {
    yield all([
        watchLoadAdminPublishings(),
        watchCreatePublishing(),
        watchUpdatePublishing(),
        watchDeletePublishing(),
        watchBulkPublishings(),
    ]);
}

function* tagSaga() {
    yield all([watchLoadAdminTags(), watchCreateTag(), watchUpdateTag(), watchDeleteTag(), watchBulkTags()]);
}

export default function* siteAdminSaga() {
    yield all([publishingSaga(), authorSaga(), tagGroupSaga(), tagSaga()]);
}
