import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form } from "semantic-ui-react";
import validator from "validator";
import PasswordInput from "../common/PasswordInput";

interface Props {
    onSubmit?: (email: string, password: string) => void;
    loading?: boolean;
}

const LoginForm: React.FC<Props> = ({ onSubmit, loading }) => {
    const { t } = useTranslation();
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
                placeholder={t("email")}
                onChange={(event, data) => setEmail(data.value)}
                onBlur={() => setEmailValid(validator.isEmail(email))}
            />
            <PasswordInput
                valid
                value={password}
                hidden={passwordHidden}
                placeholder={t("password")}
                setValue={setPassword}
                setHidden={setPasswordHidden}
            />
            <Button primary fluid type="submit" disabled={buttonDisabled}>
                {t("login")}
            </Button>
        </Form>
    );
};

export default LoginForm;
