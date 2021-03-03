import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Header, Button, Divider, Tab, TabProps } from "semantic-ui-react";
import AuthorsTable from "./AuthorsTable";
import PublishingsTable from "./PublishingsTable";
import SeriesTable from "./SeriesTable";
import TagGroupsTable from "./TagGroupsTable";
import TagsTable from "./TagsTable";

interface Props {
    activeIndex?: number;
}

export interface TableProps {
    index: number;
}

const SiteAdminPage: React.FC<Props> = ({ activeIndex }) => {
    const history = useHistory();
    const { t } = useTranslation();

    const tabOptions = [
        {
            menuItem: t("authors"),
            render: () => <AuthorsTable index={0} />,
        },
        {
            menuItem: t("tag_groups"),
            render: () => <TagGroupsTable index={1} />,
        },
        {
            menuItem: t("publishings"),
            render: () => <PublishingsTable index={2} />,
        },
        {
            menuItem: t("tags"),
            render: () => <TagsTable index={3} />,
        },
        {
            menuItem: t("series_p"),
            render: () => <SeriesTable index={4} />,
        },
    ];

    const onSwitch = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: TabProps) => {
        const parts = window.location.pathname.split("?");
        history.replace(parts[0] + "?activeIndex=" + data.activeIndex);
    };

    return (
        <div>
            <div className="leftRight">
                <Header as="h2">{t("site_admin")}</Header>
                <Button primary onClick={() => history.push("/chatbot")}>
                    {t("to_chatbot_admin")}
                </Button>
            </div>
            <Divider />
            <Tab panes={tabOptions} activeIndex={activeIndex} onTabChange={onSwitch} />
        </div>
    );
};

export default SiteAdminPage;
