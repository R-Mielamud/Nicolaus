export interface ChatbotAdminState {
    messengerUsers?: WebApi.BotEntity.User[];
    messengerBills?: WebApi.BotEntity.Bill[];
}

export const initialState: ChatbotAdminState = {};
