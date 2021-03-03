// Read

export const LOAD_ADMIN_BOOKS = "CATALOG:ADMIN:BOOKS:LOAD";
export const LOAD_ADMIN_BOOKS_SUCCESS = "CATALOG:ADMIN:BOOKS:LOAD:SUCCESS";
export const LOAD_ADMIN_TAGS = "CATALOG:ADMIN:TAGS:LOAD";
export const LOAD_ADMIN_TAGS_SUCCESS = "CATALOG:ADMIN:TAGS:LOAD:SUCCESS";
export const LOAD_ADMIN_TAG_GROUPS = "CATALOG:ADMIN:TAG:GROUPS:LOAD";
export const LOAD_ADMIN_TAG_GROUPS_SUCCESS = "CATALOG:ADMIN:TAG:GROUPS:LOAD:SUCCESS";
export const LOAD_ADMIN_AUTHORS = "CATALOG:ADMIN:AUTHORS:LOAD";
export const LOAD_ADMIN_AUTHORS_SUCCESS = "CATALOG:ADMIN:AUTHORS:LOAD:SUCCESS";
export const LOAD_ADMIN_SERIES = "CATALOG:ADMIN:PUBLISHINGS:SERIES:LOAD";
export const LOAD_ADMIN_SERIES_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:SERIES:LOAD:SUCCESS";
export const LOAD_ADMIN_PUBLISHINGS = "CATALOG:ADMIN:PUBLISHINGS:LOAD";
export const LOAD_ADMIN_PUBLISHINGS_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:LOAD:SUCCESS";
export const LOAD_ADMIN_STATUSES = "CATALOG:ADMIN:STATUSES:LOAD";
export const LOAD_ADMIN_STATUSES_SUCCESS = "CATALOG:ADMIN:STATUSES:LOAD:SUCCESS";

// Authors

export const CREATE_AUTHOR = "CATALOG:ADMIN:AUTHORS:CREATE";
export const CREATE_AUTHOR_SUCCESS = "CATALOG:ADMIN:AUTHORS:CREATE:SUCCESS";
export const UPDATE_AUTHOR = "CATALOG:ADMIN:AUTHORS:UPDATE";
export const UPDATE_AUTHOR_SUCCESS = "CATALOG:ADMIN:AUTHORS:UPDATE:SUCCESS";
export const DELETE_AUTHOR = "CATALOG:ADMIN:AUTHORS:DELETE";
export const DELETE_AUTHOR_SUCCESS = "CATALOG:ADMIN:AUTHORS:DELETE:SUCCESS";
export const BULK_AUTHORS = "CATALOG:ADMIN:AUTHORS:UPDATE:BULK";

// Tag groups

export const CREATE_TAG_GROUP = "CATALOG:ADMIN:TAG:GROUPS:CREATE";
export const CREATE_TAG_GROUP_SUCCESS = "CATALOG:ADMIN:TAG:GROUPS:CREATE:SUCCESS";
export const UPDATE_TAG_GROUP = "CATALOG:ADMIN:TAG:GROUPS:UPDATE";
export const UPDATE_TAG_GROUP_SUCCESS = "CATALOG:ADMIN:TAG:GROUPS:UPDATE:SUCCESS";
export const DELETE_TAG_GROUP = "CATALOG:ADMIN:TAG:GROUPS:DELETE";
export const DELETE_TAG_GROUP_SUCCESS = "CATALOG:ADMIN:TAG:GROUPS:DELETE:SUCCESS";
export const BULK_TAG_GROUPS = "CATALOG:ADMIN:TAG:GROUPS:UPDATE:BULK";

// Publishings

export const CREATE_PUBLISHING = "CATALOG:ADMIN:PUBLISHINGS:CREATE";
export const CREATE_PUBLISHING_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:CREATE:SUCCESS";
export const UPDATE_PUBLISHING = "CATALOG:ADMIN:PUBLISHINGS:UPDATE";
export const UPDATE_PUBLISHING_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:UPDATE:SUCCESS";
export const DELETE_PUBLISHING = "CATALOG:ADMIN:PUBLISHINGS:DELETE";
export const DELETE_PUBLISHING_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:DELETE:SUCCESS";
export const BULK_PUBLISHINGS = "CATALOG:ADMIN:PUBLISHINGS:UPDATE:BULK";

// Tags

export const CREATE_TAG = "CATALOG:ADMIN:TAGS:CREATE";
export const CREATE_TAG_SUCCESS = "CATALOG:ADMIN:TAGS:CREATE:SUCCESS";
export const UPDATE_TAG = "CATALOG:ADMIN:TAGS:UPDATE";
export const UPDATE_TAG_SUCCESS = "CATALOG:ADMIN:TAGS:UPDATE:SUCCESS";
export const DELETE_TAG = "CATALOG:ADMIN:TAGS:DELETE";
export const DELETE_TAG_SUCCESS = "CATALOG:ADMIN:TAGS:DELETE:SUCCESS";
export const BULK_TAGS = "CATALOG:ADMIN:TAGS:UPDATE:BULK";

// Series

export const CREATE_SERIES = "CATALOG:ADMIN:PUBLISHINGS:SERIES:CREATE";
export const CREATE_SERIES_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:SERIES:CREATE:SUCCESS";
export const UPDATE_SERIES = "CATALOG:ADMIN:PUBLISHINGS:SERIES:UPDATE";
export const UPDATE_SERIES_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:SERIES:UPDATE:SUCCESS";
export const DELETE_SERIES = "CATALOG:ADMIN:PUBLISHINGS:SERIES:DELETE";
export const DELETE_SERIES_SUCCESS = "CATALOG:ADMIN:PUBLISHINGS:SERIES:DELETE:SUCCESS";
export const BULK_SERIES = "CATALOG:ADMIN:PUBLISHINGS:SERIES:UPDATE:BULK";

// Statuses

export const CREATE_STATUS = "CATALOG:ADMIN:STATUSES:CREATE";
export const CREATE_STATUS_SUCCESS = "CATALOG:ADMIN:STATUSES:CREATE:SUCCESS";
export const UPDATE_STATUS = "CATALOG:ADMIN:STATUSES:UPDATE";
export const UPDATE_STATUS_SUCCESS = "CATALOG:ADMIN:STATUSES:UPDATE:SUCCESS";
export const DELETE_STATUS = "CATALOG:ADMIN:STATUSES:DELETE";
export const DELETE_STATUS_SUCCESS = "CATALOG:ADMIN:STATUSES:DELETE:SUCCESS";
export const BULK_STATUSES = "CATALOG:ADMIN:STATUSES:UPDATE:BULK";

// Read

export interface LoadBooks {
    more?: boolean;
}

export interface LoadBooksSuccess {
    more?: boolean;
    hasMore: boolean;
    books: WebApi.Entity.ChangeBook[];
}

export interface LoadTagsSuccess {
    tags: WebApi.Entity.ChangeTag[];
}

export interface LoadTagGroupsSuccess {
    tagGroups: WebApi.Entity.ChangeTagGroup[];
}

export interface LoadAuthorsSuccess {
    authors: WebApi.Entity.ChangeAuthor[];
}

export interface LoadSeriesSuccess {
    series: WebApi.Entity.ChangeSeries[];
}

export interface LoadPublishingsSuccess {
    publishings: WebApi.Entity.Publishing[];
}

export interface LoadStatusesSuccess {
    statuses: WebApi.Entity.Status[];
}

// Authors

export interface CreateAuthor {
    data: WebApi.Entity.ChangeAuthor;
}

export interface CreateAuthorSuccess {
    author: WebApi.Entity.ChangeAuthor;
}

export interface UpdateAuthor {
    id: number;
    data: Partial<WebApi.Entity.ChangeAuthor>;
}

export interface UpdateAuthorSuccess {
    id: number;
    author: WebApi.Entity.ChangeAuthor;
}

export interface DeleteAuthor {
    id: number;
}

export interface DeleteAuthorSuccess {
    id: number;
}

export interface BulkAuthors {
    authors: WebApi.Entity.CSVChangeAuthor[];
    index: number;
}

// Tag groups

export interface CreateTagGroup {
    data: WebApi.Entity.ChangeAuthor;
}

export interface CreateTagGroupSuccess {
    tagGroup: WebApi.Entity.ChangeTagGroup;
}

export interface UpdateTagGroup {
    id: number;
    data: Partial<WebApi.Entity.ChangeTagGroup>;
}

export interface UpdateTagGroupSuccess {
    id: number;
    tagGroup: WebApi.Entity.ChangeTagGroup;
}

export interface DeleteTagGroup {
    id: number;
}

export interface DeleteTagGroupSuccess {
    id: number;
}

export interface BulkTagGroups {
    tagGroups: WebApi.Entity.CSVChangeTagGroup[];
    index: number;
}

// Publishings

export interface CreatePublishing {
    data: WebApi.Entity.ChangePublishing;
}

export interface CreatePublishingSuccess {
    publishing: WebApi.Entity.ChangePublishing;
}

export interface UpdatePublishing {
    id: number;
    data: Partial<WebApi.Entity.ChangePublishing>;
}

export interface UpdatePublishingSuccess {
    id: number;
    publishing: WebApi.Entity.ChangePublishing;
}

export interface DeletePublishing {
    id: number;
}

export interface DeletePublishingSuccess {
    id: number;
}

export interface BulkPublishings {
    publishings: WebApi.Entity.CSVChangePublishing[];
    index: number;
}

// Tags

export interface CreateTag {
    data: WebApi.Entity.ChangeTag;
}

export interface CreateTagSuccess {
    tag: WebApi.Entity.ChangeTag;
}

export interface UpdateTag {
    id: number;
    data: Partial<WebApi.Entity.ChangeTag>;
}

export interface UpdateTagSuccess {
    id: number;
    tag: WebApi.Entity.ChangeTag;
}

export interface DeleteTag {
    id: number;
}

export interface DeleteTagSuccess {
    id: number;
}

export interface BulkTags {
    tags: WebApi.Entity.CSVChangeTag[];
    index: number;
}

// Series

export interface CreateSeries {
    data: WebApi.Entity.ChangeSeries;
}

export interface CreateSeriesSuccess {
    series: WebApi.Entity.ChangeSeries;
}

export interface UpdateSeries {
    id: number;
    data: Partial<WebApi.Entity.ChangeSeries>;
}

export interface UpdateSeriesSuccess {
    id: number;
    series: WebApi.Entity.ChangeSeries;
}

export interface DeleteSeries {
    id: number;
}

export interface DeleteSeriesSuccess {
    id: number;
}

export interface BulkSeries {
    series: WebApi.Entity.CSVChangeSeries[];
    index: number;
}

// Statuses

export interface CreateStatus {
    data: WebApi.Entity.ChangeStatus;
}

export interface CreateStatusSuccess {
    status: WebApi.Entity.ChangeStatus;
}

export interface UpdateStatus {
    id: number;
    data: Partial<WebApi.Entity.ChangeStatus>;
}

export interface UpdateStatusSuccess {
    id: number;
    status: WebApi.Entity.ChangeStatus;
}

export interface DeleteStatus {
    id: number;
}

export interface DeleteStatusSuccess {
    id: number;
}

export interface BulkStatuses {
    statuses: WebApi.Entity.CSVChangeStatus[];
    index: number;
}
