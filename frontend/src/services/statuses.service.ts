import callWebApi from "../helpers/callWebApi.helper";

export async function getStatuses(): Promise<WebApi.Entity.Status[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/statuses/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.Status[];
}

export async function getAdminStatuses(): Promise<WebApi.Entity.ChangeStatus[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/statuses/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangeStatus[];
}

export async function createStatus(body: WebApi.Entity.ChangeStatus): Promise<WebApi.Entity.ChangeStatus> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/statuses/",
        method: "POST",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeStatus;
}

export async function updateStatus(
    id: number,
    body: Partial<WebApi.Entity.ChangeStatus>,
): Promise<WebApi.Entity.ChangeStatus> {
    const res: Response = await callWebApi({
        endpoint: `books/filters/statuses/${id}/`,
        method: "PATCH",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeStatus;
}

export async function deleteStatus(id: number): Promise<void> {
    await callWebApi({
        endpoint: `books/filters/statuses/${id}/`,
        method: "DELETE",
    });
}

export async function bulkStatuses(body: WebApi.Entity.CSVChangeStatus[]): Promise<void> {
    await callWebApi({
        endpoint: "books/filters/statuses/bulk/",
        method: "POST",
        body,
    });
}
