import callWebApi from "../helpers/callWebApi.helper";

export async function getStatuses(): Promise<WebApi.Entity.Status[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/statuses/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.Status[];
}
