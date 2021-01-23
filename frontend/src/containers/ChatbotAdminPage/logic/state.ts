export interface ChatbotAdminState {
    messengerUsers?: WebApi.BotEntity.User[];
    messengerBills?: WebApi.BotEntity.Bill[];
    messengerOrders?: WebApi.BotEntity.Order[];
}

export const initialState: ChatbotAdminState = {};
