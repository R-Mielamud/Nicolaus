import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Divider, Header, Tab } from "semantic-ui-react";
import history from "../../helpers/history.helper";
import RootState from "../../typings/rootState";
import UsersTable from "./UsersTable";

const ChatbotAdminPage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user || !user.is_admin) {
        return null;
    }

    const tabOptions = [
        {
            menuItem: t("users"),
            render: () => <UsersTable />,
        },
    ];

    return (
        <div>
            <div className="leftRight">
                <Header as="h2">{t("chatbot_admin")}</Header>
                <Button primary onClick={() => history.push("/")}>
                    {t("to_site_admin")}
                </Button>
            </div>
            <Divider />
            <Tab panes={tabOptions} />
        </div>
    );
};

export default ChatbotAdminPage;
