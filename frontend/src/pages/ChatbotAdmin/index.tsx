import React from "react";
import ChatbotAdminPage from "../../containers/ChatbotAdminPage";
import DefaultPageWrapper, { CHATBOT_ADMIN_INFO_SET } from "../../containers/DefaultPageWrapper";

const ChatbotAdmin: React.FC = () => {
    return (
        <DefaultPageWrapper infoSet={CHATBOT_ADMIN_INFO_SET}>
            <ChatbotAdminPage />
        </DefaultPageWrapper>
    );
};

export default ChatbotAdmin;
