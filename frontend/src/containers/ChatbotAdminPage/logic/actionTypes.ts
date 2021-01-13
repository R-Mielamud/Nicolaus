import { ChatbotAdminState } from "./state";

export const LOAD_MESSENGER_USERS = "CHATBOT:MESSENGER_USERS:LOAD";
export const LOAD_OPERATION_SUCCESS = "CHATBOT:*:LOAD:SUCCESS";

export interface LoadOperationSuccess extends Partial<ChatbotAdminState> {}
