import React from "react";
import { Segment } from "semantic-ui-react";
import CatalogFiltersBar from "../CatalogFiltersBar";
import styles from "./catalog.module.scss";

const CatalogPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Segment className={styles.sidebar}>
                <CatalogFiltersBar />
            </Segment>
        </div>
    );
};

export default CatalogPage;
