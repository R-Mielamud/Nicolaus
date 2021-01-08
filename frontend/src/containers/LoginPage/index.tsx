import React, { useEffect, useState } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import LoginForm from "../../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../typings/rootState";
import { login } from "./logic/actions";

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { requestingLogin } = useSelector((state: RootState) => state.auth);

    const submit = (email: string, password: string) => {
        setLoading(true);
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (!requestingLogin && loading) {
            setLoading(false);
        }
    }, [requestingLogin]);

    return (
        <Grid className="fill" columns="1" textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 400 }}>
                <Header as="h2">Log in to Nicolaus</Header>
                <Segment>
                    <LoginForm onSubmit={submit} loading={loading} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default LoginPage;
