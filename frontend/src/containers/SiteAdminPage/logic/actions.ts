import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

// Authors

export const createAuthor = createAction<actionTypes.CreateAuthor>(actionTypes.CREATE_AUTHOR);
export const createAuthorSuccess = createAction<actionTypes.CreateAuthorSuccess>(actionTypes.CREATE_AUTHOR_SUCCESS);
export const updateAuthor = createAction<actionTypes.UpdateAuthor>(actionTypes.UPDATE_AUTHOR);
export const updateAuthorSuccess = createAction<actionTypes.UpdateAuthorSuccess>(actionTypes.UPDATE_AUTHOR_SUCCESS);
export const deleteAuthor = createAction<actionTypes.DeleteAuthor>(actionTypes.DELETE_AUTHOR);
export const deleteAuthorSuccess = createAction<actionTypes.DeleteAuthorSuccess>(actionTypes.DELETE_AUTHOR_SUCCESS);
export const bulkAuthors = createAction<actionTypes.BulkAuthors>(actionTypes.BULK_AUTHORS);

// Tag groups

export const createTagGroup = createAction<actionTypes.CreateTagGroup>(actionTypes.CREATE_TAG_GROUP);
export const updateTagGroup = createAction<actionTypes.UpdateTagGroup>(actionTypes.UPDATE_TAG_GROUP);
export const deleteTagGroup = createAction<actionTypes.DeleteTagGroup>(actionTypes.DELETE_TAG_GROUP);
export const bulkTagGroups = createAction<actionTypes.BulkTagGroups>(actionTypes.BULK_TAG_GROUPS);

export const createTagGroupSuccess = createAction<actionTypes.CreateTagGroupSuccess>(
    actionTypes.CREATE_TAG_GROUP_SUCCESS,
);

export const updateTagGroupSuccess = createAction<actionTypes.UpdateTagGroupSuccess>(
    actionTypes.UPDATE_TAG_GROUP_SUCCESS,
);

export const deleteTagGroupSuccess = createAction<actionTypes.DeleteTagGroupSuccess>(
    actionTypes.DELETE_TAG_GROUP_SUCCESS,
);

// Publishings

export const createPublishing = createAction<actionTypes.CreatePublishing>(actionTypes.CREATE_PUBLISHING);
export const updatePublishing = createAction<actionTypes.UpdatePublishing>(actionTypes.UPDATE_PUBLISHING);
export const deletePublishing = createAction<actionTypes.DeletePublishing>(actionTypes.DELETE_PUBLISHING);
export const bulkPublishings = createAction<actionTypes.BulkPublishings>(actionTypes.BULK_PUBLISHINGS);

export const createPublishingSuccess = createAction<actionTypes.CreatePublishingSuccess>(
    actionTypes.CREATE_PUBLISHING_SUCCESS,
);

export const updatePublishingSuccess = createAction<actionTypes.UpdatePublishingSuccess>(
    actionTypes.UPDATE_PUBLISHING_SUCCESS,
);

export const deletePublishingSuccess = createAction<actionTypes.DeletePublishingSuccess>(
    actionTypes.DELETE_PUBLISHING_SUCCESS,
);

// Tags

export const createTag = createAction<actionTypes.CreateTag>(actionTypes.CREATE_TAG);
export const createTagSuccess = createAction<actionTypes.CreateTagSuccess>(actionTypes.CREATE_TAG_SUCCESS);
export const updateTag = createAction<actionTypes.UpdateTag>(actionTypes.UPDATE_TAG);
export const updateTagSuccess = createAction<actionTypes.UpdateTagSuccess>(actionTypes.UPDATE_TAG_SUCCESS);
export const deleteTag = createAction<actionTypes.DeleteTag>(actionTypes.DELETE_TAG);
export const deleteTagSuccess = createAction<actionTypes.DeleteTagSuccess>(actionTypes.DELETE_TAG_SUCCESS);
export const bulkTags = createAction<actionTypes.BulkTags>(actionTypes.BULK_TAGS);

// Series

export const createSeries = createAction<actionTypes.CreateSeries>(actionTypes.CREATE_SERIES);
export const createSeriesSuccess = createAction<actionTypes.CreateSeriesSuccess>(actionTypes.CREATE_SERIES_SUCCESS);
export const updateSeries = createAction<actionTypes.UpdateSeries>(actionTypes.UPDATE_SERIES);
export const updateSeriesSuccess = createAction<actionTypes.UpdateSeriesSuccess>(actionTypes.UPDATE_SERIES_SUCCESS);
export const deleteSeries = createAction<actionTypes.DeleteSeries>(actionTypes.DELETE_SERIES);
export const deleteSeriesSuccess = createAction<actionTypes.DeleteSeriesSuccess>(actionTypes.DELETE_SERIES_SUCCESS);
export const bulkSeries = createAction<actionTypes.BulkSeries>(actionTypes.BULK_SERIES);

// Statuses

export const createStatus = createAction<actionTypes.CreateStatus>(actionTypes.CREATE_STATUS);
export const updateStatus = createAction<actionTypes.UpdateStatus>(actionTypes.UPDATE_STATUS);
export const deleteStatus = createAction<actionTypes.DeleteStatus>(actionTypes.DELETE_STATUS);
export const bulkStatuses = createAction<actionTypes.BulkStatuses>(actionTypes.BULK_STATUSES);
export const createStatusSuccess = createAction<actionTypes.CreateStatusSuccess>(actionTypes.CREATE_STATUS_SUCCESS);
export const updateStatusSuccess = createAction<actionTypes.UpdateStatusSuccess>(actionTypes.UPDATE_STATUS_SUCCESS);
export const deleteStatusSuccess = createAction<actionTypes.DeleteStatusSuccess>(actionTypes.DELETE_STATUS_SUCCESS);

// Books

export const createBook = createAction<actionTypes.CreateBook>(actionTypes.CREATE_BOOK);
export const createBookSuccess = createAction<actionTypes.CreateBookSuccess>(actionTypes.CREATE_BOOK_SUCCESS);
export const updateBook = createAction<actionTypes.UpdateBook>(actionTypes.UPDATE_BOOK);
export const updateBookSuccess = createAction<actionTypes.UpdateBookSuccess>(actionTypes.UPDATE_BOOK_SUCCESS);
export const deleteBook = createAction<actionTypes.DeleteBook>(actionTypes.DELETE_BOOK);
export const deleteBookSuccess = createAction<actionTypes.DeleteBookSuccess>(actionTypes.DELETE_BOOK_SUCCESS);
export const bulkBooks = createAction<actionTypes.BulkBooks>(actionTypes.BULK_BOOKS);

// Read

export const setBooksFilter = createAction<actionTypes.SetBooksFilter>(actionTypes.SET_BOOKS_FILTER);
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
