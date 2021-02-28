import callWebApi from "../helpers/callWebApi.helper";

export async function getPublishings(): Promise<WebApi.Entity.Publishing[]> {
    const res = await callWebApi({
        endpoint: "books/filters/publishings/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.Publishing[];
}

export async function getAdminPublishings(): Promise<WebApi.Entity.ChangePublishing[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/publishings/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangePublishing[];
}

export async function createPublishing(body: WebApi.Entity.ChangePublishing): Promise<WebApi.Entity.ChangePublishing> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/publishings/",
        method: "POST",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangePublishing;
}

export async function updatePublishing(
    id: number,
    body: Partial<WebApi.Entity.ChangePublishing>,
): Promise<WebApi.Entity.ChangePublishing> {
    const res: Response = await callWebApi({
        endpoint: `books/filters/publishings/${id}/`,
        method: "PATCH",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangePublishing;
}

export async function deletePublishing(id: number): Promise<void> {
    await callWebApi({
        endpoint: `books/filters/publishings/${id}/`,
        method: "DELETE",
    });
}

export async function bulkPublishings(body: WebApi.Entity.CSVChangePublishing[]): Promise<void> {
    await callWebApi({
        endpoint: "books/filters/publishings/bulk/",
        method: "POST",
        body,
    });
}

export async function getAdminSeries(): Promise<WebApi.Entity.ChangeSeries[]> {
    const res = await callWebApi({
        endpoint: "books/filters/publishings/series/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangeSeries[];
}
