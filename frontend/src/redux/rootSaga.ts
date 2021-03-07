import { all } from "redux-saga/effects";
import catalogSaga from "../containers/CatalogPage/logic/saga";
import chatbotAdminSaga from "../containers/ChatbotAdminPage/logic/saga";
import authSaga from "../containers/LoginPage/logic/saga";
import siteAdminSaga from "../containers/SiteAdminPage/logic/saga";

export default function* rootSaga() {
    yield all([authSaga(), chatbotAdminSaga(), catalogSaga(), siteAdminSaga()]);
}
