import { LocalStorageKeys } from "../constants/LocalStorageKeys";

export const DEFAULT_LANGUAGE = "en";

function fromLocalStorage() {
    return localStorage.getItem(LocalStorageKeys.USER_LANGUAGE);
}

function fromNavigator() {
    if (!navigator.language) {
        return null;
    }

    const languageString = navigator.language;
    const languageParts = languageString.split("-");
    const lastPart = languageParts.pop();

    return lastPart?.toLowerCase();
}

export default function getLanguage() {
    const local = fromLocalStorage();
    const navigator = fromNavigator();

    return navigator || local || DEFAULT_LANGUAGE;
}
