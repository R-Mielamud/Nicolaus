import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Form, Icon, Input, Tab, Table } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { bulkAuthors, createAuthor, deleteAuthor, updateAuthor } from "../logic/actions";
import RootState from "../../../typings/rootState";
import DownloadCSV from "../../../components/DownloadCSV";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import ImportCSV from "../../../components/ImportCSV";
import { TableProps } from "..";
import styles from "../site.module.scss";

interface IndexedChange extends Partial<WebApi.Entity.ChangeAuthor> {
    [key: string]: any;
}

interface ChangeAuthorDataSet {
    [key: number]: IndexedChange;
}

const AuthorsTable: React.FC<TableProps> = ({ index }) => {
    const { t } = useTranslation();
    const defaultNewAuthor: Partial<WebApi.Entity.ChangeAuthor> = { chosen: false, name: "" };
    const dispatch = useDispatch();
    const { authors } = useSelector((state: RootState) => state.siteAdmin);
    const [name, setName] = useState<string>("");
    const [changedAuthors, setChangedAuthors] = useState<ChangeAuthorDataSet>({});
    const [newAuthor, setNewAuthor] = useState<Partial<WebApi.Entity.ChangeAuthor>>(defaultNewAuthor);

    const displayAuthors = useMemo(
        () => authors && authors.filter((author) => author.name.toLowerCase().includes(name.toLowerCase())),
        [authors, name],
    );

    if (!displayAuthors || !authors) {
        return <Spinner />;
    }

    const setUpdateData = (id: number, data: IndexedChange) => {
        const newChanged = { ...changedAuthors };

        if (!newChanged[id]) {
            newChanged[id] = data;
            return setChangedAuthors(newChanged);
        }

        const author = authors.find((author) => author.id === id);

        Object.keys(data).forEach((key) => {
            const changedValue = data[key];
            const initialValue = author && author[key];

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

        setChangedAuthors(newChanged);
    };

    const updateAuthors = () => {
        Object.keys(changedAuthors).forEach((strId) => {
            const id = Number(strId);
            dispatch(updateAuthor({ id, data: changedAuthors[id] }));
        });

        setChangedAuthors({});
    };

    const newAuthorValid = () => {
        for (const value of Object.values(newAuthor)) {
            if (!value && value !== false) {
                return false;
            }
        }

        return true;
    };

    const addToNewAuthor = (data: Partial<WebApi.Entity.ChangeAuthor>) => {
        setNewAuthor({
            ...newAuthor,
            ...data,
        });
    };

    const saveAuthor = () => {
        if (!newAuthorValid()) {
            return;
        }

        const newAuthorFull = newAuthor as WebApi.Entity.ChangeAuthor;

        dispatch(createAuthor({ data: newAuthorFull }));
        setNewAuthor(defaultNewAuthor);
    };

    const removeAuthor = (id: number) => {
        dispatch(deleteAuthor({ id }));
    };

    const _bulkAuthors = (data: WebApi.Entity.CSVChangeAuthor[]) => {
        dispatch(bulkAuthors({ authors: data, index }));
    };

    const getField = (object: WebApi.Entity.ChangeAuthor, name: keyof WebApi.Entity.ChangeAuthor) => {
        const changed: IndexedChange | undefined = changedAuthors[object.id];

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
                data={displayAuthors}
                headers={CSVHeaders.AUTHOR}
                fileName={FileNames.AUTHORS_CSV}
                text={t("download_table")}
            />
            <ImportCSV text={t("import_table")} headers={CSVHeaders.AUTHOR} onGetData={_bulkAuthors} />
            {displayAuthors.length ? (
                <Button primary disabled={Object.keys(changedAuthors).length === 0} onClick={updateAuthors}>
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
                    {displayAuthors.length ? (
                        displayAuthors.map((author) => (
                            <Table.Row key={author.id}>
                                <Table.Cell width={3}>
                                    <Input
                                        fluid
                                        transparent
                                        defaultValue={getField(author, "name")}
                                        onChange={(event, data) => setUpdateData(author.id, { name: data.value })}
                                    />
                                </Table.Cell>
                                <Table.Cell width={2}>
                                    <Checkbox
                                        toggle
                                        defaultChecked={getField(author, "chosen")}
                                        onChange={(event, data) => setUpdateData(author.id, { chosen: data.checked })}
                                    />
                                </Table.Cell>
                                <Table.Cell width={1}>
                                    <Icon
                                        link
                                        name="trash"
                                        className={styles.danger}
                                        onClick={() => removeAuthor(author.id)}
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
                                value={newAuthor.name ?? ""}
                                onChange={(event, data) => addToNewAuthor({ name: data.value })}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell width={2}>
                            <Checkbox
                                toggle
                                checked={newAuthor.chosen ?? false}
                                onChange={(event, data) => addToNewAuthor({ chosen: data.checked })}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1}>
                            <Icon link name="plus" onClick={saveAuthor} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Tab.Pane>
    );
};

export default AuthorsTable;
