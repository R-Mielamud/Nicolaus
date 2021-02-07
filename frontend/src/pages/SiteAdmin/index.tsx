import React from "react";
import DefaultPageWrapper, { SITE_ADMIN_INFO_SET } from "../../containers/DefaultPageWrapper";
import SiteAdminPage from "../../containers/SiteAdminPage";

const SiteAdmin: React.FC = () => {
    return (
        <DefaultPageWrapper infoSet={SITE_ADMIN_INFO_SET}>
            <SiteAdminPage />
        </DefaultPageWrapper>
    );
};

export default SiteAdmin;
