import React from "react";
import { Icon, Form, Popup } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import { Password } from "../../../constants/Password";
import { useTranslation } from "react-i18next";

interface Props {
    value: string;
    hidden: boolean;
    valid: boolean;
    placeholder?: string;
    setValue: (value: string) => void;
    setHidden: (value: boolean) => void;
    setValid?: (value: boolean) => void;
}

const PasswordInput: React.FC<Props> = ({
    value,
    hidden,
    valid,
    placeholder,
    setHidden,
    setValue: setValueText,
    setValid: setValidBool,
}) => {
    const { t } = useTranslation();
    const type = hidden ? "password" : "text";
    const iconName: SemanticICONS = hidden ? "eye" : "eye slash";
    const icon = <Icon name={iconName} link onClick={() => setHidden(!hidden)} />;

    const setValid = (value: boolean) => {
        if (setValidBool) {
            setValidBool(value);
        }
    };

    const validate = (value: string) => {
        const normalized = value.trim();
        return normalized.length >= Password.MIN_LENGTH;
    };

    const setValue = (value: string) => {
        setValueText(value);
        setValid(true);
    };

    return (
        <Popup
            open={!valid}
            className="error"
            on={[]}
            content={t("short_password")}
            trigger={
                <Form.Input
                    value={value}
                    error={!valid}
                    type={type}
                    icon={icon}
                    iconPosition="left"
                    placeholder={placeholder}
                    onChange={(event, data) => setValue(data.value)}
                    onBlur={() => setValid(validate(value))}
                />
            }
        />
    );
};

export default PasswordInput;
