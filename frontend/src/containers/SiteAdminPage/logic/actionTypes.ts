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
export const CREATE_AUTHOR_SUCCESS = "CATALOG:AUTHORS:CREATE:SUCCESS";
export const UPDATE_AUTHOR = "CATALOG:ADMIN:AUTHORS:UPDATE";
export const UPDATE_AUTHOR_SUCCESS = "CATALOG:AUTHORS:UPDATE:SUCCESS";
export const DELETE_AUTHOR = "CATALOG:ADMIN:AUTHORS:DELETE";
export const DELETE_AUTHOR_SUCCESS = "CATALOG:AUTHORS:DELETE:SUCCESS";
export const BULK_AUTHORS = "CATALOG:AUTHORS:UPDATE:BULK";

// Tag groups

export const CREATE_TAG_GROUP = "CATALOG:ADMIN:TAG:GROUPS:CREATE";
export const CREATE_TAG_GROUP_SUCCESS = "CATALOG:TAG:GROUPS:CREATE:SUCCESS";
export const UPDATE_TAG_GROUP = "CATALOG:ADMIN:TAG:GROUPS:UPDATE";
export const UPDATE_TAG_GROUP_SUCCESS = "CATALOG:TAG:GROUPS:UPDATE:SUCCESS";
export const DELETE_TAG_GROUP = "CATALOG:ADMIN:TAG:GROUPS:DELETE";
export const DELETE_TAG_GROUP_SUCCESS = "CATALOG:TAG:GROUPS:DELETE:SUCCESS";
export const BULK_TAG_GROUPS = "CATALOG:TAG:GROUPS:UPDATE:BULK";

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
