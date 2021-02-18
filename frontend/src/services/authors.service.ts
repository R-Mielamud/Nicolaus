import callWebApi from "../helpers/callWebApi.helper";

export async function getAuthors(): Promise<WebApi.Entity.Author[]> {
    const res: Response = await callWebApi({
        endpoint: "books/filters/authors/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.Author[];
}
