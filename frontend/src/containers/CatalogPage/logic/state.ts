import { Books } from "../../../constants/Books";

export interface CatalogState {
    books?: WebApi.Entity.MinimalBook[];
    recommendations?: WebApi.Entity.MinimalBook[];
    lastRecommendationTime: number;
    tagGroups?: WebApi.Entity.TagGroup[];
    publishings?: WebApi.Entity.Publishing[];
    authors?: WebApi.Entity.Author[];
    statuses?: WebApi.Entity.Series[];
    loadingBooks: boolean;
    hasMoreBooks: boolean;
    booksFilter: WebApi.Specific.BooksFilter;
}

export const initialState: CatalogState = {
    hasMoreBooks: false,
    loadingBooks: false,
    lastRecommendationTime: -5000,
    booksFilter: {
        from: 0,
        limit: Books.INFINITE_SCROLL_STEP,
        tags: [],
        publishings: [],
        series: [],
        authors: [],
        statuses: [],
    },
};
