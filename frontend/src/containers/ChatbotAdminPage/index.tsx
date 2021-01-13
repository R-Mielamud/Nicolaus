import React from "react";
import { useTranslation } from "react-i18next/*";
import { useSelector } from "react-redux";
import { Button, Divider, Header } from "semantic-ui-react";
import history from "../../helpers/history.helper";
import RootState from "../../typings/rootState";

const ChatbotAdminPage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user || !user.is_admin) {
        return null;
    }

    return (
        <div>
            <div className="leftRight">
                <Header as="h1">{t("chatbot_admin")}</Header>
                <Button primary onClick={() => history.push("/")}>
                    {t("to_site_admin")}
                </Button>
            </div>
            <Divider horizontal />
        </div>
    );
};

export default ChatbotAdminPage;
