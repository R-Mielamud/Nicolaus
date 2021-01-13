import React from "react";
import ChatbotAdminPage from "../../containers/ChatbotAdminPage";
import DefaultPageWrapper from "../../containers/DefaultPageWrapper";

const ChatbotAdmin: React.FC = () => {
    return (
        <DefaultPageWrapper>
            <ChatbotAdminPage />
        </DefaultPageWrapper>
    );
};

export default ChatbotAdmin;
