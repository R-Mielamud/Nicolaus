import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Icon, Label, Segment } from "semantic-ui-react";
import BookRecommendations from "../../components/BookRecommendations";
import Spinner from "../../components/common/Spinner";
import { getBookById } from "../../services/books.service";
import styles from "./book.module.scss";

interface Props {
    bookId: number;
}

const ExpandedBookPage: React.FC<Props> = ({ bookId }) => {
    const { t } = useTranslation();
    const [book, setBook] = useState<WebApi.Entity.Book | null>(null);
    const [bookLoaded, setBookLoaded] = useState<boolean>(false);
    const [bookLoading, setBookLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!bookLoading) {
            setBookLoading(true);

            getBookById(bookId)
                .then((newBook) => {
                    setBook(newBook);
                    setBookLoaded(true);
                })
                .catch(() => setBookLoaded(true));
        }
    }, []);

    if (!bookLoaded) {
        return <Spinner />;
    }

    if (!book) {
        return null;
    }

    return (
        <div>
            <div className={styles.container}>
                <Segment className={styles.left}>
                    {book.status ? (
                        <Label ribbon className={["primaryBg", styles.status].join(" ")}>
                            {book.status.name.toUpperCase()}
                        </Label>
                    ) : null}
                    <div className={styles.imgContainer}>
                        <img className={styles.image} src={book.image} alt={book.title} />
                    </div>
                    <div className={styles.textContainer}>
                        <Header as="h3" className={styles.textOverflow} title={book.title}>
                            {book.title}
                        </Header>
                        <div className={styles.price}>
                            {book.price} &#8372;
                            {book.discount > 0 ? <span className={styles.discount}>-{book.discount}%</span> : null}
                        </div>
                        <div className={styles.textParameter}>
                            {book.is_in_stock ? (
                                <div className={styles.green}>
                                    <Icon name="check" /> {t("in_stock")}
                                </div>
                            ) : (
                                <div className={styles.grey}>
                                    <Icon name="cancel" /> {t("not_in_stock")}
                                </div>
                            )}
                        </div>
                        <div className={styles.textParameter}>
                            <span className={styles.key}>{t("authors")}: </span>
                            {book.authors.map((author) => author.name).join(", ")}
                        </div>
                        {book.publishing ? (
                            <div className={styles.textParameter}>
                                <span className={styles.key}>Publishing: </span>
                                {book.publishing.name}
                            </div>
                        ) : null}
                        {book.series ? (
                            <div className={styles.textParameter}>
                                <span className={styles.key}>Series: </span>
                                {book.series.name}
                            </div>
                        ) : null}
                        <div className={styles.textParameter}>
                            <span className={styles.key}>ISBN: </span>
                            {book.isbn}
                        </div>
                        <div className={styles.textParameter}>
                            <span className={styles.key}>Paper: </span>
                            {book.paper_type} ({book.pages_count})
                        </div>
                        <div className={styles.textParameter}>
                            <span className={styles.key}>Product ID: </span>
                            {book.id}
                        </div>
                        {book.tags.length ? (
                            <div>
                                <Header as="h3" dividing>
                                    {t("tags")}
                                </Header>
                                <div className={styles.tags}>
                                    {book.tags.map((tag) => (
                                        <div key={tag.id} className={styles.tag}>
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </Segment>
                <div className={styles.right}>
                    <Header as="h2" dividing>
                        Description
                    </Header>
                    <div className={styles.description}>{book.description}</div>
                </div>
            </div>
            <div>
                <BookRecommendations exclude={book.id} />
            </div>
        </div>
    );
};

export default ExpandedBookPage;
