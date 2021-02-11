import convertFilterToQuery from "../helpers/booksFilter.helper";
import callWebApi from "../helpers/callWebApi.helper";

export async function getBooks(filter: WebApi.Specific.BooksFilter): Promise<WebApi.Specific.ListBooksResult> {
    const res: Response = await callWebApi({
        endpoint: "books/",
        method: "GET",
        query: convertFilterToQuery(filter),
    });

    return (await res.json()) as WebApi.Specific.ListBooksResult;
}

export async function getRecommendedBooks(): Promise<WebApi.Entity.MinimalBook[]> {
    const res: Response = await callWebApi({
        endpoint: "books/recommendations/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.MinimalBook[];
}
