import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";
import image from "../../assets/noresults.png";
import styles from "./noresults.module.scss";

interface Props {
    notCentered?: boolean;
}

const NoResults: React.FC<Props> = ({ notCentered, children }) => {
    const { t } = useTranslation();

    return (
        <div className={notCentered ? styles.container : styles.centered}>
            <img src={image} alt="No results" />
            <Header as="h2">{t("cant_find")}</Header>
            {children}
        </div>
    );
};

export default NoResults;
