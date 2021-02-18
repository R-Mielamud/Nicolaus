import callWebApi from "../helpers/callWebApi.helper";

export async function getTagGroups(): Promise<WebApi.Entity.TagGroup[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/tags/groups/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.TagGroup[];
}
