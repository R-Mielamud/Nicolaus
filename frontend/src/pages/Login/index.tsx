import React from "react";
import DefaultPageWrapper from "../../containers/DefaultPageWrapper";
import LoginPage from "../../containers/LoginPage";

const Login: React.FC = () => {
    return (
        <DefaultPageWrapper>
            <LoginPage />
        </DefaultPageWrapper>
    );
};

export default Login;
