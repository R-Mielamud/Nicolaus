import React from "react";
import { useTranslation } from "react-i18next/*";
import { Header, Button, Divider } from "semantic-ui-react";
import history from "../../helpers/history.helper";

const SiteAdminPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="leftRight">
                <Header as="h1">{t("site_admin")}</Header>
                <Button primary onClick={() => history.push("/chatbot")}>
                    {t("to_chatbot_admin")}
                </Button>
            </div>
            <Divider horizontal />
            {/* Content will be added soon */}
        </div>
    );
};

export default SiteAdminPage;
