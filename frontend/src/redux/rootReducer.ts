import { combineReducers } from "redux";
import { chatbotAdminReducer } from "../containers/ChatbotAdminPage/logic/reducer";
import { authReducer } from "../containers/LoginPage/logic/reducer";
import RootState from "../typings/rootState";

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    chatbot: chatbotAdminReducer,
});

export default rootReducer;
