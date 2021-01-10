import React, { useEffect, useState } from "react";
import { Grid, Header, Message, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../typings/rootState";
import RegisterForm from "../../components/RegisterForm";
import { register } from "../LoginPage/logic/actions";
import { Register } from "../LoginPage/logic/actionTypes";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

const RegisterPage: React.FC = () => {
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
                <Header as="h2">Sign up to Nicolaus</Header>
                <Segment>
                    <RegisterForm onSubmit={submit} loading={loading} />
                </Segment>
                <Message>
                    Already have an account? <NavLink to="/login">Log in</NavLink>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default RegisterPage;
