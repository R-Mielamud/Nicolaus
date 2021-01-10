import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import getLanguage, { DEFAULT_LANGUAGE } from "../helpers/getLanguage.helper";
import { en } from "../translations/en";
import { ru } from "../translations/ru";
import { ua } from "../translations/ua";

export default function configureLanguages() {
    const language = getLanguage();

    i18n.use(initReactI18next).init({
        resources: {
            en: {
                translation: en,
            },
            ru: {
                translation: ru,
            },
            ua: {
                translation: ua,
            },
        },
        lng: language,
        fallbackLng: DEFAULT_LANGUAGE,
        interpolation: {
            escapeValue: false,
        },
    });
}
