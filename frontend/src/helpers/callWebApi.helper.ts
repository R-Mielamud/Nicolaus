import qs from "qs";
import { getToken } from "./token.helper";
import { WebApiException, WebApiExceptionProps, DEFAULT_EXCEPTION_TEXT } from "../typings/webapiException";

const API = "api/";
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL + "/";
const CHATBOT_BASE_URL = process.env.REACT_APP_CHATBOT_BASE_URL + "/";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestArgs {
    endpoint: string;
    method: Method;
    chatbotApi?: boolean;
    skipAuthorization?: boolean;
    query?: Record<string, any>;
    body?: any;
    attachment?: File;
    attachmentFieldName?: string;
}

type Body =
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null
    | undefined;

export default async function callWebApi(args: RequestArgs): Promise<Response> {
    try {
        const res: Response = await fetch(getUrl(args), getArgs(args));
        await throwIfResponseFailed(res);
        return res;
    } catch (err) {
        throw { text: DEFAULT_EXCEPTION_TEXT, ...err };
    }
}

async function throwIfResponseFailed(res: Response) {
    if (!res.ok) {
        const params: WebApiExceptionProps = {
            status: res.status,
            statusText: res.statusText,
            url: res.url,
        };

        try {
            params.clientException = await res.json();
        } catch {}

        throw new WebApiException(params);
    }
}

function getUrl(args: RequestArgs): RequestInfo {
    const querystring = args.query ? `?${qs.stringify(args.query)}` : "";
    const baseUrl = args.chatbotApi ? CHATBOT_BASE_URL : BACKEND_BASE_URL;
    return baseUrl + API + args.endpoint + querystring;
}

function getArgs(args: RequestArgs): RequestInit {
    const headers: Headers | string[][] | Record<string, string> | undefined = {};
    const token = getToken();
    let body: Body;

    if (token && !args.skipAuthorization) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (args.attachment) {
        if (args.method === "GET") {
            throw new Error("GET request does not support attachments.");
        }

        const formData = new FormData();
        formData.append(args.attachmentFieldName ?? "attachment", args.attachment);

        if (args.body) {
            Object.entries(args.body).forEach(([key, value]) => {
                formData.append(key, String(value));
            });
        }

        body = formData;
    } else if (args.body) {
        if (args.method === "GET") {
            throw new Error("GET request does not support request body.");
        }

        body = JSON.stringify(args.body);
        headers["Content-Type"] = "application/json";
        headers.Accept = "application/json";
    }

    return {
        method: args.method,
        headers,
        ...(args.method === "GET" ? {} : { body }),
    };
}
