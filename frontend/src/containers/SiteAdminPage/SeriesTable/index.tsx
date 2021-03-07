import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Input, Tab, Table, Dropdown } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { bulkSeries, createSeries, deleteSeries, updateSeries } from "../logic/actions";
import RootState from "../../../typings/rootState";
import DownloadCSV from "../../../components/DownloadCSV";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import ImportCSV from "../../../components/ImportCSV";
import { TableProps } from "..";
import styles from "../site.module.scss";

interface IndexedChange extends Partial<WebApi.Entity.ChangeSeries> {
    [key: string]: any;
}

interface ChangeSeriesDataSet {
    [key: number]: IndexedChange;
}

interface SelectOption {
    key: number;
    value: number;
    text: string;
}

const SeriesTable: React.FC<TableProps> = ({ index }) => {
    const { t } = useTranslation();
    const defaultNewSeries: Partial<WebApi.Entity.ChangeSeries> = { chosen: false, name: "" };
    const dispatch = useDispatch();
    const { series: seriesArr, publishings } = useSelector((state: RootState) => state.siteAdmin);
    const [name, setName] = useState<string>("");
    const [changedSeries, setChangedSeries] = useState<ChangeSeriesDataSet>({});
    const [newSeries, setNewSeries] = useState<Partial<WebApi.Entity.ChangeSeries>>(defaultNewSeries);

    const displaySeries = useMemo(
        () => seriesArr && seriesArr.filter((series) => series.name.toLowerCase().includes(name.toLowerCase())),
        [seriesArr, name],
    );

    const publishingOptions: SelectOption[] | undefined = useMemo(
        () =>
            publishings &&
            publishings.map((publishing) => ({ value: publishing.id, key: publishing.id, text: publishing.name })),
        [publishings],
    );

    if (!displaySeries || !seriesArr || !publishingOptions) {
        return <Spinner />;
    }

    const setUpdateData = (id: number, data: IndexedChange) => {
        const newChanged = { ...changedSeries };

        if (!newChanged[id]) {
            newChanged[id] = data;
            return setChangedSeries(newChanged);
        }

        const series = seriesArr.find((series) => series.id === id);

        Object.keys(data).forEach((key) => {
            const changedValue = data[key];
            const initialValue = series && series[key];

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

        setChangedSeries(newChanged);
    };

    const _updateSeries = () => {
        Object.keys(changedSeries).forEach((strId) => {
            const id = Number(strId);
            dispatch(updateSeries({ id, data: changedSeries[id] }));
        });

        setChangedSeries({});
    };

    const newSeriesValid = () => {
        for (const value of Object.values(newSeries)) {
            if (!value && value !== false) {
                return false;
            }
        }

        return true;
    };

    const addToNewSeries = (data: Partial<WebApi.Entity.ChangeSeries>) => {
        setNewSeries({
            ...newSeries,
            ...data,
        });
    };

    const saveSeries = () => {
        if (!newSeriesValid()) {
            return;
        }

        const newSeriesFull = newSeries as WebApi.Entity.ChangeSeries;

        dispatch(createSeries({ data: newSeriesFull }));
        setNewSeries(defaultNewSeries);
    };

    const removeSeries = (id: number) => {
        dispatch(deleteSeries({ id }));
    };

    const _bulkSeries = (data: WebApi.Entity.CSVChangeSeries[]) => {
        dispatch(bulkSeries({ series: data, index }));
    };

    const getField = (object: WebApi.Entity.ChangeSeries, name: keyof WebApi.Entity.ChangeSeries) => {
        const changed: IndexedChange | undefined = changedSeries[object.id];

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
            {displaySeries.length ? (
                <>
                    <DownloadCSV
                        data={displaySeries}
                        headers={CSVHeaders.SERIES}
                        fileName={FileNames.SERIES_CSV}
                        text={t("download_table")}
                    />
                    <ImportCSV text={t("import_table")} headers={CSVHeaders.SERIES} onGetData={_bulkSeries} />
                    <Button primary disabled={Object.keys(changedSeries).length === 0} onClick={_updateSeries}>
                        {t("save_table")}
                    </Button>
                    <Table celled className={styles.table}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width={3}>{t("name")}</Table.HeaderCell>
                                <Table.HeaderCell width={2}>{t("publishing")}</Table.HeaderCell>
                                <Table.HeaderCell width={1}>{t("actions")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {displaySeries.map((series) => (
                                <Table.Row key={series.id}>
                                    <Table.Cell width={3}>
                                        <Input
                                            fluid
                                            transparent
                                            defaultValue={getField(series, "name")}
                                            onChange={(event, data) => setUpdateData(series.id, { name: data.value })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={2}>
                                        <Dropdown
                                            fluid
                                            options={publishingOptions}
                                            defaultValue={getField(series, "publishing")}
                                            scrolling
                                            onChange={(event, data) =>
                                                setUpdateData(series.id, {
                                                    publishing: data.value as number | undefined,
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={1}>
                                        <Icon
                                            link
                                            name="trash"
                                            className={styles.danger}
                                            onClick={() => removeSeries(series.id)}
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
                                        value={newSeries.name ?? ""}
                                        onChange={(event, data) => addToNewSeries({ name: data.value })}
                                    />
                                </Table.HeaderCell>
                                <Table.HeaderCell width={2}>
                                    <Dropdown
                                        fluid
                                        options={publishingOptions}
                                        value={newSeries.publishing ?? ""}
                                        floating
                                        upward
                                        scrolling
                                        clearable
                                        onChange={(event, data) =>
                                            addToNewSeries({ publishing: data.value as number | undefined })
                                        }
                                    />
                                </Table.HeaderCell>
                                <Table.HeaderCell width={1}>
                                    <Icon link name="plus" onClick={saveSeries} />
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

export default SeriesTable;
