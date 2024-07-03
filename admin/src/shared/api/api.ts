import axios from 'axios';
import { UserRes } from '@/entites/User';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

// export const API_URL = "http://localhost:3001/api/";

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (
            // eslint-disable-next-line eqeqeq
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const res = await axios.get<UserRes>(`${__API__}/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem(
                    TOKEN_LOCALSTORAGE_KEY,
                    res.data.accessToken,
                );
                return $api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗИРОВАН!!!');
            }
        }

        throw error;
    },
);
