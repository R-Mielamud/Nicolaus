import React, { useMemo, useState } from "react";
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
import styles from "../chatbot.module.scss";

const UsersTable: React.FC = () => {
    const { t } = useTranslation();
    const [phoneSearch, setPhoneSearch] = useState<string>("");
    const [showViber, setShowViber] = useState<boolean>(true);
    const [showTelegram, setShowTelegram] = useState<boolean>(true);
    const { messengerUsers } = useSelector((state: RootState) => state.chatbot);

    const filterUsers = getStdFilter<WebApi.BotEntity.User>({
        getUser: (item) => item,
        phoneSearch,
        showViber,
        showTelegram,
    });

    const displayUsers = useMemo(() => messengerUsers && messengerUsers.filter(filterUsers), [
        messengerUsers,
        filterUsers,
    ]);

    if (!displayUsers) {
        return <Spinner />;
    }

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
                        fileName={FileNames.MESSENGER_USERS_CSV}
                        text={t("download_table")}
                    />
                    <Table celled className={styles.table}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={2}>{t("phone")}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{t("messenger")}</Table.HeaderCell>
                                <Table.HeaderCell>{t("delivery_contacts")}</Table.HeaderCell>
                                <Table.HeaderCell>{t("post_service")}</Table.HeaderCell>
                                <Table.HeaderCell>{t("delivery_address")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {displayUsers.map((user) => (
                                <Table.Row key={user.messenger_id}>
                                    <Table.Cell width={2}>{user.phone}</Table.Cell>
                                    <Table.Cell width={2}>{user.messenger}</Table.Cell>
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
