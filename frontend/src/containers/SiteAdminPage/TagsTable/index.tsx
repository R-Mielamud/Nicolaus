import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Form, Icon, Input, Tab, Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { bulkTags, createTag, deleteTag, updateTag } from "../logic/actions";
import RootState from "../../../typings/rootState";
import DownloadCSV from "../../../components/DownloadCSV";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import ImportCSV from "../../../components/ImportCSV";
import { TableProps } from "..";
import styles from "../site.module.scss";
import { useMemo } from "react";

interface IndexedChange extends Partial<WebApi.Entity.ChangeTag> {
    [key: string]: any;
}

interface ChangeTagDataSet {
    [key: number]: IndexedChange;
}

interface SelectOption {
    key: number;
    value: number;
    text: string;
}

const TagsTable: React.FC<TableProps> = ({ index }) => {
    const { t } = useTranslation();
    const defaultNewTag: Partial<WebApi.Entity.ChangeTag> = { name: "", group: undefined };
    const dispatch = useDispatch();
    const { tags, tagGroups } = useSelector((state: RootState) => state.siteAdmin);
    const [name, setName] = useState<string>("");
    const [changedTags, setChangedTags] = useState<ChangeTagDataSet>({});
    const [newTag, setNewTag] = useState<Partial<WebApi.Entity.ChangeTag>>(defaultNewTag);

    const displayTags = useMemo(
        () => tags && tags.filter((tag) => tag.name.toLowerCase().includes(name.toLowerCase())),
        [name, tags],
    );

    const groupOptions: SelectOption[] | undefined = useMemo(
        () => tagGroups && tagGroups.map((group) => ({ value: group.id, key: group.id, text: group.name })),
        [tagGroups],
    );

    if (!displayTags || !groupOptions || !tags) {
        return <Spinner />;
    }

    const setUpdateData = (id: number, data: IndexedChange) => {
        const newChanged = { ...changedTags };

        if (!newChanged[id]) {
            newChanged[id] = data;
            return setChangedTags(newChanged);
        }

        const tag = tags.find((a) => a.id === id);

        Object.keys(data).forEach((key) => {
            const changedValue = data[key];
            const initialValue = tag && tag[key];

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

        setChangedTags(newChanged);
    };

    const updateTags = () => {
        Object.keys(changedTags).forEach((strId) => {
            const id = Number(strId);
            dispatch(updateTag({ id, data: changedTags[id] }));
        });

        setChangedTags({});
    };

    const newTagValid = () => {
        for (const value of Object.values(newTag)) {
            if (!value && value !== false) {
                return false;
            }
        }

        return true;
    };

    const addToNewTag = (data: Partial<WebApi.Entity.ChangeTag>) => {
        setNewTag({
            ...newTag,
            ...data,
        });
    };

    const saveTag = () => {
        if (!newTagValid()) {
            return;
        }

        const newTagFull = newTag as WebApi.Entity.ChangeTag;

        dispatch(createTag({ data: newTagFull }));
        setNewTag(defaultNewTag);
    };

    const removeTag = (id: number) => {
        dispatch(deleteTag({ id }));
    };

    const _bulkTags = (data: WebApi.Entity.CSVChangeTag[]) => {
        dispatch(bulkTags({ tags: data, index }));
    };

    const getField = (object: WebApi.Entity.ChangeTag, name: keyof WebApi.Entity.ChangeTag) => {
        const changed: IndexedChange | undefined = changedTags[object.id];

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
            {displayTags.length ? (
                <>
                    <DownloadCSV
                        data={displayTags}
                        headers={CSVHeaders.TAG}
                        fileName={FileNames.TAGS_CSV}
                        text={t("download_table")}
                    />
                    <ImportCSV text={t("import_table")} headers={CSVHeaders.TAG} onGetData={_bulkTags} />
                    <Button primary disabled={Object.keys(changedTags).length === 0} onClick={updateTags}>
                        {t("save_table")}
                    </Button>
                    <Table celled className={styles.table}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={3}>{t("name")}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{t("tag_group")}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{t("actions")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {displayTags.map((tag) => (
                                <Table.Row key={tag.id}>
                                    <Table.Cell width={3}>
                                        <Input
                                            fluid
                                            transparent
                                            defaultValue={getField(tag, "name")}
                                            onChange={(event, data) => setUpdateData(tag.id, { name: data.value })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={2}>
                                        <Dropdown
                                            fluid
                                            options={groupOptions}
                                            defaultValue={getField(tag, "group")}
                                            onChange={(event, data) =>
                                                setUpdateData(tag.id, { group: data.value as number | undefined })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={1}>
                                        <Icon
                                            link
                                            name="trash"
                                            className={styles.danger}
                                            onClick={() => removeTag(tag.id)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell width={3}>
                                    <Input
                                        fluid
                                        transparent
                                        value={newTag.name ?? ""}
                                        onChange={(event, data) => addToNewTag({ name: data.value })}
                                    />
                                </Table.HeaderCell>
                                <Table.HeaderCell width={2}>
                                    <Dropdown
                                        fluid
                                        options={groupOptions}
                                        value={newTag.group ?? ""}
                                        onChange={(event, data) =>
                                            addToNewTag({ group: data.value as number | undefined })
                                        }
                                    />
                                </Table.HeaderCell>
                                <Table.HeaderCell width={1}>
                                    <Icon link name="plus" onClick={saveTag} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </>
            ) : (
                <NoResults />
            )}
        </Tab.Pane>
    );
};

export default TagsTable;
