import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

// Create, Update, Delete

export const createAuthor = createAction<actionTypes.CreateAuthor>(actionTypes.CREATE_AUTHOR);
export const createAuthorSuccess = createAction<actionTypes.CreateAuthorSuccess>(actionTypes.CREATE_AUTHOR_SUCCESS);
export const updateAuthor = createAction<actionTypes.UpdateAuthor>(actionTypes.UPDATE_AUTHOR);
export const updateAuthorSuccess = createAction<actionTypes.UpdateAuthorSuccess>(actionTypes.UPDATE_AUTHOR_SUCCESS);
export const deleteAuthor = createAction<actionTypes.DeleteAuthor>(actionTypes.DELETE_AUTHOR);
export const deleteAuthorSuccess = createAction<actionTypes.DeleteAuthorSuccess>(actionTypes.DELETE_AUTHOR_SUCCESS);
export const bulkAuthors = createAction<actionTypes.BulkAuthors>(actionTypes.BULK_AUTHORS);

// Read

export const loadAdminBooks = createAction<actionTypes.LoadBooks>(actionTypes.LOAD_ADMIN_BOOKS);
export const loadAdminBooksSuccess = createAction<actionTypes.LoadBooksSuccess>(actionTypes.LOAD_ADMIN_BOOKS_SUCCESS);
export const loadAdminTags = createAction(actionTypes.LOAD_ADMIN_TAGS);
export const loadAdminTagsSuccess = createAction<actionTypes.LoadTagsSuccess>(actionTypes.LOAD_ADMIN_TAGS_SUCCESS);
export const loadAdminSeries = createAction(actionTypes.LOAD_ADMIN_SERIES);
export const loadAdminTagGroups = createAction(actionTypes.LOAD_ADMIN_TAG_GROUPS);
export const loadAdminAuthors = createAction(actionTypes.LOAD_ADMIN_AUTHORS);
export const loadAdminPublishings = createAction(actionTypes.LOAD_ADMIN_PUBLISHINGS);
export const loadAdminStatuses = createAction(actionTypes.LOAD_ADMIN_STATUSES);

export const loadAdminStatusesSuccess = createAction<actionTypes.LoadStatusesSuccess>(
    actionTypes.LOAD_ADMIN_STATUSES_SUCCESS,
);

export const loadAdminPublishingsSuccess = createAction<actionTypes.LoadPublishingsSuccess>(
    actionTypes.LOAD_ADMIN_PUBLISHINGS_SUCCESS,
);

export const loadAdminAuthorsSuccess = createAction<actionTypes.LoadAuthorsSuccess>(
    actionTypes.LOAD_ADMIN_AUTHORS_SUCCESS,
);

export const loadAdminSeriesSuccess = createAction<actionTypes.LoadSeriesSuccess>(
    actionTypes.LOAD_ADMIN_SERIES_SUCCESS,
);

export const loadAdminTagGroupsSuccess = createAction<actionTypes.LoadTagGroupsSuccess>(
    actionTypes.LOAD_ADMIN_TAG_GROUPS_SUCCESS,
);
