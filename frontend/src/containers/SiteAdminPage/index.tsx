import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Header, Button, Divider, Tab } from "semantic-ui-react";
import AuthorsTable from "./AuthorsTable";

const SiteAdminPage: React.FC = () => {
    const history = useHistory();
    const { t } = useTranslation();

    const tabOptions = [
        {
            menuItem: t("authors"),
            render: () => <AuthorsTable />,
        },
    ];

    return (
        <div>
            <div className="leftRight">
                <Header as="h2">{t("site_admin")}</Header>
                <Button primary onClick={() => history.push("/chatbot")}>
                    {t("to_chatbot_admin")}
                </Button>
            </div>
            <Divider />
            <Tab panes={tabOptions} />
        </div>
    );
};

export default SiteAdminPage;
