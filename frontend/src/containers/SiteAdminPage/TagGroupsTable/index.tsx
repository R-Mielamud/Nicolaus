import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Icon, Input, Tab, Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { bulkTagGroups, createTagGroup, deleteTagGroup, updateTagGroup } from "../logic/actions";
import RootState from "../../../typings/rootState";
import DownloadCSV from "../../../components/DownloadCSV";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import ImportCSV from "../../../components/ImportCSV";
import { TableProps } from "..";
import styles from "../site.module.scss";

interface IndexedChange extends Partial<WebApi.Entity.ChangeTagGroup> {
    [key: string]: any;
}

interface ChangeTagGroupDataSet {
    [key: number]: IndexedChange;
}

const TagGroupsTable: React.FC<TableProps> = ({ index }) => {
    const { t } = useTranslation();
    const defaultNewTagGroup: Partial<WebApi.Entity.ChangeTagGroup> = { chosen: false, name: "" };
    const dispatch = useDispatch();
    const { tagGroups } = useSelector((state: RootState) => state.siteAdmin);
    const [name, setName] = useState<string>("");
    const [changedTagGroups, setChangedTagGroups] = useState<ChangeTagGroupDataSet>({});
    const [newGroup, setNewGroup] = useState<Partial<WebApi.Entity.ChangeTagGroup>>(defaultNewTagGroup);

    const displayGroups = useMemo(
        () => tagGroups && tagGroups.filter((group) => group.name.toLowerCase().includes(name.toLowerCase())),
        [tagGroups, name],
    );

    if (!displayGroups || !tagGroups) {
        return <Spinner />;
    }

    const setUpdateData = (id: number, data: IndexedChange) => {
        const newChanged = { ...changedTagGroups };

        if (!newChanged[id]) {
            newChanged[id] = data;
            return setChangedTagGroups(newChanged);
        }

        const group = tagGroups.find((group) => group.id === id);

        Object.keys(data).forEach((key) => {
            const changedValue = data[key];
            const initialValue = group && group[key];

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

        setChangedTagGroups(newChanged);
    };

    const updateGroups = () => {
        Object.keys(changedTagGroups).forEach((strId) => {
            const id = Number(strId);
            dispatch(updateTagGroup({ id, data: changedTagGroups[id] }));
        });

        setChangedTagGroups({});
    };

    const newTagGroupValid = () => {
        for (const value of Object.values(newGroup)) {
            if (!value && value !== false) {
                return false;
            }
        }

        return true;
    };

    const addToNewGroup = (data: Partial<WebApi.Entity.ChangeTagGroup>) => {
        setNewGroup({
            ...newGroup,
            ...data,
        });
    };

    const saveGroup = () => {
        if (!newTagGroupValid()) {
            return;
        }

        const newGroupFull = newGroup as WebApi.Entity.ChangeTagGroup;

        dispatch(createTagGroup({ data: newGroupFull }));
        setNewGroup(defaultNewTagGroup);
    };

    const removeTagGroups = (id: number) => {
        dispatch(deleteTagGroup({ id }));
    };

    const bulkGroups = (data: WebApi.Entity.CSVChangeTagGroup[]) => {
        dispatch(bulkTagGroups({ tagGroups: data, index }));
    };

    const getField = (object: WebApi.Entity.ChangeTagGroup, name: keyof WebApi.Entity.ChangeTagGroup) => {
        const changed: IndexedChange | undefined = changedTagGroups[object.id];

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
                data={displayGroups}
                headers={CSVHeaders.TAG_GROUP}
                fileName={FileNames.TAG_GROUPS_CSV}
                text={t("download_table")}
            />
            <ImportCSV text={t("import_table")} headers={CSVHeaders.TAG_GROUP} onGetData={bulkGroups} />
            {displayGroups.length ? (
                <Button primary disabled={Object.keys(changedTagGroups).length === 0} onClick={updateGroups}>
                    {t("save_table")}
                </Button>
            ) : null}
            <Table celled className={styles.table}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3}>{t("name")}</Table.HeaderCell>
                        <Table.HeaderCell width={2}>{t("chosen")}</Table.HeaderCell>
                        <Table.HeaderCell width={1}>{t("actions")}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {displayGroups.length ? (
                        displayGroups.map((group) => (
                            <Table.Row key={group.id}>
                                <Table.Cell width={3}>
                                    <Input
                                        fluid
                                        transparent
                                        defaultValue={getField(group, "name")}
                                        onChange={(event, data) => setUpdateData(group.id, { name: data.value })}
                                    />
                                </Table.Cell>
                                <Table.Cell width={2}>
                                    <Checkbox
                                        toggle
                                        defaultChecked={getField(group, "chosen")}
                                        onChange={(event, data) => setUpdateData(group.id, { chosen: data.checked })}
                                    />
                                </Table.Cell>
                                <Table.Cell width={1}>
                                    <Icon
                                        link
                                        name="trash"
                                        className={styles.danger}
                                        onClick={() => removeTagGroups(group.id)}
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
                                value={newGroup.name ?? ""}
                                onChange={(event, data) => addToNewGroup({ name: data.value })}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell width={2}>
                            <Checkbox
                                toggle
                                checked={newGroup.chosen ?? false}
                                onChange={(event, data) => addToNewGroup({ chosen: data.checked })}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1}>
                            <Icon link name="plus" onClick={saveGroup} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Tab.Pane>
    );
};

export default TagGroupsTable;
