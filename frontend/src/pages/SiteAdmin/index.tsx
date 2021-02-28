import React from "react";
import { useLocation } from "react-router";
import DefaultPageWrapper, { SITE_ADMIN_INFO_SET } from "../../containers/DefaultPageWrapper";
import SiteAdminPage from "../../containers/SiteAdminPage";

const SiteAdmin: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let activeIndex: string | number | undefined = params.get("activeIndex") ?? undefined;

    if (activeIndex && !isNaN(+activeIndex)) {
        activeIndex = Number(activeIndex);
    }

    return (
        <DefaultPageWrapper infoSet={SITE_ADMIN_INFO_SET}>
            <SiteAdminPage activeIndex={activeIndex as number | undefined} />
        </DefaultPageWrapper>
    );
};

export default SiteAdmin;
