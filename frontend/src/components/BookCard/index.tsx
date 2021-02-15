import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Header, Icon, Label, Segment } from "semantic-ui-react";
import styles from "./card.module.scss";

interface Props {
    book: WebApi.Entity.MinimalBook;
    replace?: boolean;
}

const BookCard: React.FC<Props> = ({ book, replace }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const displayAuthors = book.authors.slice(0, 3);
    const authorsEllipsis = book.authors.length > displayAuthors.length ? "..." : "";
    const url = `/book/${book.id}`;
    const redirect = replace ? () => window.location.replace(url) : () => history.push(url);

    return (
        <Segment className={styles.card} onClick={redirect}>
            {book.status ? (
                <Label ribbon className={["primaryBg", styles.status].join(" ")}>
                    {book.status.name.toUpperCase()}
                </Label>
            ) : null}
            <div className={styles.imgContainer}>
                <img className={styles.image} src={book.image} alt={book.title} />
            </div>
            <Header as="h3" className={styles.header} title={book.title}>
                {book.title}
            </Header>
            <div
                className={[styles.bottomIndent, styles.cutText].join(" ")}
                title={book.authors.map((author) => author.name).join(", ")}
            >
                {displayAuthors.map((author) => author.name).join(", ")}
                {authorsEllipsis}
            </div>
            <div className={styles.price}>
                {book.price} &#8372;
                {book.discount > 0 ? <span className={styles.discount}>-{book.discount}%</span> : null}
            </div>
            {book.is_in_stock ? (
                <div className={styles.green}>
                    <Icon name="check" /> {t("in_stock")}
                </div>
            ) : (
                <div className={styles.grey}>
                    <Icon name="cancel" /> {t("not_in_stock")}
                </div>
            )}
        </Segment>
    );
};

export default BookCard;
