import callWebApi from "../helpers/callWebApi.helper";

export async function login(email: string, password: string): Promise<WebApi.Specific.AuthResult> {
    const res = await callWebApi({
        endpoint: "user/login/",
        method: "POST",
        body: {
            email,
            password,
        },
    });

    return (await res.json()) as WebApi.Specific.AuthResult;
}
