import React from "react";
import CatalogPage from "../../containers/CatalogPage";
import DefaultPageWrapper, { CATALOG_INFO_SET } from "../../containers/DefaultPageWrapper";

const Catalog: React.FC = () => {
    return (
        <DefaultPageWrapper infoSet={CATALOG_INFO_SET}>
            <CatalogPage />
        </DefaultPageWrapper>
    );
};

export default Catalog;
