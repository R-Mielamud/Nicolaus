import callWebApi from "../helpers/callWebApi.helper";

export async function getMessengerUsers(): Promise<WebApi.BotEntity.User[]> {
    const res: Response = await callWebApi({
        endpoint: "users/",
        method: "GET",
        chatbotApi: true,
    });

    return (await res.json()) as WebApi.BotEntity.User[];
}

export async function getMessengerBills(): Promise<WebApi.BotEntity.Bill[]> {
    const res: Response = await callWebApi({
        endpoint: "bills/",
        method: "GET",
        chatbotApi: true,
    });

    return (await res.json()) as WebApi.BotEntity.Bill[];
}
