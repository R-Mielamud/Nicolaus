import { ChatbotAdminState } from "./state";

export const LOAD_MESSENGER_BILLS = "CHATBOT:MESSENGER_BILLS:LOAD";
export const LOAD_MESSENGER_USERS = "CHATBOT:MESSENGER_USERS:LOAD";
export const LOAD_MESSENGER_ORDERS = "CHATBOT:MESSENGER_ORDERS:LOAD";
export const LOAD_OPERATION_SUCCESS = "CHATBOT:*:LOAD:SUCCESS";

export interface LoadOperationSuccess extends Partial<ChatbotAdminState> {}
