import { CatalogState } from "../containers/CatalogPage/logic/state";
import { ChatbotAdminState } from "../containers/ChatbotAdminPage/logic/state";
import { AuthState } from "../containers/LoginPage/logic/state";
import { SiteAdminState } from "../containers/SiteAdminPage/logic/state";

interface RootState {
    auth: AuthState;
    chatbot: ChatbotAdminState;
    catalog: CatalogState;
    siteAdmin: SiteAdminState;
}

export default RootState;
