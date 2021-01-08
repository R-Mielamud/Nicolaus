import React from "react";
import { Switch } from "react-router";
import PublicRoute from "../../components/common/PublicRoute";
import Login from "../../pages/Login";

const Routing: React.FC = () => {
    return (
        <Switch>
            <PublicRoute restricted path="/login" exact component={Login} />
        </Switch>
    );
};

export default Routing;
