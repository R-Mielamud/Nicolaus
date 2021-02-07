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
    [actionTypes.LOAD_TAG_GROUPS_SUCCESS](state, action: actionTypes.LoadTagGroupsSuccess) {
        return {
            ...state,
            tagGroups: action.tagGroups,
        };
    },
    [actionTypes.LOAD_PUBLISHINGS_SUCCESS](state, action: actionTypes.LoadPublishingsSuccess) {
        return {
            ...state,
            publishings: action.publishings,
        };
    },
    [actionTypes.LOAD_AUTHORS_SUCCESS](state, action: actionTypes.LoadAuthorsSuccess) {
        return {
            ...state,
            auhtors: action.authors,
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
