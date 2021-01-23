import { getToken } from "../../../helpers/token.helper";

export interface AuthState {
    jwtToken?: string;
    user?: WebApi.Entity.User;
    isAuthorized: boolean;
    profileLoaded: boolean;
    requestingLogin: boolean;
    requestingRegister: boolean;
}

export const initialState: AuthState = {
    jwtToken: getToken() || undefined,
    isAuthorized: false,
    profileLoaded: false,
    requestingLogin: false,
    requestingRegister: false,
};
