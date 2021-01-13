import React from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router";
import RootState from "../../../typings/rootState";

interface Props {
    authorized: React.ComponentClass | React.FC | React.FunctionComponent;
    notAuthorized: React.ComponentClass | React.FC | React.FunctionComponent;
}

const HybridRoute: React.FC<Props & RouteProps> = ({ authorized, notAuthorized, ...rest }) => {
    const { isAuthorized } = useSelector((state: RootState) => state.auth);
    const Component = isAuthorized ? authorized : notAuthorized;

    return <Route component={Component} {...rest} />;
};

export default HybridRoute;
