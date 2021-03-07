import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "semantic-ui-react";
import { loadRecommendations } from "../../containers/CatalogPage/logic/actions";
import RootState from "../../typings/rootState";
import BookCard from "../BookCard";
import catalogStyles from "../../containers/CatalogPage/catalog.module.scss";
import { useTranslation } from "react-i18next";
import styles from "./recommendations.module.scss";
import { isGoodTimeFromStart } from "../../helpers/time.helper";
import { Books } from "../../constants/Books";

interface Props {
    exclude?: number;
}

const BookRecommendations: React.FC<Props> = ({ exclude }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { recommendations, lastRecommendationTime } = useSelector((state: RootState) => state.catalog);

    useEffect(() => {
        if (isGoodTimeFromStart(lastRecommendationTime, Books.RECOMMENDATION_LOAD_SECS)) {
            dispatch(loadRecommendations({ exclude }));
        }
    }, [lastRecommendationTime]);

    if (!recommendations) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Header dividing as="h2">
                {t("maybe_you_like")}
            </Header>
            <div className={catalogStyles.books}>
                {recommendations.map((book) => (
                    <BookCard key={book.id} book={book} replace />
                ))}
            </div>
        </div>
    );
};

export default BookRecommendations;
