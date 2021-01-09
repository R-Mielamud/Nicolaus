import { snakeCaseToSentense } from "../helpers/capitalize.helper";

export const DEFAULT_EXCEPTION_TEXT = "Unknown exception detected. Try again later.";

export interface WebApiExceptionProps {
    url: string;
    status: number;
    statusText: string;
    clientException?: Record<string, any>;
}

export class WebApiException {
    public url: string;
    public text: string;
    public status: number;
    public statusText: string;

    public constructor(props: WebApiExceptionProps) {
        this.url = props.url;
        this.text = this.getExceptionText(props.clientException);
        this.status = props.status;
        this.statusText = props.statusText;
    }

    protected getExceptionText(clientException?: Record<string, any>) {
        if (!clientException) {
            return DEFAULT_EXCEPTION_TEXT;
        }

        if (clientException.message && typeof clientException.message === "string") {
            return clientException.message;
        }

        const texts: string[] = [];

        for (const key of Object.keys(clientException)) {
            const startText = snakeCaseToSentense(key) + ": ";
            const errors = clientException[key];
            const messages = errors.map((err: Record<string, any>) => err.message);
            const messagesText = messages.join(", ");
            texts.push(startText + messagesText + ".");
        }

        return texts.join("\n");
    }
}
