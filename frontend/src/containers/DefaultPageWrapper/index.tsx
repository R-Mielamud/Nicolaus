import React from "react";
import Header from "../Header";
import styles from "./default.module.scss";

interface Props {
    overflowHidden?: boolean;
}

const DefaultPageWrapper: React.FC<Props> = ({ children, overflowHidden }) => {
    // const dispatch = useDispatch();
    // useEffect(() => {}, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={[styles.remaining, overflowHidden ? styles.hidden : ""].join(" ")}>{children}</div>
        </div>
    );
};

export default DefaultPageWrapper;
