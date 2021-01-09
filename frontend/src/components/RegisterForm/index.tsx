import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Register } from "../../containers/LoginPage/logic/actionTypes";
import PasswordInput from "../common/PasswordInput";
import validator from "validator";

interface Props {
    onSubmit?: (data: Register) => void;
    loading: boolean;
}

const RegisterForm: React.FC<Props> = ({ onSubmit, loading }) => {
    const [email, setEmailText] = useState<string>("");
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [telephone, setTelephone] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const buttonDisabled = !Boolean(email || password || emailValid || passwordValid);

    const setEmail = (value: string) => {
        setEmailValid(true);
        setEmailText(value);
    };

    const submit = () => {
        if (onSubmit && !buttonDisabled) {
            onSubmit({
                email,
                password,
                telephone: telephone || undefined,
                firstName: firstName || undefined,
                lastName: firstName || undefined,
            });
        }
    };

    return (
        <Form onSubmit={submit} loading={loading}>
            <Form.Input
                icon="at"
                iconPosition="left"
                error={!emailValid}
                value={email}
                placeholder="Email"
                onChange={(event, data) => setEmail(data.value)}
                onBlur={() => setEmailValid(validator.isEmail(email))}
            />
            <PasswordInput
                valid={passwordValid}
                value={password}
                hidden={passwordHidden}
                placeholder="Password"
                setValue={setPassword}
                setHidden={setPasswordHidden}
                setValid={setPasswordValid}
            />
            <Form.Input
                icon="phone"
                iconPosition="left"
                value={telephone}
                placeholder="Phone number"
                onChange={(event, data) => setTelephone(data.value)}
            />
            <Form.Input
                icon="user"
                iconPosition="left"
                value={firstName}
                placeholder="First name"
                onChange={(event, data) => setFirstName(data.value)}
            />
            <Form.Input
                icon="user"
                iconPosition="left"
                value={lastName}
                placeholder="Last name"
                onChange={(event, data) => setLastName(data.value)}
            />
            <Button primary fluid type="submit" disabled={buttonDisabled}>
                Sign up
            </Button>
        </Form>
    );
};

export default RegisterForm;
