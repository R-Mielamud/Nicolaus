import { all, put, call, select, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as service from "../../../services/books.service";
import RootState from "../../../typings/rootState";
import { Books } from "../../../constants/Books";
import { error } from "../../../helpers/notifications.helper";

function* loadBooks({ more }: ReturnType<typeof actions.loadBooks>) {
    try {
        const {
            catalog: { booksFilter: filter },
        }: RootState = yield select();

        const increasedFrom = filter.from + Books.INFINITE_SCROLL_STEP;
        const increasedLimit = filter.limit + Books.INFINITE_SCROLL_STEP;

        if (more) {
            filter.from = increasedFrom;
            filter.limit = increasedLimit;
        }

        const { books, has_more }: WebApi.Specific.ListBooksResult = yield call(service.getBooks, filter);
        yield put(actions.loadBooksSuccess({ books, hasMore: has_more, more }));

        if (more) {
            yield put(
                actions.setBooksFilter({
                    filter: {
                        from: increasedFrom,
                        limit: increasedLimit,
                    },
                }),
            );
        }
    } catch (err) {
        error(err.text);
    }
}

function* watchLoadBooks() {
    yield takeEvery(actionTypes.LOAD_BOOKS, loadBooks);
}

export default function* catalogSaga() {
    yield all([watchLoadBooks()]);
}
