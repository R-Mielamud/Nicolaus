import React from "react";
import { useSelector } from "react-redux";
import RootState from "../../typings/rootState";
import CatalogPage from "../CatalogPage";
import SiteAdminPage from "../SiteAdminPage";

const MainPage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (!user) {
        return null;
    }

    if (user.is_admin) {
        return <SiteAdminPage />;
    }

    return <CatalogPage />;
};

export default MainPage;
