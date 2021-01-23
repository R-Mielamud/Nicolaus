import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Tab, Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import DownloadCSV from "../../../components/DownloadCSV";
import NoResults from "../../../components/NoResults";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import RootState from "../../../typings/rootState";
import StdSearch, { getStdFilter } from "../StdSearch";

const UsersTable: React.FC = () => {
    const { t } = useTranslation();
    const [phoneSearch, setPhoneSearch] = useState<string>("");
    const [showViber, setShowViber] = useState<boolean>(true);
    const [showTelegram, setShowTelegram] = useState<boolean>(true);
    const { messengerUsers } = useSelector((state: RootState) => state.chatbot);

    if (!messengerUsers) {
        return <Spinner />;
    }

    const filterUsers = getStdFilter<WebApi.BotEntity.User>({
        getUser: (item) => item,
        phoneSearch,
        showViber,
        showTelegram,
    });

    const displayUsers: WebApi.BotEntity.User[] = messengerUsers.filter(filterUsers);

    return (
        <Tab.Pane>
            <StdSearch
                phoneSearch={phoneSearch}
                showViber={showViber}
                showTelegram={showTelegram}
                setPhoneSearch={setPhoneSearch}
                setShowViber={setShowViber}
                setShowTelegram={setShowTelegram}
            />
            {displayUsers.length ? (
                <>
                    <DownloadCSV
                        data={displayUsers}
                        headers={CSVHeaders.MESSENGER_USER}
                        fileName={FileNames.USERS_CSV}
                        text={t("download_table")}
                    />
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
                </>
            ) : (
                <NoResults />
            )}
        </Tab.Pane>
    );
};

export default UsersTable;
