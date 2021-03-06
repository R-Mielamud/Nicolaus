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
import styles from "./orders.module.scss";
import globalStyles from "../chatbot.module.scss";

const OrdersTable: React.FC = () => {
    const { t } = useTranslation();
    const [phoneSearch, setPhoneSearch] = useState<string>("");
    const [showViber, setShowViber] = useState<boolean>(true);
    const [showTelegram, setShowTelegram] = useState<boolean>(true);
    const { messengerOrders } = useSelector((state: RootState) => state.chatbot);

    const filterOrders = getStdFilter<WebApi.BotEntity.Order>({
        getUser: (item) => item.user,
        phoneSearch,
        showViber,
        showTelegram,
    });

    const displayOrders = useMemo(() => messengerOrders && messengerOrders.filter(filterOrders), [
        messengerOrders,
        filterOrders,
    ]);

    if (!displayOrders) {
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
            {displayOrders.length ? (
                <>
                    <DownloadCSV
                        data={displayOrders}
                        headers={CSVHeaders.MESSENGER_ORDER}
                        fileName={FileNames.MESSENGER_ORDERS_CSV}
                        text={t("download_table")}
                        newLineArrays
                    />
                    <Table celled className={globalStyles.table}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={2}>{t("phone")}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{t("messenger")}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{t("creation_date")}</Table.HeaderCell>
                                <Table.HeaderCell>{t("books")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {displayOrders.map((order) => (
                                <Table.Row key={order.id}>
                                    <Table.Cell width={2}>{order.user.phone}</Table.Cell>
                                    <Table.Cell width={2}>{order.user.messenger}</Table.Cell>
                                    <Table.Cell width={2}>{order.created_at}</Table.Cell>
                                    <Table.Cell>
                                        <div className={styles.booksCell}>
                                            {order.books.map((book, i) => (
                                                <div key={i}>{book}</div>
                                            ))}
                                        </div>
                                    </Table.Cell>
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

export default OrdersTable;
