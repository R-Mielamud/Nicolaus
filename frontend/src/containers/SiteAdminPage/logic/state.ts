import { Books } from "../../../constants/Books";

export const defaultBooksFilter = {
    from: 0,
    limit: Books.ADMIN_INFINITE_SCROLL_STEP,
    tags: [],
    publishings: [],
    series: [],
    authors: [],
    statuses: [],
};

export interface SiteAdminState {
    books?: WebApi.Entity.ChangeBook[];
    tags?: WebApi.Entity.ChangeTag[];
    tagGroups?: WebApi.Entity.ChangeTagGroup[];
    series?: WebApi.Entity.ChangeSeries[];
    publishings?: WebApi.Entity.Publishing[];
    authors?: WebApi.Entity.ChangeAuthor[];
    statuses?: WebApi.Entity.Status[];
    booksFilter: WebApi.Specific.BooksFilter;
    hasMoreBooks: boolean;
    loadingBooks: boolean;
}

export const initialState: SiteAdminState = {
    hasMoreBooks: false,
    loadingBooks: false,
    booksFilter: { ...defaultBooksFilter },
};
