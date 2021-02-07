import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Checkbox, Icon } from "semantic-ui-react";
import { FilterProps } from "..";
import Spinner from "../../../components/common/Spinner";
import RootState from "../../../typings/rootState";
import styles from "../filters.module.scss";

const PublishingsFilter: React.FC<FilterProps> = ({ onSelect, currentSelected }) => {
    const [active, setActive] = useState<boolean>(false);
    const { publishings } = useSelector((state: RootState) => state.catalog);

    if (!publishings) {
        return <Spinner />;
    }

    return (
        <Accordion className={styles.accordion}>
            <Accordion.Title active={active} className={styles.accordionChild} onClick={() => setActive(!active)}>
                <Icon name="dropdown" />
                Publishings
            </Accordion.Title>
            <Accordion.Content
                active={active}
                className={[styles.accordionChild, styles.checks, styles.scrollable].join(" ")}
            >
                {publishings.map((publishing) => (
                    <div key={publishing.id}>
                        <Checkbox
                            checked={currentSelected.includes(publishing.id)}
                            onChange={(event, data) => onSelect(publishing.id, data.checked ?? false)}
                            label={publishing.name}
                        />
                    </div>
                ))}
            </Accordion.Content>
        </Accordion>
    );
};

export default PublishingsFilter;
