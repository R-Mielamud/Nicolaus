import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Input, Icon } from "semantic-ui-react";
import RootState from "../../typings/rootState";
import { loadBooks, setBooksFilter } from "../CatalogPage/logic/actions";
import AuthorsFilter from "./AuthorsFilter";
import PublishingsFilter from "./PublishingsFilter";
import StatusesFilter from "./StatusesFilter";
import TagsFilter from "./TagsFilter";

interface OnSelected {
    (value: number, selected: boolean): void;
}

export interface FilterProps {
    onSelect: (id: number, selected: boolean) => void;
    currentSelected: number[];
}

const CatalogFiltersBar: React.FC = () => {
    const { booksFilter } = useSelector((state: RootState) => state.catalog);
    const dispatch = useDispatch();

    const updateFilter = (filter: Partial<WebApi.Specific.BooksFilter>) => {
        if (Object.keys(filter).length) {
            dispatch(setBooksFilter({ filter }));
        }
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
    const clear = () => dispatch(dispatch(setBooksFilter({ clear: true, filter: {} })));

    return (
        <div>
            <Button.Group size="mini">
                <Button primary onClick={() => dispatch(loadBooks({}))} icon labelPosition="left">
                    <Icon name="check" />
                    Apply
                </Button>
                <Button.Or />
                <Button onClick={() => clear()}>Clear all filters</Button>
            </Button.Group>
            <Input
                icon="search"
                placeholder="Search book..."
                fluid
                size="mini"
                value={booksFilter.search ?? ""}
                style={{ marginTop: 10 }}
                onChange={(event, data) => updateFilter({ search: data.value })}
            />
            <Header dividing as="h3">
                Catalog
            </Header>
            <StatusesFilter onSelect={onStatusSelect} currentSelected={booksFilter.statuses} />
            <PublishingsFilter onSelect={onPublishingSelect} currentSelected={booksFilter.publishings} />
            <AuthorsFilter onSelect={onAuthorSelect} currentSelected={booksFilter.authors} />
            <Header dividing as="h3">
                Tags
            </Header>
            <TagsFilter onSelect={onTagSelect} currentSelected={booksFilter.tags} />
        </div>
    );
};

export default CatalogFiltersBar;
