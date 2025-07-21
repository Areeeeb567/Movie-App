// frontend/src/services/api.ts
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/apiUrls';

/**
 * API service for handling user authentication and registration.
 */
const api = axios.create({
    baseURL: API_BASE_URL,
});

/**
 * Interceptor to add the Authorization header with the token if it exists.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/**
 * Function to log in a user.
 * @param email
 * @param password
 */
export async function loginUser(email: string, password: string) {
    const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return res;
}

/**
 * Function to register a user
 * @param username
 * @param email
 * @param phoneNumber
 * @param password
 */
export async function registerUser(
    username: string,
    email: string,
    phoneNumber: string,
    password: string
) {
    const res = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phoneNumber, password }),
    });
    return res;
}
export default api;
