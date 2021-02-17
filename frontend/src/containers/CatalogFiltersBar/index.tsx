import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Input, Icon } from "semantic-ui-react";
import RootState from "../../typings/rootState";
import { loadBooks, setBooksFilter } from "../CatalogPage/logic/actions";
import AuthorsFilter from "./AuthorsFilter";
import PublishingsFilter from "./PublishingsFilter";
import StatusesFilter from "./StatusesFilter";
import TagsFilter from "./TagsFilter";
import styles from "./filters.module.scss";

interface OnSelected {
    (value: number, selected: boolean): void;
}

export interface FilterProps {
    onSelect: (id: number, selected: boolean) => void;
    currentSelected: number[];
}

const CatalogFiltersBar: React.FC = () => {
    const { t } = useTranslation();
    const { booksFilter } = useSelector((state: RootState) => state.catalog);
    const dispatch = useDispatch();

    const updateFilter = (filter: Partial<WebApi.Specific.BooksFilter>) => {
        dispatch(setBooksFilter({ filter }));
    };

    const baseOnSelect = (field: "tags" | "publishings" | "authors" | "statuses", id: number, selected: boolean) => {
        const newField = [...booksFilter[field]];

        if (selected) {
            newField.push(id);
        } else {
            const index = newField.findIndex((suspectedId) => suspectedId === id);
            newField.splice(index, 1);
        }

        updateFilter({ [field]: newField });
    };

    const onTagSelect: OnSelected = (value, selected) => baseOnSelect("tags", value, selected);
    const onAuthorSelect: OnSelected = (value, selected) => baseOnSelect("authors", value, selected);
    const onPublishingSelect: OnSelected = (value, selected) => baseOnSelect("publishings", value, selected);
    const onStatusSelect: OnSelected = (value, selected) => baseOnSelect("statuses", value, selected);
    const load = () => dispatch(loadBooks({}));

    const clear = () => {
        dispatch(setBooksFilter({ clear: true, filter: {} }));
        load();
    };

    return (
        <>
            <div className={styles.sticky}>
                <Button.Group size="mini">
                    <Button primary onClick={load} icon labelPosition="left">
                        <Icon name="check" />
                        {t("apply")}
                    </Button>
                    <Button.Or text={t("or_l") as string} />
                    <Button onClick={() => clear()}>{t("clear_filters")}</Button>
                </Button.Group>
                <Input
                    icon="search"
                    placeholder={t("search_book")}
                    fluid
                    size="mini"
                    value={booksFilter.search ?? ""}
                    style={{ marginTop: 10 }}
                    onChange={(event, data) => updateFilter({ search: data.value })}
                />
            </div>
            <Header dividing as="h3">
                {t("catalog")}
            </Header>
            <StatusesFilter onSelect={onStatusSelect} currentSelected={booksFilter.statuses} />
            <PublishingsFilter onSelect={onPublishingSelect} currentSelected={booksFilter.publishings} />
            <AuthorsFilter onSelect={onAuthorSelect} currentSelected={booksFilter.authors} />
            <Header dividing as="h3">
                {t("tags")}
            </Header>
            <TagsFilter onSelect={onTagSelect} currentSelected={booksFilter.tags} />
        </>
    );
};

export default CatalogFiltersBar;
