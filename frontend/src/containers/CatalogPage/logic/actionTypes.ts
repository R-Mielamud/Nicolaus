export const LOAD_BOOKS = "CATALOG:BOOKS:LOAD";
export const LOAD_BOOKS_SUCCESS = "CATALOG:BOOKS:LOAD:SUCCESS";
export const LOAD_TAG_GROUPS = "CATALOG:BOOKS:FILTERS:TAGS:GROUPS:LOAD";
export const LOAD_TAG_GROUPS_SUCCESS = "CATALOG:BOOKS:FILTERS:TAGS:GROUPS:LOAD:SUCCESS";
export const LOAD_PUBLISHINGS = "CATALOG:BOOKS:FILTERS:PUBLISHINGS:LOAD";
export const LOAD_PUBLISHINGS_SUCCESS = "CATALOG:BOOKS:FILTERS:PUBLISHINGS:LOAD:SUCCESS";
export const LOAD_AUTHORS = "CATALOG:BOOKS:FILTERS:AUTHORS:LOAD";
export const LOAD_AUTHORS_SUCCESS = "CATALOG:BOOKS:FILTERS:AUTHORS:LOAD:SUCCESS";
export const LOAD_STATUSES = "CATALOG:BOOKS:FILTERS:STATUSES:LOAD";
export const LOAD_STATUSES_SUCCESS = "CATALOG:BOOKS:FILTERS:STATUSES:LOAD:SUCCESS";
export const SET_BOOKS_FILTER = "CATALOG:BOOKS:FILTER:SET";

export interface LoadBooks {
    more?: boolean;
}

export interface LoadBooksSuccess {
    books: WebApi.Entity.MinimalBook[];
    hasMore: boolean;
    more?: boolean;
}

export interface LoadTagGroupsSuccess {
    tagGroups: WebApi.Entity.TagGroup[];
}

export interface LoadPublishingsSuccess {
    publishings: WebApi.Entity.Publishing[];
}

export interface LoadAuthorsSuccess {
    authors: WebApi.Entity.Author[];
}

export interface LoadStatusesSuccess {
    statuses: WebApi.Entity.Status[];
}

export interface SetBooksFilter {
    clear?: boolean;
    filter: Partial<WebApi.Specific.BooksFilter>;
}
