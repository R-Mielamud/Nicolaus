import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Segment } from "semantic-ui-react";
import BookCard from "../../components/BookCard";
import BookRecommendations from "../../components/BookRecommendations";
import Spinner from "../../components/common/Spinner";
import InfiniteScroller from "../../components/InfiniteScroller";
import NoResults from "../../components/NoResults";
import RootState from "../../typings/rootState";
import CatalogFiltersBar from "../CatalogFiltersBar";
import styles from "./catalog.module.scss";
import { loadBooks } from "./logic/actions";

const CatalogPage: React.FC = () => {
    const dispatch = useDispatch();
    const { books, loadingBooks, hasMoreBooks } = useSelector((state: RootState) => state.catalog);

    if (!books) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <Segment className={styles.sidebar}>
                <CatalogFiltersBar />
            </Segment>
            <div>
                {books.length ? (
                    <InfiniteScroller
                        className={styles.books}
                        loading={loadingBooks}
                        hasMore={hasMoreBooks}
                        loader={<Loader active inline="centered" size="massive" />}
                        loadMore={() => dispatch(loadBooks({ more: true }))}
                    >
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </InfiniteScroller>
                ) : (
                    <div className={styles.books}>
                        <NoResults>
                            <BookRecommendations />
                        </NoResults>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
