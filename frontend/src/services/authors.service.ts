import callWebApi from "../helpers/callWebApi.helper";

export async function getAuthors(): Promise<WebApi.Entity.Author[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/authors/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.Author[];
}

export async function getAdminAuthors(): Promise<WebApi.Entity.ChangeAuthor[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/authors/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangeAuthor[];
}

export async function createAuthor(body: WebApi.Entity.ChangeAuthor): Promise<WebApi.Entity.ChangeAuthor> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/authors/",
        method: "POST",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeAuthor;
}

export async function updateAuthor(
    id: number,
    body: Partial<WebApi.Entity.ChangeAuthor>,
): Promise<WebApi.Entity.ChangeAuthor> {
    const res: Response = await callWebApi({
        endpoint: `books/filters/authors/${id}/`,
        method: "PATCH",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeAuthor;
}

export async function deleteAuthor(id: number): Promise<void> {
    await callWebApi({
        endpoint: `books/filters/authors/${id}/`,
        method: "DELETE",
    });
}

export async function bulkAuthors(body: WebApi.Entity.CSVChangeAuthor[]): Promise<void> {
    await callWebApi({
        endpoint: "books/filters/authors/bulk/",
        method: "POST",
        body,
    });
}
