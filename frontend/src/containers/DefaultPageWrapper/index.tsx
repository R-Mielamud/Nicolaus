import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/common/Spinner";
import RootState from "../../typings/rootState";
import { loadProfile } from "../LoginPage/logic/actions";

interface Props {
    children: React.ReactElement<any, any>;
}

const DefaultPageWrapper: React.FC<Props> = ({ children }) => {
    const dispatch = useDispatch();
    const { profileLoaded } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(loadProfile());
    }, []);

    if (!profileLoaded) {
        return <Spinner />;
    }

    return children;
};

export default DefaultPageWrapper;
