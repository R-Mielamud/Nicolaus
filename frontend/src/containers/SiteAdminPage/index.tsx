import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Header, Button, Divider } from "semantic-ui-react";

const SiteAdminPage: React.FC = () => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <div>
            <div className="leftRight">
                <Header as="h2">{t("site_admin")}</Header>
                <Button primary onClick={() => history.push("/chatbot")}>
                    {t("to_chatbot_admin")}
                </Button>
            </div>
            <Divider />
            {/* Content will be added soon */}
        </div>
    );
};

export default SiteAdminPage;
