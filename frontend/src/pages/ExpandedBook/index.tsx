import React from "react";
import { useRouteMatch } from "react-router";
import DefaultPageWrapper from "../../containers/DefaultPageWrapper";
import ExpandedBookPage from "../../containers/ExpandedBookPage";

const ExpandedBook: React.FC = () => {
    const match = useRouteMatch<{ id?: string }>();

    if (!match.params.id) {
        return null;
    }

    const bookId = Number(match.params.id);

    return (
        <DefaultPageWrapper>
            <ExpandedBookPage bookId={bookId} />
        </DefaultPageWrapper>
    );
};

export default ExpandedBook;
