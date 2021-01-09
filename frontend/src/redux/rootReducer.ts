import { combineReducers } from "redux";
import { authReducer } from "../containers/LoginPage/logic/reducer";
import RootState from "../typings/rootState";

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
});

export default rootReducer;
