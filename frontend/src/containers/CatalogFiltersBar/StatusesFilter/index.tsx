import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Checkbox, Icon } from "semantic-ui-react";
import { FilterProps } from "..";
import Spinner from "../../../components/common/Spinner";
import RootState from "../../../typings/rootState";
import styles from "../filters.module.scss";

const StatusesFilter: React.FC<FilterProps> = ({ onSelect, currentSelected }) => {
    const [active, setActive] = useState<boolean>(false);
    const { statuses } = useSelector((state: RootState) => state.catalog);

    if (!statuses) {
        return <Spinner />;
    }

    return (
        <Accordion className={styles.accordion}>
            <Accordion.Title active={active} className={styles.accordionChild} onClick={() => setActive(!active)}>
                <Icon name="dropdown" />
                Statuses
            </Accordion.Title>
            <Accordion.Content
                active={active}
                className={[styles.accordionChild, styles.checks, styles.scrollable].join(" ")}
            >
                {statuses.map((status) => (
                    <div key={status.id}>
                        <Checkbox
                            checked={currentSelected.includes(status.id)}
                            onChange={(event, data) => onSelect(status.id, data.checked ?? false)}
                            label={status.name.toUpperCase()}
                        />
                    </div>
                ))}
            </Accordion.Content>
        </Accordion>
    );
};

export default StatusesFilter;
