import React, { useState } from "react";
import { Form, Button, Label } from "semantic-ui-react";
import { Register } from "../../containers/LoginPage/logic/actionTypes";
import PasswordInput from "../common/PasswordInput";
import validator from "validator";
import { useTranslation } from "react-i18next";
import { Setter } from "../../typings/setter";
import { fullTelephoneValid, partialTelephoneValid } from "../../helpers/telephone.helper";

interface Props {
    onSubmit?: Setter<Register>;
    loading: boolean;
}

const RegisterForm: React.FC<Props> = ({ onSubmit, loading }) => {
    const { t } = useTranslation();
    const [email, setEmailText] = useState<string>("");
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [telephone, setTelephoneText] = useState<string>("");
    const [telephoneValid, setTelephoneValid] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const phonePrefix = "+380";
    const buttonDisabled = !Boolean(email || password || emailValid || passwordValid);

    const setEmail = (value: string) => {
        setEmailValid(true);
        setEmailText(value);
    };

    const setTelephone = (value: string) => {
        if (partialTelephoneValid(value)) {
            setTelephoneText(value);
        }

        setTelephoneValid(true);
    };

    const submit = () => {
        if (onSubmit && !buttonDisabled) {
            onSubmit({
                email,
                password,
                telephone: telephone ? phonePrefix + telephone : undefined,
                firstName: firstName || undefined,
                lastName: lastName || undefined,
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
                placeholder={t("email")}
                onChange={(event, data) => setEmail(data.value)}
                onBlur={() => setEmailValid(validator.isEmail(email))}
            />
            <PasswordInput
                valid={passwordValid}
                value={password}
                hidden={passwordHidden}
                placeholder={t("password")}
                setValue={setPassword}
                setHidden={setPasswordHidden}
                setValid={setPasswordValid}
            />
            <Form.Input
                value={telephone}
                labelPosition="left"
                placeholder={t("phone_number")}
                error={!telephoneValid}
                onChange={(event, data) => setTelephone(data.value)}
                onBlur={() => setTelephoneValid(fullTelephoneValid(telephone))}
            >
                <Label basic>{phonePrefix}</Label>
                <input />
            </Form.Input>
            <Form.Input
                icon="user"
                iconPosition="left"
                value={firstName}
                placeholder={t("first_name")}
                onChange={(event, data) => setFirstName(data.value)}
            />
            <Form.Input
                icon="user"
                iconPosition="left"
                value={lastName}
                placeholder={t("last_name")}
                onChange={(event, data) => setLastName(data.value)}
            />
            <Button primary fluid type="submit" disabled={buttonDisabled}>
                {t("signup")}
            </Button>
        </Form>
    );
};

export default RegisterForm;
