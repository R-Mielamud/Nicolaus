import { ChatbotAdminState } from "../containers/ChatbotAdminPage/logic/state";
import { AuthState } from "../containers/LoginPage/logic/state";

interface RootState {
    auth: AuthState;
    chatbot: ChatbotAdminState;
}

export default RootState;
