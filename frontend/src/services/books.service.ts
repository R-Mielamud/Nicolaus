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

export async function getRecommendedBooks(exclude?: number): Promise<WebApi.Entity.MinimalBook[]> {
    const res: Response = await callWebApi({
        endpoint: "books/recommendations/",
        method: "GET",
        ...(exclude ? { query: { exclude } } : {}),
    });

    return (await res.json()) as WebApi.Entity.MinimalBook[];
}

export async function getBookById(id: number): Promise<WebApi.Entity.Book> {
    const res: Response = await callWebApi({
        endpoint: `books/${id}/`,
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.Book;
}
