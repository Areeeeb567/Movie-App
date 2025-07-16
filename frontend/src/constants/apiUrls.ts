// frontend/src/constants/apiUrls.ts

/**
 * Base URL for the API server.
 */
export const API_BASE_URL = 'http://localhost:5000/api';

/**
 * API endpoints for the application.
 */
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`
    },
    DASHBOARD: `${API_BASE_URL}/dashboard`
};