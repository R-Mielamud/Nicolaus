import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "semantic-ui-react";
import image from "../../assets/noresults.jpeg";
import styles from "./noresults.module.scss";

const NoResults: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <img src={image} alt="No results" />
            <Header as="h2">{t("cant_find")}</Header>
        </div>
    );
};

export default NoResults;
