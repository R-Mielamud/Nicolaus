import createReducer from "../../../helpers/createReducer.helper";
import { initialState, SiteAdminState } from "./state";
import * as actionTypes from "./actionTypes";

export const siteAdminReducer = createReducer<SiteAdminState>(initialState, {
    // Read

    [actionTypes.LOAD_ADMIN_BOOKS_SUCCESS](state, action: actionTypes.LoadBooksSuccess) {
        const newBooks = action.more ? [...(state.books || []), ...action.books] : action.books;

        return {
            ...state,
            hasMoreBooks: action.hasMore,
            books: newBooks,
        };
    },
    [actionTypes.LOAD_ADMIN_AUTHORS_SUCCESS](state, action: actionTypes.LoadAuthorsSuccess) {
        return {
            ...state,
            authors: action.authors,
        };
    },
    [actionTypes.LOAD_ADMIN_SERIES_SUCCESS](state, action: actionTypes.LoadSeriesSuccess) {
        return {
            ...state,
            series: action.series,
        };
    },
    [actionTypes.LOAD_ADMIN_TAGS_SUCCESS](state, action: actionTypes.LoadTagsSuccess) {
        return {
            ...state,
            tags: action.tags,
        };
    },
    [actionTypes.LOAD_ADMIN_TAG_GROUPS_SUCCESS](state, action: actionTypes.LoadTagGroupsSuccess) {
        return {
            ...state,
            tagGroups: action.tagGroups,
        };
    },
    [actionTypes.LOAD_ADMIN_PUBLISHINGS_SUCCESS](state, action: actionTypes.LoadPublishingsSuccess) {
        return {
            ...state,
            publishings: action.publishings,
        };
    },

    // Authors

    [actionTypes.CREATE_AUTHOR_SUCCESS](state, action: actionTypes.CreateAuthorSuccess) {
        return {
            ...state,
            authors: [...(state.authors || []), action.author],
        };
    },
    [actionTypes.UPDATE_AUTHOR_SUCCESS](state, action: actionTypes.UpdateAuthorSuccess) {
        if (!state.authors) {
            return state;
        }

        const newAuthors = [...state.authors];
        const index = newAuthors.findIndex((author) => author.id === action.id);

        if (index < 0) {
            return state;
        }

        const author = newAuthors[index];

        const newAuthor = {
            ...author,
            ...action.author,
        };

        newAuthors[index] = newAuthor;

        return {
            ...state,
            authors: [...newAuthors],
        };
    },
    [actionTypes.DELETE_AUTHOR_SUCCESS](state, action: actionTypes.DeleteAuthorSuccess) {
        if (!state.authors) {
            return state;
        }

        const newAuthors = [...state.authors];
        const index = newAuthors.findIndex((author) => author.id === action.id);

        if (index < 0) {
            return state;
        }

        newAuthors.splice(index, 1);

        return {
            ...state,
            authors: [...newAuthors],
        };
    },

    // Tag groups

    [actionTypes.CREATE_TAG_GROUP_SUCCESS](state, action: actionTypes.CreateTagGroupSuccess) {
        return {
            ...state,
            tagGroups: [...(state.tagGroups || []), action.tagGroup],
        };
    },
    [actionTypes.UPDATE_TAG_GROUP_SUCCESS](state, action: actionTypes.UpdateTagGroupSuccess) {
        if (!state.tagGroups) {
            return state;
        }

        const newGroups = [...state.tagGroups];
        const index = newGroups.findIndex((group) => group.id === action.id);

        if (index < 0) {
            return state;
        }

        const group = newGroups[index];

        const newGroup = {
            ...group,
            ...action.tagGroup,
        };

        newGroups[index] = newGroup;

        return {
            ...state,
            tagGroups: [...newGroups],
        };
    },
    [actionTypes.DELETE_TAG_GROUP_SUCCESS](state, action: actionTypes.DeleteTagGroupSuccess) {
        if (!state.tagGroups) {
            return state;
        }

        const newGroups = [...state.tagGroups];
        const index = newGroups.findIndex((group) => group.id === action.id);

        if (index < 0) {
            return state;
        }

        newGroups.splice(index, 1);

        return {
            ...state,
            tagGroups: [...newGroups],
        };
    },
});
