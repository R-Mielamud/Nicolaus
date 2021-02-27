import callWebApi from "../helpers/callWebApi.helper";

export async function getTagGroups(): Promise<WebApi.Entity.TagGroup[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/tags/groups/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.TagGroup[];
}

export async function getAdminTagGroups(): Promise<WebApi.Entity.ChangeTagGroup[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/tags/groups/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangeTagGroup[];
}

export async function getAdminTags(): Promise<WebApi.Entity.ChangeTag[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/tags/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangeTag[];
}
