import { api } from './api';

type LoginProps = { email: string, password: string };

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const AUTH_URLS = {
    GET_USER: BASE_URL + '/users/me',
    LOGIN: BASE_URL + '/auth',
    LOGOUT: BASE_URL + '/auth/logout',
    FORGOT_PASSWORD: BASE_URL + '/auth/forgot-password',
    RESET_PASSWORD: BASE_URL + '/auth/reset-password/'
}

const loginUser = ({ email, password}: LoginProps) => {
    const body = {
        email: email.toLowerCase(),
        password
    };
    
    return api.post(AUTH_URLS.LOGIN, body);
}

const getCurrentUser = () => api.get(AUTH_URLS.GET_USER);
const logoutUser = () => api.get(AUTH_URLS.LOGOUT);
const forgotPassword = (email: string) => api.post(AUTH_URLS.FORGOT_PASSWORD, { email: email.toLowerCase() });
const verifyResetToken = (token: string) => api.get(AUTH_URLS.RESET_PASSWORD + token);
const resetPassword = (token: string, password: string) => api.put(AUTH_URLS.RESET_PASSWORD + token, { password });

export {
    getCurrentUser,
    logoutUser,
    loginUser,
    forgotPassword,
    verifyResetToken,
    resetPassword
}
