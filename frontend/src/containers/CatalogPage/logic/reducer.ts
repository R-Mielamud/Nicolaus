import createReducer from "../../../helpers/createReducer.helper";
import { CatalogState, initialState } from "./state";
import * as actionTypes from "./actionTypes";
import { getTime } from "../../../helpers/time.helper";

export const catalogReducer = createReducer<CatalogState>(initialState, {
    [actionTypes.LOAD_BOOKS](state) {
        return {
            ...state,
            loadingBooks: true,
        };
    },
    [actionTypes.LOAD_BOOKS_SUCCESS](state, action: actionTypes.LoadBooksSuccess) {
        const newBooks = action.more ? [...(state.books ?? []), ...action.books] : action.books;

        return {
            ...state,
            hasMoreBooks: action.hasMore,
            loadingBooks: false,
            books: newBooks,
        };
    },
    [actionTypes.LOAD_BOOKS_FAIL](state) {
        return {
            ...state,
            loadingBooks: false,
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
            authors: action.authors,
        };
    },
    [actionTypes.LOAD_STATUSES_SUCCESS](state, action: actionTypes.LoadStatusesSuccess) {
        return {
            ...state,
            statuses: action.statuses,
        };
    },
    [actionTypes.LOAD_RECOMMENDATIONS_SUCCESS](state, action: actionTypes.LoadRecommendationsSuccess) {
        return {
            ...state,
            recommendations: action.recommendations,
            lastRecommendationTime: getTime(),
        };
    },
    [actionTypes.SET_BOOKS_FILTER](state, action: actionTypes.SetBooksFilter) {
        if (action.rewrite) {
            return {
                ...state,
                booksFilter: {
                    from: state.booksFilter.from,
                    limit: state.booksFilter.limit,
                    tags: [],
                    publishings: [],
                    series: [],
                    authors: [],
                    statuses: [],
                    search: undefined,
                    ...action.filter,
                },
            };
        }

        if (action.clear) {
            return {
                ...state,
                booksFilter: {
                    ...state.booksFilter,
                    tags: [],
                    publishings: [],
                    series: [],
                    authors: [],
                    statuses: [],
                    search: undefined,
                },
            };
        }

        return {
            ...state,
            booksFilter: {
                ...state.booksFilter,
                ...action.filter,
            },
        };
    },
});
