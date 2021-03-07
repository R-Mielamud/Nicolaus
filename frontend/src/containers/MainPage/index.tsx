import React from "react";
import { useSelector } from "react-redux";
import Catalog from "../../pages/Calatog";
import SiteAdmin from "../../pages/SiteAdmin";
import RootState from "../../typings/rootState";

const MainPage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    if (user?.is_admin) {
        return <SiteAdmin />;
    }

    return <Catalog />;
};

export default MainPage;
