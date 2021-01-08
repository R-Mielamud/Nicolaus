export interface AuthState {
    jwtToken?: string;
    user?: WebApi.Entity.User;
    isAuthorized: boolean;
    requestingLogin: boolean;
}

export const initialState: AuthState = {
    isAuthorized: false,
    requestingLogin: false,
};
