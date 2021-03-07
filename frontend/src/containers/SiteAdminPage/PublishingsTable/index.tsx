import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Input, Tab, Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { bulkPublishings, createPublishing, deletePublishing, updatePublishing } from "../logic/actions";
import RootState from "../../../typings/rootState";
import DownloadCSV from "../../../components/DownloadCSV";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import ImportCSV from "../../../components/ImportCSV";
import { TableProps } from "..";
import styles from "../site.module.scss";

interface IndexedChange extends Partial<WebApi.Entity.ChangePublishing> {
    [key: string]: any;
}

interface ChangePublishingDataSet {
    [key: number]: IndexedChange;
}

const PublishingsTable: React.FC<TableProps> = ({ index }) => {
    const { t } = useTranslation();
    const defaultNewPublishing: Partial<WebApi.Entity.ChangePublishing> = { name: "" };
    const dispatch = useDispatch();
    const { publishings } = useSelector((state: RootState) => state.siteAdmin);
    const [name, setName] = useState<string>("");
    const [changedPublishings, setChangedPublishings] = useState<ChangePublishingDataSet>({});
    const [newPublishing, setNewPublishing] = useState<Partial<WebApi.Entity.ChangePublishing>>(defaultNewPublishing);

    const displayPublishings = useMemo(
        () =>
            publishings &&
            publishings.filter((publishing) => publishing.name.toLowerCase().includes(name.toLowerCase())),
        [name, publishings],
    );

    if (!displayPublishings || !publishings) {
        return <Spinner />;
    }

    const setUpdateData = (id: number, data: IndexedChange) => {
        const newChanged = { ...changedPublishings };

        if (!newChanged[id]) {
            newChanged[id] = data;
            return setChangedPublishings(newChanged);
        }

        const publishing = publishings.find((publishing) => publishing.id === id);

        Object.keys(data).forEach((key) => {
            const changedValue = data[key];
            const initialValue = publishing && publishing[key];

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

        setChangedPublishings(newChanged);
    };

    const updatePublishings = () => {
        Object.keys(changedPublishings).forEach((strId) => {
            const id = Number(strId);
            dispatch(updatePublishing({ id, data: changedPublishings[id] }));
        });

        setChangedPublishings({});
    };

    const newPublishingValid = () => {
        for (const value of Object.values(newPublishing)) {
            if (!value && value !== false) {
                return false;
            }
        }

        return true;
    };

    const addToNewPublishing = (data: Partial<WebApi.Entity.ChangePublishing>) => {
        setNewPublishing({
            ...newPublishing,
            ...data,
        });
    };

    const savePublishing = () => {
        if (!newPublishingValid()) {
            return;
        }

        const newPublishingFull = newPublishing as WebApi.Entity.ChangePublishing;

        dispatch(createPublishing({ data: newPublishingFull }));
        setNewPublishing(defaultNewPublishing);
    };

    const removePublishing = (id: number) => {
        dispatch(deletePublishing({ id }));
    };

    const _bulkPublishings = (data: WebApi.Entity.CSVChangePublishing[]) => {
        dispatch(bulkPublishings({ publishings: data, index }));
    };

    const getField = (object: WebApi.Entity.ChangePublishing, name: keyof WebApi.Entity.ChangePublishing) => {
        const changed: IndexedChange | undefined = changedPublishings[object.id];

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
                data={displayPublishings}
                headers={CSVHeaders.PUBLISHING}
                fileName={FileNames.PUBLISHINGS_CSV}
                text={t("download_table")}
            />
            <ImportCSV text={t("import_table")} headers={CSVHeaders.PUBLISHING} onGetData={_bulkPublishings} />
            {displayPublishings.length ? (
                <Button primary disabled={Object.keys(changedPublishings).length === 0} onClick={updatePublishings}>
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
                    {displayPublishings.length ? (
                        displayPublishings.map((publishing) => (
                            <Table.Row key={publishing.id}>
                                <Table.Cell width={3}>
                                    <Input
                                        fluid
                                        transparent
                                        defaultValue={getField(publishing, "name")}
                                        onChange={(event, data) => setUpdateData(publishing.id, { name: data.value })}
                                    />
                                </Table.Cell>
                                <Table.Cell width={1}>
                                    <Icon
                                        link
                                        name="trash"
                                        className={styles.danger}
                                        onClick={() => removePublishing(publishing.id)}
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
                                value={newPublishing.name ?? ""}
                                onChange={(event, data) => addToNewPublishing({ name: data.value })}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1}>
                            <Icon link name="plus" onClick={savePublishing} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Tab.Pane>
    );
};

export default PublishingsTable;
