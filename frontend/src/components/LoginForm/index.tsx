import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import validator from "validator";
import PasswordInput from "../common/PasswordInput";

interface Props {
    onSubmit?: (email: string, password: string) => void;
    loading?: boolean;
}

const LoginForm: React.FC<Props> = ({ onSubmit, loading }) => {
    const [email, setEmailText] = useState<string>("");
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const buttonDisabled = !Boolean(email || password || emailValid);

    const setEmail = (value: string) => {
        setEmailValid(true);
        setEmailText(value);
    };

    const submit = () => {
        if (onSubmit && !buttonDisabled) {
            onSubmit(email, password);
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
                valid
                value={password}
                hidden={passwordHidden}
                placeholder="Password"
                setValue={setPassword}
                setHidden={setPasswordHidden}
            />
            <Button primary fluid type="submit" disabled={buttonDisabled}>
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
