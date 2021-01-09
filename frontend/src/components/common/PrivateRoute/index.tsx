import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import RootState from "../../../typings/rootState";

interface Props {
    component: React.ComponentClass | React.FC | React.FunctionComponent;
    restricted?: boolean;
}

const PrivateRoute: React.FC<Props & RouteProps> = ({ component, restricted, ...rest }) => {
    const { isAuthorized } = useSelector((state: RootState) => state.auth);
    const Component = isAuthorized ? component : () => <Redirect to="/" />;

    return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
