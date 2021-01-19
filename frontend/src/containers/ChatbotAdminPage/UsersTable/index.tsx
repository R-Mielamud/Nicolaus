import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Form, Tab, Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { Messengers } from "../../../constants/Messengers";
import RootState from "../../../typings/rootState";

const UsersTable: React.FC = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState<string>("");
    const [showViber, setShowViber] = useState<boolean>(true);
    const [showTelegram, setShowTelegram] = useState<boolean>(true);
    const { messengerUsers } = useSelector((state: RootState) => state.chatbot);

    if (!messengerUsers) {
        return <Spinner />;
    }

    const filterUsers = (user: WebApi.BotEntity.User): boolean | undefined => {
        let phoneMatches = true;

        if (user.phone && search) {
            phoneMatches = user.phone?.toLowerCase().includes(search);
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

    const displayUsers: WebApi.BotEntity.User[] = messengerUsers.filter(filterUsers);

    return (
        <Tab.Pane>
            <Form style={{ marginBottom: 30 }}>
                <Form.Input
                    placeholder={t("search_by_telephone")}
                    icon="search"
                    style={{ width: 240 }}
                    value={search}
                    onChange={(event, data) => setSearch(data.value)}
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
            </Form>
            {displayUsers.length ? (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{t("phone")}</Table.HeaderCell>
                            <Table.HeaderCell>{t("messenger")}</Table.HeaderCell>
                            <Table.HeaderCell>{t("delivery_contacts")}</Table.HeaderCell>
                            <Table.HeaderCell>{t("post_service")}</Table.HeaderCell>
                            <Table.HeaderCell>{t("delivery_address")}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayUsers.map((user) => (
                            <Table.Row key={user.messenger_id}>
                                <Table.Cell>{user.phone}</Table.Cell>
                                <Table.Cell>{user.messenger}</Table.Cell>
                                <Table.Cell>
                                    {user.requisites?.delivery_phone} {user.requisites?.delivery_name}
                                </Table.Cell>
                                <Table.Cell>{user.requisites?.post_service}</Table.Cell>
                                <Table.Cell>{user.requisites?.delivery_address}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <NoResults />
            )}
        </Tab.Pane>
    );
};

export default UsersTable;
