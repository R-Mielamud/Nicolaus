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

export async function getAdminBooks(
    filter: WebApi.Specific.BooksFilter,
    all: boolean = false,
): Promise<WebApi.Specific.ListAdminBooksResult> {
    const res: Response = await callWebApi({
        endpoint: "books/",
        method: "GET",
        query: { ...convertFilterToQuery(filter), admin: 1, all: all ? 1 : 0 },
    });

    return (await res.json()) as WebApi.Specific.ListAdminBooksResult;
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
export async function createBook(body: WebApi.Entity.ServerChangeBook): Promise<WebApi.Entity.ChangeBook> {
    const { image, ...newBody } = body;

    const res: Response = await callWebApi({
        endpoint: "books/",
        method: "POST",
        attachment: image,
        attachmentFieldName: "image",
        body: newBody,
    });

    return (await res.json()) as WebApi.Entity.ChangeBook;
}

export async function updateBook(
    id: number,
    body: Partial<WebApi.Entity.ServerChangeBook>,
): Promise<WebApi.Entity.ChangeBook> {
    const { image, ...newBody } = body;

    const res: Response = await callWebApi({
        endpoint: `books/${id}/`,
        method: "PATCH",
        attachment: image,
        attachmentFieldName: "image",
        body: newBody,
    });

    return (await res.json()) as WebApi.Entity.ChangeBook;
}

export async function deleteBook(id: number): Promise<void> {
    await callWebApi({
        endpoint: `books/${id}/`,
        method: "DELETE",
    });
}

export async function bulkBooks(body: WebApi.Entity.CSVChangeBook[]): Promise<void> {
    await callWebApi({
        endpoint: "books/bulk/",
        method: "POST",
        body,
    });
}
