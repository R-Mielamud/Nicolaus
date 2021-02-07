import createReducer from "../../../helpers/createReducer.helper";
import { CatalogState, initialState } from "./state";
import * as actionTypes from "./actionTypes";

export const catalogReducer = createReducer<CatalogState>(initialState, {
    [actionTypes.LOAD_BOOKS_SUCCESS](state, action: actionTypes.LoadBooksSuccess) {
        const newBooks = action.more ? [...(state.books ?? []), ...action.books] : action.books;

        return {
            ...state,
            hasMoreBooks: action.hasMore,
            books: newBooks,
        };
    },
    [actionTypes.SET_BOOKS_FILTER](state, action: actionTypes.SetBooksFilter) {
        return {
            ...state,
            booksFilter: {
                ...state.booksFilter,
                ...action.filter,
            },
        };
    },
});
