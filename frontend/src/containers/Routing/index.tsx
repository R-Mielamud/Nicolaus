import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router";
import HybridRoute from "../../components/common/HybridRoute";
import PrivateRoute from "../../components/common/PrivateRoute";
import PublicRoute from "../../components/common/PublicRoute";
import Spinner from "../../components/common/Spinner";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import RootState from "../../typings/rootState";
import ChatbotAdmin from "../../pages/ChatbotAdmin";
import Header from "../Header";
import { loadProfile } from "../LoginPage/logic/actions";
import Main from "../../pages/Main";

const Routing: React.FC = () => {
    const dispatch = useDispatch();
    const { profileLoaded } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(loadProfile());
    }, []);

    if (!profileLoaded) {
        return <Spinner />;
    }

    return (
        <Switch>
            <PublicRoute restricted path="/login" exact component={Login} />
            <PublicRoute restricted path="/register" exact component={Register} />
            <PrivateRoute path="/chatbot" exact component={ChatbotAdmin} />
            <HybridRoute path="/" exact authorized={Main} notAuthorized={Header} />
        </Switch>
    );
};

export default Routing;
