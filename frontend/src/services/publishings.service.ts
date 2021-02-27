import callWebApi from "../helpers/callWebApi.helper";

export async function getPublishings(): Promise<WebApi.Entity.Publishing[]> {
    const res = await callWebApi({
        endpoint: "books/filters/publishings/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.Publishing[];
}

export async function getAdminSeries(): Promise<WebApi.Entity.ChangeSeries[]> {
    const res = await callWebApi({
        endpoint: "books/filters/publishings/series/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangeSeries[];
}
