import React from "react";
import { useTranslation } from "react-i18next/*";
import { Icon, Menu } from "semantic-ui-react";
import history from "../../../helpers/history.helper";

const NotAuthorized: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Menu.Menu position="right">
            <Menu.Item>
                <div className="headerText" onClick={() => history.push("/register")}>
                    <Icon name="user circle" />
                    {t("signup")}
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="headerText" onClick={() => history.push("/login")}>
                    <Icon name="sign in" />
                    {t("login")}
                </div>
            </Menu.Item>
        </Menu.Menu>
    );
};

export default NotAuthorized;
