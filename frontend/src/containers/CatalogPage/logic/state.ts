import { Books } from "../../../constants/Books";

export interface CatalogState {
    books?: WebApi.Entity.MinimalBook[];
    tagGroups?: WebApi.Entity.TagGroup[];
    publishings?: WebApi.Entity.Publishing[];
    hasMoreBooks: boolean;
    booksFilter: WebApi.Specific.BooksFilter;
}

export const initialState: CatalogState = {
    hasMoreBooks: false,
    booksFilter: {
        from: 0,
        limit: Books.INFINITE_SCROLL_STEP,
    },
};
