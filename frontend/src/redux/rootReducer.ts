import { combineReducers } from "redux";
import { catalogReducer } from "../containers/CatalogPage/logic/reducer";
import { chatbotAdminReducer } from "../containers/ChatbotAdminPage/logic/reducer";
import { authReducer } from "../containers/LoginPage/logic/reducer";
import { siteAdminReducer } from "../containers/SiteAdminPage/logic/reducer";
import RootState from "../typings/rootState";

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    chatbot: chatbotAdminReducer,
    catalog: catalogReducer,
    siteAdmin: siteAdminReducer,
});

export default rootReducer;
