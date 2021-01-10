import { LocalStorageKeys } from "../constants/LocalStorageKeys";

export const DEFAULT_LANGUAGE = "en";

function fromLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.USER_LANGUAGE) || DEFAULT_LANGUAGE;
}

function fromNavigator() {
    if (!navigator.language) {
        return DEFAULT_LANGUAGE;
    }

    const languageString = navigator.language;
    const languageParts = languageString.split("-");
    const lastPart = languageParts.pop();

    return lastPart ? lastPart.toLowerCase() : DEFAULT_LANGUAGE;
}

export default function getLanguage() {
    const local = fromLocalStorage();
    const navigator = fromNavigator();

    return local || navigator;
}
