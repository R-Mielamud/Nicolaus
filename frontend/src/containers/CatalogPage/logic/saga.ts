import { all, put, call, select, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as booksService from "../../../services/books.service";
import * as tagsService from "../../../services/tags.service";
import * as publishingsService from "../../../services/publishings.service";
import * as authorsService from "../../../services/authors.service";
import * as statusesService from "../../../services/statuses.service";
import RootState from "../../../typings/rootState";
import { Books } from "../../../constants/Books";
import { error } from "../../../helpers/notifications.helper";

function* loadBooks({ more }: ReturnType<typeof actions.loadBooks>) {
    try {
        const {
            catalog: { booksFilter: filter },
        }: RootState = yield select();

        const increasedFrom = filter.from + Books.INFINITE_SCROLL_STEP;

        if (more) {
            filter.from = increasedFrom;
        }

        const { books, has_more }: WebApi.Specific.ListBooksResult = yield call(booksService.getBooks, filter);
        yield put(actions.loadBooksSuccess({ books, hasMore: has_more, more }));

        if (more) {
            yield put(
                actions.setBooksFilter({
                    filter: {
                        from: increasedFrom,
                    },
                }),
            );
        }
    } catch (err) {
        yield put(actions.loadBooksFail());
        error(err.text);
    }
}

function* watchLoadBooks() {
    yield takeEvery(actionTypes.LOAD_BOOKS, loadBooks);
}

function* loadTagGroups() {
    try {
        const tagGroups: WebApi.Entity.TagGroup[] = yield call(tagsService.getTagGroups);
        yield put(actions.loadTagGroupsSuccess({ tagGroups }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadTagGroups() {
    yield takeEvery(actionTypes.LOAD_TAG_GROUPS, loadTagGroups);
}

function* loadPublishings() {
    try {
        const publishings: WebApi.Entity.Publishing[] = yield call(publishingsService.getPublishings);
        yield put(actions.loadPublishingsSuccess({ publishings }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadPublishings() {
    yield takeEvery(actionTypes.LOAD_PUBLISHINGS, loadPublishings);
}

function* loadAuthors() {
    try {
        const authors: WebApi.Entity.Author[] = yield call(authorsService.getAuthors);
        yield put(actions.loadAuthorsSuccess({ authors }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadAuthors() {
    yield takeEvery(actionTypes.LOAD_AUTHORS, loadAuthors);
}

function* loadStatuses() {
    try {
        const statuses: WebApi.Entity.Status[] = yield call(statusesService.getStatuses);
        yield put(actions.loadStatusesSuccess({ statuses }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadStatuses() {
    yield takeEvery(actionTypes.LOAD_STATUSES, loadStatuses);
}

function* loadRecommendations(action: ReturnType<typeof actions.loadRecommendations>) {
    try {
        const recommendations: WebApi.Entity.MinimalBook[] = yield call(
            booksService.getRecommendedBooks,
            action.exclude,
        );

        yield put(actions.loadRecommendationsSuccess({ recommendations }));
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadRecommendations() {
    yield takeEvery(actionTypes.LOAD_RECOMMENDATIONS, loadRecommendations);
}

export default function* catalogSaga() {
    yield all([
        watchLoadBooks(),
        watchLoadTagGroups(),
        watchLoadPublishings(),
        watchLoadAuthors(),
        watchLoadStatuses(),
        watchLoadRecommendations(),
    ]);
}
