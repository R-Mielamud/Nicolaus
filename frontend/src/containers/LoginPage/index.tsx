import React, { useEffect, useState } from "react";
import { Grid, Header, Message, Segment } from "semantic-ui-react";
import LoginForm from "../../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../typings/rootState";
import { login } from "./logic/actions";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { requestingLogin, isAuthorized } = useSelector((state: RootState) => state.auth);

    const submit = (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        setLoading(requestingLogin);
    }, [requestingLogin]);

    if (isAuthorized) {
        return <Redirect to="/" />;
    }

    return (
        <Grid className="fill" columns="1" textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 400 }}>
                <Header as="h2">Log in to Nicolaus</Header>
                <Segment>
                    <LoginForm onSubmit={submit} loading={loading} />
                </Segment>
                <Message>
                    Don&apos;t have an account? <NavLink to="/register">Sign up</NavLink>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default LoginPage;
