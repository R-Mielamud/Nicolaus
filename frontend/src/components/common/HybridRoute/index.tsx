import React from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router";
import { ReactComponent } from "../../../typings/react";
import RootState from "../../../typings/rootState";

interface Props {
    authorized: ReactComponent;
    notAuthorized: ReactComponent;
}

const HybridRoute: React.FC<Props & RouteProps> = ({ authorized, notAuthorized, ...rest }) => {
    const { isAuthorized } = useSelector((state: RootState) => state.auth);
    const Component = isAuthorized ? authorized : notAuthorized;

    return <Route component={Component} {...rest} />;
};

export default HybridRoute;
