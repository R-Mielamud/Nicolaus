export const LOGIN = "USER:AUTH:LOGIN";
export const LOGIN_SUCCESS = "USER:AUTH:LOGIN:SUCCESS";
export const LOGIN_FAIL = "USER:AUTH:LOGIN:FAIL";

export interface Login {
    email: string;
    password: string;
}

export interface LoginSuccess {
    jwtToken: string;
    user: WebApi.Entity.User;
}
