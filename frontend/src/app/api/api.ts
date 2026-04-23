import axios from 'axios';

export const API_URL = `https://polystats.ru/api`;

const $api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            if (localStorage.getItem('token')) {
                localStorage.clear();
                window.location.assign('/');
                return Promise.reject(error);
            } else {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

export default $api;
