import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Checkbox, Icon } from "semantic-ui-react";
import { FilterProps } from "..";
import Spinner from "../../../components/common/Spinner";
import RootState from "../../../typings/rootState";
import styles from "../filters.module.scss";

const AuthorsFilter: React.FC<FilterProps> = ({ onSelect, currentSelected }) => {
    const [active, setActive] = useState<boolean>(false);
    const { authors } = useSelector((state: RootState) => state.catalog);

    if (!authors) {
        return <Spinner />;
    }

    return (
        <Accordion className={styles.accordion}>
            <Accordion.Title active={active} className={styles.accordionChild} onClick={() => setActive(!active)}>
                <Icon name="dropdown" />
                Authors
            </Accordion.Title>
            <Accordion.Content
                active={active}
                className={[styles.accordionChild, styles.checks, styles.scrollable].join(" ")}
            >
                {authors.map((author) => (
                    <div key={author.id}>
                        <Checkbox
                            checked={currentSelected.includes(author.id)}
                            onChange={(event, data) => onSelect(author.id, data.checked ?? false)}
                            label={author.name}
                        />
                    </div>
                ))}
            </Accordion.Content>
        </Accordion>
    );
};

export default AuthorsFilter;
