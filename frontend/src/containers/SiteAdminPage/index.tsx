import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Header, Button, Divider, Tab } from "semantic-ui-react";
import AuthorsTable from "./AuthorsTable";
import TagGroupsTable from "./TagGroupsTable";

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
    ];

    return (
        <div>
            <div className="leftRight">
                <Header as="h2">{t("site_admin")}</Header>
                <Button primary onClick={() => history.push("/chatbot")}>
                    {t("to_chatbot_admin")}
                </Button>
            </div>
            <Divider />
            <Tab panes={tabOptions} activeIndex={activeIndex} />
        </div>
    );
};

export default SiteAdminPage;
