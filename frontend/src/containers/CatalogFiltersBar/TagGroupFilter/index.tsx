import React, { useState } from "react";
import { Accordion, Checkbox, Icon } from "semantic-ui-react";
import styles from "../filters.module.scss";

interface Props {
    group: WebApi.Entity.TagGroup;
    onTagSelect: (id: number, selected: boolean) => void;
    currentSelected: number[];
}

const TagGroupFilter: React.FC<Props> = ({ group, onTagSelect, currentSelected }) => {
    const [groupActive, setGroupActive] = useState<boolean>(false);

    return (
        <Accordion className={styles.accordion}>
            <Accordion.Title
                className={styles.accordionChild}
                onClick={() => setGroupActive(!groupActive)}
                active={groupActive}
            >
                <Icon name="dropdown" />
                {group.name}
            </Accordion.Title>
            <Accordion.Content className={[styles.accordionChild, styles.checks].join(" ")} active={groupActive}>
                {group.tags.map((tag) => (
                    <div key={tag.id}>
                        <Checkbox
                            label={tag.name}
                            checked={currentSelected.includes(tag.id)}
                            onChange={(event, data) => onTagSelect(tag.id, data.checked ?? false)}
                        />
                    </div>
                ))}
            </Accordion.Content>
        </Accordion>
    );
};

export default TagGroupFilter;
