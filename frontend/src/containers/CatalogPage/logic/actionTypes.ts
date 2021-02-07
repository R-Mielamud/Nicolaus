export const LOAD_BOOKS = "CATALOG:BOOKS:LOAD";
export const LOAD_BOOKS_SUCCESS = "CATALOG:BOOKS:LOAD:SUCCESS";
export const SET_BOOKS_FILTER = "CATALOG:BOOKS:FILTER:SET";

export interface LoadBooks {
    more?: boolean;
}

export interface LoadBooksSuccess {
    books: WebApi.Entity.MinimalBook[];
    hasMore: boolean;
    more?: boolean;
}

export interface SetBooksFilter {
    filter: Partial<WebApi.Specific.BooksFilter>;
}
