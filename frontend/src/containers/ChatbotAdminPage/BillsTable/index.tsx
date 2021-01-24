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
// import moment from "moment";

const BillsTable: React.FC = () => {
    const { t } = useTranslation();
    const [phoneSearch, setPhoneSearch] = useState<string>("");
    const [showViber, setShowViber] = useState<boolean>(true);
    const [showTelegram, setShowTelegram] = useState<boolean>(true);
    const { messengerBills } = useSelector((state: RootState) => state.chatbot);

    if (!messengerBills) {
        return <Spinner />;
    }

    const filterBills = getStdFilter<WebApi.BotEntity.Bill>({
        getUser: (item) => item.user,
        phoneSearch,
        showViber,
        showTelegram,
    });

    const displayBills: WebApi.BotEntity.Bill[] = messengerBills.filter(filterBills);
    // {moment(bill.created_at).format("MMMM Do YYYY, h:mm a")}

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
            {displayBills.length ? (
                <>
                    <DownloadCSV
                        data={displayBills}
                        headers={CSVHeaders.MESSENGER_BILL}
                        fileName={FileNames.BILLS_CSV}
                        text={t("download_table")}
                    />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={2}>{t("phone")}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{t("messenger")}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{t("creation_date")}</Table.HeaderCell>
                                <Table.HeaderCell width={6}>{t("amount")}</Table.HeaderCell>
                                <Table.HeaderCell width={7}>{t("comment")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {displayBills.map((bill) => (
                                <Table.Row key={bill.id}>
                                    <Table.Cell>{bill.user.phone}</Table.Cell>
                                    <Table.Cell>{bill.user.messenger}</Table.Cell>
                                    <Table.Cell>{bill.created_at}</Table.Cell>
                                    <Table.Cell>{bill.amount}</Table.Cell>
                                    <Table.Cell>{bill.comment}</Table.Cell>
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

export default BillsTable;
