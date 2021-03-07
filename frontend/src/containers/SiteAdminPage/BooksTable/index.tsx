import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Dropdown, Form, Icon, Input, Loader, Modal, Tab, Table, TextArea } from "semantic-ui-react";
import Spinner from "../../../components/common/Spinner";
import NoResults from "../../../components/NoResults";
import { bulkBooks, createBook, deleteBook, loadAdminBooks, setBooksFilter, updateBook } from "../logic/actions";
import RootState from "../../../typings/rootState";
import DownloadCSV from "../../../components/DownloadCSV";
import { CSVHeaders } from "../../../constants/CSVHeaders";
import { FileNames } from "../../../constants/FileNames";
import ImportCSV from "../../../components/ImportCSV";
import { TableProps } from "..";
import _ from "lodash";
import MaskedFileInput from "../../../components/common/MaskedFileInput";
import InfiniteScroller from "../../../components/InfiniteScroller";
import * as booksService from "../../../services/books.service";
import styles from "../site.module.scss";

interface IndexedChange extends Partial<WebApi.Entity.ServerChangeBook> {
    [key: string]: any;
}

interface ChangeBookDataSet {
    [key: number]: IndexedChange;
}

interface SelectOption {
    key: number;
    value: number;
    text: string;
}

const BooksTable: React.FC<TableProps> = ({ index }) => {
    const { t } = useTranslation();
    const fileFields = ["image"];
    const nullableFields = ["status", "series"];

    const defaultNewBook: Partial<WebApi.Entity.ServerChangeBook> = {
        chosen: false,
        title: "",
        description: "",
        status: undefined,
        image: undefined,
        authors: [],
        publishing: undefined,
        series: undefined,
        isbn: "",
        orig_price: 0,
        discount: 0,
        in_stock: 0,
        pages_count: 0,
        paper_type: "",
        tags: [],
    };

    const dispatch = useDispatch();

    const {
        books,
        hasMoreBooks,
        loadingBooks,
        statuses,
        authors,
        publishings,
        series,
        tags,
        booksFilter,
    } = useSelector((state: RootState) => state.siteAdmin);

    const [changedBooks, setChangedBooks] = useState<ChangeBookDataSet>({});
    const [newBook, setNewBook] = useState<Partial<WebApi.Entity.ServerChangeBook>>(defaultNewBook);
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

    const statusOptions: SelectOption[] | undefined = useMemo(
        () => statuses && statuses.map((status) => ({ value: status.id, key: status.id, text: status.name })),
        [statuses],
    );

    const authorOptions: SelectOption[] | undefined = useMemo(
        () => authors && authors.map((author) => ({ value: author.id, key: author.id, text: author.name })),
        [authors],
    );

    const publishingOptions: SelectOption[] | undefined = useMemo(
        () =>
            publishings &&
            publishings.map((publishing) => ({ value: publishing.id, key: publishing.id, text: publishing.name })),
        [publishings],
    );

    const seriesOptions: SelectOption[] | undefined = useMemo(
        () => series && series.map((series) => ({ value: series.id, key: series.id, text: series.name })),
        [series],
    );

    const tagOptions: SelectOption[] | undefined = useMemo(
        () => tags && tags.map((tag) => ({ value: tag.id, key: tag.id, text: tag.name })),
        [tags],
    );

    if (!books || !books || !statusOptions || !authorOptions || !publishingOptions || !seriesOptions || !tagOptions) {
        return <Spinner />;
    }

    const loadBooks = (closeFilters: boolean = false) => {
        if (closeFilters) {
            setFiltersOpen(false);
        }

        dispatch(loadAdminBooks({}));
    };

    const setUpdateData = (id: number, data: IndexedChange) => {
        const newChanged = { ...changedBooks };

        if (!newChanged[id]) {
            newChanged[id] = data;
            return setChangedBooks(newChanged);
        }

        const book = books.find((book) => book.id === id);

        Object.keys(data).forEach((key) => {
            const changedValue = data[key];
            const initialValue = book && book[key];

            if (initialValue === undefined) {
                return;
            }

            const isNull = changedValue === undefined || changedValue === null;
            const nullFile = fileFields.includes(changedValue) && isNull;
            const sameAsDefault = _.isEqual(changedValue, initialValue);

            if (!sameAsDefault && !nullFile) {
                newChanged[id][key] = changedValue;
            } else {
                delete newChanged[id][key];

                if (Object.keys(newChanged[id]).length === 0) {
                    delete newChanged[id];
                }
            }
        });

        setChangedBooks(newChanged);
    };

    const updateBooks = () => {
        Object.keys(changedBooks).forEach((strId) => {
            const id = Number(strId);
            dispatch(updateBook({ id, data: changedBooks[id] }));
        });

        setChangedBooks({});
    };

    const newBookValid = () => {
        for (const [key, value] of Object.entries(newBook)) {
            const falseButValue = value === false || value === 0;

            if (!value && !falseButValue && !nullableFields.includes(key)) {
                return false;
            }
        }

        return true;
    };

    const addToNewBook = (data: Partial<WebApi.Entity.ServerChangeBook>) => {
        setNewBook({
            ...newBook,
            ...data,
        });
    };

    const saveBook = () => {
        if (!newBookValid()) {
            return;
        }

        const newBookFull = newBook as WebApi.Entity.ServerChangeBook;

        dispatch(createBook({ data: newBookFull }));
        setNewBook(defaultNewBook);
    };

    const removeBook = (id: number) => {
        dispatch(deleteBook({ id }));
    };

    const _bulkBooks = (data: WebApi.Entity.CSVChangeBook[]) => {
        dispatch(bulkBooks({ books: data, index }));
    };

    const getField = (object: WebApi.Entity.ChangeBook, title: keyof WebApi.Entity.ChangeBook) => {
        const changed: IndexedChange | undefined = changedBooks[object.id];

        if (changed && changed[title]) {
            return changed[title];
        }

        return object[title];
    };

    const _getFname = (path: string) => {
        const parts = path.split("/");
        const index = parts.length - 1;

        return parts[index];
    };

    const getImageName = (id: number, path: string): string => {
        const changed: IndexedChange | undefined = changedBooks[id];

        if (changed && changed.image) {
            return _getFname(changed.image.name);
        }

        return _getFname(path);
    };

    const updateFilter = (filter: Partial<WebApi.Specific.BooksFilter>) => {
        dispatch(setBooksFilter({ filter }));
    };

    const clearFilters = () => {
        dispatch(setBooksFilter({ filter: {}, clear: true }));
        loadBooks(true);
    };

    return (
        <Tab.Pane>
            <Modal
                trigger={<Button secondary>{t("open_filters")}</Button>}
                openOnTriggerClick
                closeIcon
                closeOnEscape
                open={filtersOpen}
                onOpen={() => setFiltersOpen(true)}
                onClose={() => setFiltersOpen(false)}
            >
                <Modal.Header>{t("filters")}</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            value={booksFilter.search ?? ""}
                            placeholder={t("search_book")}
                            icon="search"
                            onChange={(event, data) => updateFilter({ search: data.value })}
                        />
                        <Form.Select
                            placeholder={t("authors")}
                            options={authorOptions}
                            multiple
                            value={booksFilter.authors ?? []}
                            onChange={(event, data) => updateFilter({ authors: data.value as number[] | undefined })}
                        />
                        <Form.Select
                            placeholder={t("publishings")}
                            options={publishingOptions}
                            multiple
                            value={booksFilter.publishings ?? []}
                            onChange={(event, data) =>
                                updateFilter({ publishings: data.value as number[] | undefined })
                            }
                        />
                        <Form.Select
                            placeholder={t("series_p")}
                            options={seriesOptions}
                            multiple
                            value={booksFilter.series ?? []}
                            onChange={(event, data) => updateFilter({ series: data.value as number[] | undefined })}
                        />
                        <Form.Select
                            placeholder={t("tags")}
                            options={tagOptions}
                            multiple
                            value={booksFilter.tags ?? []}
                            onChange={(event, data) => updateFilter({ tags: data.value as number[] | undefined })}
                        />
                        <Form.Select
                            placeholder={t("statuses")}
                            options={statusOptions}
                            multiple
                            value={booksFilter.statuses ?? []}
                            onChange={(event, data) => updateFilter({ statuses: data.value as number[] | undefined })}
                        />
                        <Button primary onClick={() => loadBooks(true)}>
                            {t("apply")}
                        </Button>
                        <Button secondary onClick={clearFilters}>
                            {t("clear_filters")}
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
            <DownloadCSV
                data={() => booksService.getAdminBooks(booksFilter, true).then((result) => result.books)}
                headers={CSVHeaders.BOOK}
                fileName={FileNames.BOOKS_CSV}
                text={t("download_table")}
            />
            <ImportCSV text={t("import_table")} headers={CSVHeaders.BOOK} onGetData={_bulkBooks} />
            {books.length ? (
                <Button primary disabled={Object.keys(changedBooks).length === 0} onClick={updateBooks}>
                    {t("save_table")}
                </Button>
            ) : null}
            <InfiniteScroller
                className={styles.tableContainer}
                loading={loadingBooks}
                hasMore={hasMoreBooks}
                loader={<Loader active inline="centered" size="massive" />}
                loadMore={() => dispatch(loadAdminBooks({ more: true }))}
            >
                <Table celled className={styles.booksTable}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={3}>{t("title")}</Table.HeaderCell>
                            <Table.HeaderCell width={5}>{t("description")}</Table.HeaderCell>
                            <Table.HeaderCell width={3}>{t("image")}</Table.HeaderCell>
                            <Table.HeaderCell width={2}>{t("status")}</Table.HeaderCell>
                            <Table.HeaderCell width={4}>{t("authors")}</Table.HeaderCell>
                            <Table.HeaderCell width={3}>{t("publishings")}</Table.HeaderCell>
                            <Table.HeaderCell width={3}>{t("series")}</Table.HeaderCell>
                            <Table.HeaderCell width={3}>ISBN</Table.HeaderCell>
                            <Table.HeaderCell width={2}>{t("price")}</Table.HeaderCell>
                            <Table.HeaderCell width={2}>{t("discount")}</Table.HeaderCell>
                            <Table.HeaderCell width={2}>{t("in_stock")}</Table.HeaderCell>
                            <Table.HeaderCell width={2}>{t("pages_count")}</Table.HeaderCell>
                            <Table.HeaderCell width={3}>{t("paper_type")}</Table.HeaderCell>
                            <Table.HeaderCell width={1}>{t("chosen")}</Table.HeaderCell>
                            <Table.HeaderCell width={4}>{t("tags")}</Table.HeaderCell>
                            <Table.HeaderCell width={1}>{t("actions")}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {books.length ? (
                            books.map((book) => (
                                <Table.Row key={book.id}>
                                    <Table.Cell width={3}>
                                        <Input
                                            fluid
                                            transparent
                                            value={getField(book, "title")}
                                            onChange={(event, data) => setUpdateData(book.id, { title: data.value })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={5}>
                                        <Form>
                                            <TextArea
                                                className={styles.textArea}
                                                value={getField(book, "description")}
                                                onChange={(event, data) =>
                                                    setUpdateData(book.id, {
                                                        description: data.value as string | undefined,
                                                    })
                                                }
                                            />
                                        </Form>
                                    </Table.Cell>
                                    <Table.Cell width={3}>
                                        <MaskedFileInput
                                            text={t("select_file")}
                                            allow=".jpeg, .png, .jpg"
                                            onUpload={(file) => setUpdateData(book.id, { image: file })}
                                        />
                                        <div>{getImageName(book.id, book.image)}</div>
                                    </Table.Cell>
                                    <Table.Cell width={2}>
                                        <Dropdown
                                            fluid
                                            options={statusOptions}
                                            defaultValue={getField(book, "status")}
                                            scrolling
                                            clearable
                                            onChange={(event, data) =>
                                                setUpdateData(book.id, {
                                                    status: data.value as number | undefined,
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={4}>
                                        <Dropdown
                                            fluid
                                            multiple
                                            options={authorOptions}
                                            defaultValue={getField(book, "authors")}
                                            scrolling
                                            onChange={(event, data) =>
                                                setUpdateData(book.id, {
                                                    authors: data.value as number[],
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={3}>
                                        <Dropdown
                                            fluid
                                            options={publishingOptions}
                                            defaultValue={getField(book, "publishing")}
                                            scrolling
                                            clearable
                                            onChange={(event, data) =>
                                                setUpdateData(book.id, {
                                                    publishing: data.value as number | undefined,
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={3}>
                                        <Dropdown
                                            fluid
                                            options={seriesOptions}
                                            defaultValue={getField(book, "series")}
                                            scrolling
                                            clearable
                                            onChange={(event, data) =>
                                                setUpdateData(book.id, {
                                                    series: data.value as number | undefined,
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={3}>
                                        <Input
                                            fluid
                                            transparent
                                            value={getField(book, "isbn")}
                                            onChange={(event, data) => setUpdateData(book.id, { isbn: data.value })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={2}>
                                        <Input
                                            fluid
                                            type="number"
                                            transparent
                                            value={getField(book, "orig_price")}
                                            onChange={(event, data) =>
                                                // type="number"
                                                setUpdateData(book.id, { orig_price: data.value as any })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={2}>
                                        <Input
                                            fluid
                                            transparent
                                            type="number"
                                            value={getField(book, "discount")}
                                            onChange={(event, data) =>
                                                // type="number"
                                                setUpdateData(book.id, { discount: data.value as any })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={2}>
                                        <Input
                                            fluid
                                            type="number"
                                            transparent
                                            value={getField(book, "in_stock")}
                                            onChange={(event, data) =>
                                                // type="number"
                                                setUpdateData(book.id, { in_stock: data.value as any })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={2}>
                                        <Input
                                            fluid
                                            type="number"
                                            transparent
                                            value={getField(book, "pages_count")}
                                            onChange={(event, data) =>
                                                // type="number"
                                                setUpdateData(book.id, { pages_count: data.value as any })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={3}>
                                        <Input
                                            fluid
                                            transparent
                                            value={getField(book, "paper_type")}
                                            onChange={(event, data) =>
                                                setUpdateData(book.id, { paper_type: data.value })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={1}>
                                        <Checkbox
                                            toggle
                                            defaultChecked={getField(book, "chosen")}
                                            onChange={(event, data) => setUpdateData(book.id, { chosen: data.checked })}
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={4}>
                                        <Dropdown
                                            fluid
                                            multiple
                                            options={tagOptions}
                                            defaultValue={getField(book, "tags")}
                                            scrolling
                                            onChange={(event, data) =>
                                                setUpdateData(book.id, {
                                                    tags: data.value as number[],
                                                })
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell width={1}>
                                        <Icon
                                            link
                                            name="trash"
                                            className={styles.danger}
                                            onClick={() => removeBook(book.id)}
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
                                    value={newBook.title ?? ""}
                                    onChange={(event, data) => addToNewBook({ title: data.value })}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={5}>
                                <Form>
                                    <TextArea
                                        className={styles.textArea}
                                        value={newBook.description}
                                        onChange={(event, data) =>
                                            addToNewBook({
                                                description: data.value as string | undefined,
                                            })
                                        }
                                    />
                                </Form>
                            </Table.HeaderCell>
                            <Table.HeaderCell width={3}>
                                <MaskedFileInput
                                    text={t("select_file")}
                                    allow=".jpeg, .png, .jpg"
                                    clear
                                    onUpload={(file) => {
                                        addToNewBook({ image: file });
                                    }}
                                />
                                {newBook.image ? <div>{_getFname(newBook.image.name)}</div> : null}
                            </Table.HeaderCell>
                            <Table.HeaderCell width={2}>
                                <Dropdown
                                    fluid
                                    options={statusOptions}
                                    value={newBook.status ?? ""}
                                    floating
                                    upward
                                    scrolling
                                    clearable
                                    onChange={(event, data) =>
                                        addToNewBook({ status: data.value as number | undefined })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={4}>
                                <Dropdown
                                    fluid
                                    multiple
                                    options={authorOptions}
                                    value={newBook.authors ?? []}
                                    scrolling
                                    onChange={(event, data) =>
                                        addToNewBook({
                                            authors: data.value as number[],
                                        })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={3}>
                                <Dropdown
                                    fluid
                                    options={publishingOptions}
                                    value={newBook.publishing ?? ""}
                                    floating
                                    upward
                                    scrolling
                                    clearable
                                    onChange={(event, data) =>
                                        addToNewBook({ publishing: data.value as number | undefined })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={3}>
                                <Dropdown
                                    fluid
                                    options={seriesOptions}
                                    value={newBook.series ?? ""}
                                    floating
                                    upward
                                    scrolling
                                    clearable
                                    onChange={(event, data) =>
                                        addToNewBook({ series: data.value as number | undefined })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={3}>
                                <Input
                                    fluid
                                    transparent
                                    value={newBook.isbn ?? ""}
                                    onChange={(event, data) => addToNewBook({ isbn: data.value })}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={2}>
                                <Input
                                    fluid
                                    type="number"
                                    transparent
                                    value={newBook.orig_price ?? ""}
                                    onChange={(event, data) =>
                                        // type="number"
                                        addToNewBook({ orig_price: data.value as any })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={2}>
                                <Input
                                    fluid
                                    transparent
                                    type="number"
                                    value={newBook.discount ?? ""}
                                    onChange={(event, data) =>
                                        // type="number"
                                        addToNewBook({ discount: data.value as any })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={2}>
                                <Input
                                    fluid
                                    type="number"
                                    transparent
                                    value={newBook.in_stock ?? ""}
                                    onChange={(event, data) =>
                                        // type="number"
                                        addToNewBook({ in_stock: data.value as any })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={2}>
                                <Input
                                    fluid
                                    type="number"
                                    transparent
                                    value={newBook.pages_count ?? ""}
                                    onChange={(event, data) =>
                                        // type="number"
                                        addToNewBook({ pages_count: data.value as any })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={3}>
                                <Input
                                    fluid
                                    transparent
                                    value={newBook.paper_type ?? ""}
                                    onChange={(event, data) => addToNewBook({ paper_type: data.value })}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={1}>
                                <Checkbox
                                    toggle
                                    checked={newBook.chosen ?? false}
                                    onChange={(event, data) => addToNewBook({ chosen: data.checked })}
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={4}>
                                <Dropdown
                                    fluid
                                    multiple
                                    options={tagOptions}
                                    value={newBook.tags ?? []}
                                    scrolling
                                    onChange={(event, data) =>
                                        addToNewBook({
                                            tags: data.value as number[],
                                        })
                                    }
                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell width={1}>
                                <Icon link name="plus" onClick={saveBook} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </InfiniteScroller>
        </Tab.Pane>
    );
};

export default BooksTable;
