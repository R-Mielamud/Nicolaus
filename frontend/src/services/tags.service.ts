import callWebApi from "../helpers/callWebApi.helper";

export async function getAdminTags(): Promise<WebApi.Entity.ChangeTag[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/tags/",
        method: "GET",
        query: { admin: 1 },
    });

    return (await res.json()) as WebApi.Entity.ChangeTag[];
}

export async function createTag(body: WebApi.Entity.ChangeTag): Promise<WebApi.Entity.ChangeTag> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/tags/",
        method: "POST",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeTag;
}

export async function updateTag(id: number, body: Partial<WebApi.Entity.ChangeTag>): Promise<WebApi.Entity.ChangeTag> {
    const res: Response = await callWebApi({
        endpoint: `books/filters/tags/${id}/`,
        method: "PATCH",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeTag;
}

export async function deleteTag(id: number): Promise<void> {
    await callWebApi({
        endpoint: `books/filters/tags/${id}/`,
        method: "DELETE",
    });
}

export async function bulkTags(body: WebApi.Entity.CSVChangeTag[]): Promise<void> {
    await callWebApi({
        endpoint: "books/filters/tags/bulk/",
        method: "POST",
        body,
    });
}

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

export async function createTagGroup(body: WebApi.Entity.ChangeTagGroup): Promise<WebApi.Entity.ChangeTagGroup> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/tags/groups/",
        method: "POST",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeTagGroup;
}

export async function updateTagGroup(
    id: number,
    body: Partial<WebApi.Entity.ChangeTagGroup>,
): Promise<WebApi.Entity.ChangeTagGroup> {
    const res: Response = await callWebApi({
        endpoint: `books/filters/tags/groups/${id}/`,
        method: "PATCH",
        body,
    });

    return (await res.json()) as WebApi.Entity.ChangeTagGroup;
}

export async function deleteTagGroup(id: number): Promise<void> {
    await callWebApi({
        endpoint: `books/filters/tags/groups/${id}/`,
        method: "DELETE",
    });
}

export async function bulkTagGroups(body: WebApi.Entity.CSVChangeTagGroup[]): Promise<void> {
    await callWebApi({
        endpoint: "books/filters/tags/groups/bulk/",
        method: "POST",
        body,
    });
}
