import i18next from "i18next";
import { NotificationManager } from "react-notifications";

export function error(text: string) {
    return NotificationManager.error(text, i18next.t("error"));
}
