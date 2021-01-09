import { Register } from "../containers/LoginPage/logic/actionTypes";
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

export async function register(data: Register): Promise<WebApi.Specific.AuthResult> {
    const res = await callWebApi({
        endpoint: "user/register/",
        method: "POST",
        body: {
            ...data,
            first_name: data.firstName,
            last_name: data.lastName,
        },
    });

    return (await res.json()) as WebApi.Specific.AuthResult;
}

export async function getProfile(): Promise<WebApi.Entity.User> {
    const res = await callWebApi({
        endpoint: "user/profile/",
        method: "GET",
    });

    return (await res.json()) as WebApi.Entity.User;
}
