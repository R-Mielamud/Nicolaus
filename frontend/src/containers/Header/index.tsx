import React from "react";
import { useSelector } from "react-redux";
import { Menu, Header as HeaderUI } from "semantic-ui-react";
import Logo from "../../components/common/Logo";
import { removeToken } from "../../helpers/token.helper";
import RootState from "../../typings/rootState";
import Authorized from "./Authorized";
import NotAuthorized from "./NotAuthorized";
import styles from "./header.module.scss";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

const Header: React.FC = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const { isAuthorized } = useSelector((state: RootState) => state.auth);

    const logOut = () => {
        removeToken();
        window.location.replace("/");
    };

    return (
        <div className={styles.headerWrapper}>
            <Menu secondary>
                <Menu.Menu onClick={() => history.push("/")} title={t("to_home")} className={styles.cursor}>
                    <div className={styles.logoWrapper}>
                        <Logo />
                    </div>
                    <Menu.Item>
                        <HeaderUI as="h1">Nicolaus</HeaderUI>
                    </Menu.Item>
                </Menu.Menu>
                {isAuthorized ? <Authorized logOut={logOut} /> : <NotAuthorized />}
            </Menu>
        </div>
    );
};

export default Header;
