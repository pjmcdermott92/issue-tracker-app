import { api } from './api';

type LoginProps = { email: string, password: string };

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const getCurrentUser = () => api.get(BASE_URL + '/users/me');

const loginUser = ({ email, password}: LoginProps) => {
    const body = {
        email: email.toLowerCase(),
        password
    };

    return api.post(BASE_URL + '/auth', body);
}

const logoutUser = () => api.get(BASE_URL + '/auth/logout');

export { getCurrentUser, logoutUser, loginUser }
