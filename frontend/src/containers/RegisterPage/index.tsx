import React, { useEffect, useState } from "react";
import { Grid, Header, Message, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../typings/rootState";
import RegisterForm from "../../components/RegisterForm";
import { register } from "../LoginPage/logic/actions";
import { Register } from "../LoginPage/logic/actionTypes";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next/*";

const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { requestingRegister, isAuthorized } = useSelector((state: RootState) => state.auth);

    const submit = (data: Register) => {
        dispatch(register(data));
    };

    useEffect(() => {
        setLoading(requestingRegister);
    }, [requestingRegister]);

    if (isAuthorized) {
        return <Redirect to="/" />;
    }

    return (
        <Grid className="fill" columns="1" textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 400 }}>
                <Header as="h2">{t("signup_to_nicolaus")}</Header>
                <Segment>
                    <RegisterForm onSubmit={submit} loading={loading} />
                </Segment>
                <Message>
                    {t("have_account")} <NavLink to="/login">{t("login")}</NavLink>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default RegisterPage;
