import React from "react";
import { useSelector } from "react-redux";
import { FilterProps } from "..";
import Spinner from "../../../components/common/Spinner";
import RootState from "../../../typings/rootState";
import TagGroupFilter from "../TagGroupFilter";

const TagsFilter: React.FC<FilterProps> = ({ onSelect, currentSelected }) => {
    const { tagGroups } = useSelector((state: RootState) => state.catalog);

    if (!tagGroups) {
        return <Spinner />;
    }

    return (
        <div>
            {tagGroups.map((group) => (
                <TagGroupFilter key={group.id} group={group} onTagSelect={onSelect} currentSelected={currentSelected} />
            ))}
        </div>
    );
};

export default TagsFilter;
