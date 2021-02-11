import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "semantic-ui-react";
import { loadRecommendations } from "../../containers/CatalogPage/logic/actions";
import RootState from "../../typings/rootState";
import BookCard from "../BookCard";
import catalogStyles from "../../containers/CatalogPage/catalog.module.scss";
import styles from "./recommendations.module.scss";

const BookRecommendations: React.FC = () => {
    const dispatch = useDispatch();
    const { recommendations } = useSelector((state: RootState) => state.catalog);

    useEffect(() => {
        dispatch(loadRecommendations());
    }, []);

    if (!recommendations) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Header dividing as="h2">
                Maybe you&apos;ll like:
            </Header>
            <div className={catalogStyles.books}>
                {recommendations.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default BookRecommendations;
