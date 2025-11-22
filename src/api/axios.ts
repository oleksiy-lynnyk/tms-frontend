import axios, { AxiosError } from 'axios';
import { getErrorToastHandler } from '../utils/errorHandler';

export const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
    //withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const showErrorToast = getErrorToastHandler();

        if (showErrorToast && error.response) {
            const status = error.response.status;
            const data = error.response.data as any;

            let message = 'An error occurred';

            if (status === 400) {
                message = data?.message || 'Bad request';
            } else if (status === 401) {
                message = 'Unauthorized. Please log in.';
            } else if (status === 403) {
                message = 'Access denied';
            } else if (status === 404) {
                message = data?.message || 'Resource not found';
            } else if (status === 409) {
                message = data?.message || 'Conflict occurred';
            } else if (status >= 500) {
                message = 'Server error. Please try again later.';
            } else if (data?.message) {
                message = data.message;
            }

            showErrorToast(message);
        } else if (!error.response && showErrorToast) {
            showErrorToast('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);
