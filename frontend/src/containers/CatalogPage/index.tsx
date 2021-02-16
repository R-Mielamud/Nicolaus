import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Loader, Segment } from "semantic-ui-react";
import BookCard from "../../components/BookCard";
import BookRecommendations from "../../components/BookRecommendations";
import Spinner from "../../components/common/Spinner";
import InfiniteScroller from "../../components/InfiniteScroller";
import NoResults from "../../components/NoResults";
import RootState from "../../typings/rootState";
import CatalogFiltersBar from "../CatalogFiltersBar";
import { loadBooks } from "./logic/actions";
import styles from "./catalog.module.scss";

const CatalogPage: React.FC = () => {
    const dispatch = useDispatch();
    const booksRef = useRef<HTMLDivElement | null>(null);

    const {
        catalog: { books, loadingBooks, hasMoreBooks },
        // auth: { isAuthorized }, // It'll be useful
    } = useSelector((state: RootState) => state);

    if (!books) {
        return <Spinner />;
    }

    const scrollTop = () => {
        const element = booksRef.current;

        if (!element) {
            return;
        }

        const interval = setInterval(() => {
            if (element.scrollTop < 10) {
                clearInterval(interval);
            }

            element.scrollBy(0, -30);
        }, 10);
    };

    return (
        <div className={styles.container}>
            <Segment className={styles.sidebar}>
                <CatalogFiltersBar />
            </Segment>
            <div>
                {books.length ? (
                    <InfiniteScroller
                        ref={booksRef}
                        className={styles.books}
                        loading={loadingBooks}
                        hasMore={hasMoreBooks}
                        loader={<Loader active inline="centered" size="massive" />}
                        loadMore={() => dispatch(loadBooks({ more: true }))}
                    >
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                        <div className={styles.toTop} onClick={scrollTop}>
                            <Icon name="arrow up" />
                        </div>
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
