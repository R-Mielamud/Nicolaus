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
    [actionTypes.LOAD_ADMIN_STATUSES_SUCCESS](state, action: actionTypes.LoadStatusesSuccess) {
        return {
            ...state,
            statuses: action.statuses,
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

    // Publishings

    [actionTypes.CREATE_PUBLISHING_SUCCESS](state, action: actionTypes.CreatePublishingSuccess) {
        return {
            ...state,
            publishings: [...(state.publishings || []), action.publishing],
        };
    },
    [actionTypes.UPDATE_PUBLISHING_SUCCESS](state, action: actionTypes.UpdatePublishingSuccess) {
        if (!state.publishings) {
            return state;
        }

        const newPublishings = [...state.publishings];
        const index = newPublishings.findIndex((publishing) => publishing.id === action.id);

        if (index < 0) {
            return state;
        }

        const publishing = newPublishings[index];

        const newPublishing = {
            ...publishing,
            ...action.publishing,
        };

        newPublishings[index] = newPublishing;

        return {
            ...state,
            publishings: [...newPublishings],
        };
    },
    [actionTypes.DELETE_PUBLISHING_SUCCESS](state, action: actionTypes.DeletePublishingSuccess) {
        if (!state.publishings) {
            return state;
        }

        const newPublishings = [...state.publishings];
        const index = newPublishings.findIndex((publishing) => publishing.id === action.id);

        if (index < 0) {
            return state;
        }

        newPublishings.splice(index, 1);

        return {
            ...state,
            publishings: [...newPublishings],
        };
    },

    // Tags

    [actionTypes.CREATE_TAG_SUCCESS](state, action: actionTypes.CreateTagSuccess) {
        return {
            ...state,
            tags: [...(state.tags || []), action.tag],
        };
    },
    [actionTypes.UPDATE_TAG_SUCCESS](state, action: actionTypes.UpdateTagSuccess) {
        if (!state.tags) {
            return state;
        }

        const newTags = [...state.tags];
        const index = newTags.findIndex((tag) => tag.id === action.id);

        if (index < 0) {
            return state;
        }

        const tag = newTags[index];

        const newTag = {
            ...tag,
            ...action.tag,
        };

        newTags[index] = newTag;

        return {
            ...state,
            tags: [...newTags],
        };
    },
    [actionTypes.DELETE_TAG_SUCCESS](state, action: actionTypes.DeleteTagSuccess) {
        if (!state.tags) {
            return state;
        }

        const newTags = [...state.tags];
        const index = newTags.findIndex((tag) => tag.id === action.id);

        if (index < 0) {
            return state;
        }

        newTags.splice(index, 1);

        return {
            ...state,
            tags: [...newTags],
        };
    },

    // Series

    [actionTypes.CREATE_SERIES_SUCCESS](state, action: actionTypes.CreateSeriesSuccess) {
        return {
            ...state,
            series: [...(state.series || []), action.series],
        };
    },
    [actionTypes.UPDATE_SERIES_SUCCESS](state, action: actionTypes.UpdateSeriesSuccess) {
        if (!state.series) {
            return state;
        }

        const newSeriesArr = [...state.series];
        const index = newSeriesArr.findIndex((series) => series.id === action.id);

        if (index < 0) {
            return state;
        }

        const series = newSeriesArr[index];

        const newSeries = {
            ...series,
            ...action.series,
        };

        newSeries[index] = newSeries;

        return {
            ...state,
            series: [...newSeriesArr],
        };
    },
    [actionTypes.DELETE_SERIES_SUCCESS](state, action: actionTypes.DeleteSeriesSuccess) {
        if (!state.series) {
            return state;
        }

        const newSeries = [...state.series];
        const index = newSeries.findIndex((series) => series.id === action.id);

        if (index < 0) {
            return state;
        }

        newSeries.splice(index, 1);

        return {
            ...state,
            series: [...newSeries],
        };
    },

    // Statuses

    [actionTypes.CREATE_STATUS_SUCCESS](state, action: actionTypes.CreateStatusSuccess) {
        return {
            ...state,
            statuses: [...(state.statuses || []), action.status],
        };
    },
    [actionTypes.UPDATE_STATUS_SUCCESS](state, action: actionTypes.UpdateStatusSuccess) {
        if (!state.statuses) {
            return state;
        }

        const newStatuses = [...state.statuses];
        const index = newStatuses.findIndex((status) => status.id === action.id);

        if (index < 0) {
            return state;
        }

        const status = newStatuses[index];

        const newStatus = {
            ...status,
            ...action.status,
        };

        newStatuses[index] = newStatus;

        return {
            ...state,
            statuses: [...newStatuses],
        };
    },
    [actionTypes.DELETE_STATUS_SUCCESS](state, action: actionTypes.DeleteStatusSuccess) {
        if (!state.statuses) {
            return state;
        }

        const newStatuses = [...state.statuses];
        const index = newStatuses.findIndex((status) => status.id === action.id);

        if (index < 0) {
            return state;
        }

        newStatuses.splice(index, 1);

        return {
            ...state,
            statuses: [...newStatuses],
        };
    },
});
