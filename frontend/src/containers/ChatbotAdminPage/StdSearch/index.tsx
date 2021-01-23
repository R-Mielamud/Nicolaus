import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from "semantic-ui-react";
import { Messengers } from "../../../constants/Messengers";
import { Setter } from "../../../typings/setter";

interface Props {
    phoneSearch: string;
    showViber: boolean;
    showTelegram: boolean;
    setPhoneSearch: Setter<string>;
    setShowViber: Setter<boolean>;
    setShowTelegram: Setter<boolean>;
}

const StdSearch: React.FC<Props> = ({
    children,
    phoneSearch,
    showViber,
    showTelegram,
    setPhoneSearch,
    setShowViber,
    setShowTelegram,
}) => {
    const { t } = useTranslation();

    return (
        <Form style={{ marginBottom: 30 }}>
            <Form.Input
                placeholder={t("search_by_telephone")}
                icon="search"
                style={{ width: 240 }}
                value={phoneSearch}
                onChange={(event, data) => setPhoneSearch(data.value)}
            />
            <Form.Group>
                <Form.Checkbox
                    toggle
                    label="Viber"
                    checked={showViber}
                    onChange={(event, data) => setShowViber(data.checked ?? false)}
                />
                <Form.Checkbox
                    toggle
                    label="Telegram"
                    checked={showTelegram}
                    onChange={(event, data) => setShowTelegram(data.checked ?? false)}
                />
            </Form.Group>
            {children}
        </Form>
    );
};

export interface GetUser<I> {
    (item: I): WebApi.BotEntity.MinimalUser;
}

export interface StdFilterProps<I> {
    phoneSearch: string;
    showViber: boolean;
    showTelegram: boolean;
    getUser: GetUser<I>;
}

export function getStdFilter<I>(props: StdFilterProps<I>) {
    return (item: I): boolean | undefined => {
        let phoneMatches = true;
        const user = props.getUser(item);
        const { phoneSearch, showViber, showTelegram } = props;

        if (user.phone && phoneSearch) {
            phoneMatches = user.phone?.toLowerCase().includes(phoneSearch);
        }

        if (showViber && showTelegram) {
            return phoneMatches;
        }

        if (!showViber && !showTelegram) {
            return false;
        }

        const canShowViber = showViber && user.messenger === Messengers.VIBER;
        const canShowTelegram = showTelegram && user.messenger === Messengers.TELEGRAM;

        if (canShowViber || canShowTelegram) {
            return phoneMatches;
        }
    };
}

export default StdSearch;
