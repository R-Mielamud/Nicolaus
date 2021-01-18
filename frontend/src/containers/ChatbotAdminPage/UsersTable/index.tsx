import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import RootState from "../../../typings/rootState";

const UsersTable: React.FC = () => {
    const { t } = useTranslation();
    const { messengerUsers } = useSelector((state: RootState) => state.chatbot);

    if (!messengerUsers) {
        return <Spinner />;
    }

    return (
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
                {messengerUsers.map((user) => (
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
    );
};

export default UsersTable;
