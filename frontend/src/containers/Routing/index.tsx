import React from "react";
import { Switch } from "react-router";
import PublicRoute from "../../components/common/PublicRoute";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const Routing: React.FC = () => {
    return (
        <Switch>
            <PublicRoute restricted path="/login" exact component={Login} />
            <PublicRoute restricted path="/register" exact component={Register} />
        </Switch>
    );
};

export default Routing;
