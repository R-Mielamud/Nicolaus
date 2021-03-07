import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAuthors, loadBooks, loadPublishings, loadStatuses, loadTagGroups } from "../CatalogPage/logic/actions";
import { loadMessengerBills, loadMessengerOrders, loadMessengerUsers } from "../ChatbotAdminPage/logic/actions";

import {
    loadAdminAuthors,
    loadAdminBooks,
    loadAdminTagGroups,
    loadAdminTags,
    loadAdminPublishings,
    loadAdminStatuses,
    loadAdminSeries,
} from "../SiteAdminPage/logic/actions";

import Header from "../Header";
import styles from "./default.module.scss";

export const CATALOG_INFO_SET = ["books", "tagGroups", "publishings", "authors", "statuses"];

export const SITE_ADMIN_INFO_SET = [
    "adminBooks",
    "adminTagGroups",
    "adminTags",
    "adminPublishings",
    "adminAuthors",
    "adminStatuses",
    "adminSeries",
];

export const CHATBOT_ADMIN_INFO_SET = ["messengerUsers", "messengerBills", "messengerOrders"];

const infoLoadingMap: Record<string, any> = {
    messengerUsers: loadMessengerUsers,
    messengerBills: loadMessengerBills,
    messengerOrders: loadMessengerOrders,
    books: loadBooks,
    tagGroups: loadTagGroups,
    publishings: loadPublishings,
    authors: loadAuthors,
    statuses: loadStatuses,
    adminBooks: loadAdminBooks,
    adminTagGroups: loadAdminTagGroups,
    adminTags: loadAdminTags,
    adminPublishings: loadAdminPublishings,
    adminAuthors: loadAdminAuthors,
    adminStatuses: loadAdminStatuses,
    adminSeries: loadAdminSeries,
};

interface Props {
    overflowHidden?: boolean;
    infoSet?: string[];
}

const DefaultPageWrapper: React.FC<Props> = ({ children, overflowHidden, infoSet = [] }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        infoSet.forEach((item) => {
            const action = infoLoadingMap[item];

            if (action) {
                dispatch(action());
            }
        });
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={[styles.remaining, overflowHidden ? styles.hidden : ""].join(" ")}>{children}</div>
        </div>
    );
};

export default DefaultPageWrapper;
