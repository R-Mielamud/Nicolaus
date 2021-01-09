import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import RootState from "../../../typings/rootState";

interface Props {
    component: React.ComponentClass | React.FC | React.FunctionComponent;
    restricted?: boolean;
}

const PublicRoute: React.FC<Props & RouteProps> = ({ component, restricted, ...rest }) => {
    const { isAuthorized } = useSelector((state: RootState) => state.auth);
    const Component = isAuthorized && restricted ? () => <Redirect to="/" /> : component;

    return <Route {...rest} component={Component} />;
};

export default PublicRoute;
