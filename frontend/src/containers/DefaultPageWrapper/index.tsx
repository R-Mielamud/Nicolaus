import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMessengerBills, loadMessengerOrders, loadMessengerUsers } from "../ChatbotAdminPage/logic/actions";
import Header from "../Header";
import styles from "./default.module.scss";

export const CATALOG_INFO_SET = []; // Will be filled
export const SITE_ADMIN_INFO_SET = []; // Will be filled
export const CHATBOT_ADMIN_INFO_SET = ["messengerUsers", "messengerBills", "messengerOrders"];

const infoLoadingMap: Record<string, any> = {
    messengerUsers: loadMessengerUsers,
    messengerBills: loadMessengerBills,
    messengerOrders: loadMessengerOrders,
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
