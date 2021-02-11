import React from "react";
import { useSelector } from "react-redux";
import { Segment } from "semantic-ui-react";
import BookCard from "../../components/BookCard";
import BookRecommendations from "../../components/BookRecommendations";
import Spinner from "../../components/common/Spinner";
import NoResults from "../../components/NoResults";
import RootState from "../../typings/rootState";
import CatalogFiltersBar from "../CatalogFiltersBar";
import styles from "./catalog.module.scss";

const CatalogPage: React.FC = () => {
    const { books } = useSelector((state: RootState) => state.catalog);

    if (!books) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <Segment className={styles.sidebar}>
                <CatalogFiltersBar />
            </Segment>
            <div className={styles.books}>
                {books.length ? (
                    books.map((book) => <BookCard key={book.id} book={book} />)
                ) : (
                    <NoResults>
                        <BookRecommendations />
                    </NoResults>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
