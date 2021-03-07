import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Input, Tab, Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { bulkStatuses, createStatus, deleteStatus, updateStatus } from "../logic/actions";
import RootState from "../../../typings/rootState";
import DownloadCSV from "../../../components/DownloadCSV";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import ImportCSV from "../../../components/ImportCSV";
import { TableProps } from "..";
import styles from "../site.module.scss";

interface IndexedChange extends Partial<WebApi.Entity.ChangeStatus> {
    [key: string]: any;
}

interface ChangeStatusDataSet {
    [key: number]: IndexedChange;
}

const StatusesTable: React.FC<TableProps> = ({ index }) => {
    const { t } = useTranslation();
    const defaultNewStatus: Partial<WebApi.Entity.ChangeStatus> = { name: "" };
    const dispatch = useDispatch();
    const { statuses } = useSelector((state: RootState) => state.siteAdmin);
    const [name, setName] = useState<string>("");
    const [changedStatuses, setChangedStatuses] = useState<ChangeStatusDataSet>({});
    const [newStatus, setNewStatus] = useState<Partial<WebApi.Entity.ChangeStatus>>(defaultNewStatus);

    const displayStatuses = useMemo(
        () => statuses && statuses.filter((status) => status.name.toLowerCase().includes(name.toLowerCase())),
        [name, statuses],
    );

    if (!displayStatuses || !statuses) {
        return <Spinner />;
    }

    const setUpdateData = (id: number, data: IndexedChange) => {
        const newChanged = { ...changedStatuses };

        if (!newChanged[id]) {
            newChanged[id] = data;
            return setChangedStatuses(newChanged);
        }

        const status = statuses.find((status) => status.id === id);

        Object.keys(data).forEach((key) => {
            const changedValue = data[key];
            const initialValue = status && status[key];

            if (initialValue === undefined) {
                return;
            }

            if (changedValue !== initialValue) {
                newChanged[id][key] = changedValue;
            } else {
                delete newChanged[id][key];

                if (Object.keys(newChanged[id]).length === 0) {
                    delete newChanged[id];
                }
            }
        });

        setChangedStatuses(newChanged);
    };

    const updateStatuses = () => {
        Object.keys(changedStatuses).forEach((strId) => {
            const id = Number(strId);
            dispatch(updateStatus({ id, data: changedStatuses[id] }));
        });

        setChangedStatuses({});
    };

    const newStatusValid = () => {
        for (const value of Object.values(newStatus)) {
            if (!value && value !== false) {
                return false;
            }
        }

        return true;
    };

    const addToNewStatus = (data: Partial<WebApi.Entity.ChangeStatus>) => {
        setNewStatus({
            ...newStatus,
            ...data,
        });
    };

    const saveStatus = () => {
        if (!newStatusValid()) {
            return;
        }

        const newStatusFull = newStatus as WebApi.Entity.ChangeStatus;

        dispatch(createStatus({ data: newStatusFull }));
        setNewStatus(defaultNewStatus);
    };

    const removeStatus = (id: number) => {
        dispatch(deleteStatus({ id }));
    };

    const _bulkStatuses = (data: WebApi.Entity.CSVChangeStatus[]) => {
        dispatch(bulkStatuses({ statuses: data, index }));
    };

    const getField = (object: WebApi.Entity.ChangeStatus, name: keyof WebApi.Entity.ChangeStatus) => {
        const changed: IndexedChange | undefined = changedStatuses[object.id];

        if (changed && changed[name]) {
            return changed[name];
        }

        return object[name];
    };

    return (
        <Tab.Pane>
            <Form style={{ marginBottom: 30 }}>
                <Input
                    value={name}
                    placeholder={t("search_by_name")}
                    icon="search"
                    style={{ width: 240 }}
                    onChange={(event, data) => setName(data.value)}
                />
            </Form>
            <DownloadCSV
                data={displayStatuses}
                headers={CSVHeaders.STATUS}
                fileName={FileNames.STATUSES_CSV}
                text={t("download_table")}
            />
            <ImportCSV text={t("import_table")} headers={CSVHeaders.STATUS} onGetData={_bulkStatuses} />
            {displayStatuses.length ? (
                <Button primary disabled={Object.keys(changedStatuses).length === 0} onClick={updateStatuses}>
                    {t("save_table")}
                </Button>
            ) : null}
            <Table celled className={styles.table}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3}>{t("name")}</Table.HeaderCell>
                        <Table.HeaderCell width={1}>{t("actions")}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {displayStatuses.length ? (
                        displayStatuses.map((status) => (
                            <Table.Row key={status.id}>
                                <Table.Cell width={3}>
                                    <Input
                                        fluid
                                        transparent
                                        defaultValue={getField(status, "name")}
                                        onChange={(event, data) => setUpdateData(status.id, { name: data.value })}
                                    />
                                </Table.Cell>
                                <Table.Cell width={1}>
                                    <Icon
                                        link
                                        name="trash"
                                        className={styles.danger}
                                        onClick={() => removeStatus(status.id)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <NoResults notCentered />
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell width={3}>
                            <Input
                                fluid
                                transparent
                                value={newStatus.name ?? ""}
                                onChange={(event, data) => addToNewStatus({ name: data.value })}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1}>
                            <Icon link name="plus" onClick={saveStatus} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Tab.Pane>
    );
};

export default StatusesTable;
