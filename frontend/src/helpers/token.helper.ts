import { LocalStorageKeys } from "../constants/LocalStorageKeys";

export function getToken() {
    return localStorage.getItem(LocalStorageKeys.USER_TOKEN);
}

export function setToken(token: string) {
    return localStorage.setItem(LocalStorageKeys.USER_TOKEN, token);
}

export function removeToken() {
    return localStorage.removeItem(LocalStorageKeys.USER_TOKEN);
}
