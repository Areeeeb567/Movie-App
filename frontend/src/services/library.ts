import axios from 'axios';
import {API_ENDPOINTS} from "../constants/apiUrls.ts";

/**
 * Add a movie to the user's favourites list.
 * @param userId
 * @param movieId
 */
export const addToFavourites = async (userId: number, movieId: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(
            API_ENDPOINTS.LIBRARY.ADD_FAVOURITE,
            { userId, movieId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error adding to favourites:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Remove a movie from the user's favourites list.
 * @param userId
 * @param movieId
 */
export const removeFromFavourites = async (userId: string, movieId: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found. User might not be authenticated.');
    }

    const response = await axios.post(
        API_ENDPOINTS.LIBRARY.REMOVE_FAVOURITE,
        { userId, movieId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/**
 * Add a movie to the user's watched list.
 * @param userId
 * @param movieId
 */
export const addToWatched = async (userId: number, movieId: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(
            API_ENDPOINTS.LIBRARY.ADD_TO_WATCHLIST,
            { userId, movieId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error adding to favourites:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Remove a movie from the user's watched list.
 * @param userId
 * @param movieId
 */
export const removeFromWatched = async (userId: string, movieId: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found. User might not be authenticated.');
    }

    const response = await axios.post(
        API_ENDPOINTS.LIBRARY.REMOVE_FROM_WATCHLIST,
        { userId, movieId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/**
 * Fetch the user's favourites list.
 * @param userId
 */
export const getUserFavourites = async (userId: number): Promise<number[]> => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(API_ENDPOINTS.LIBRARY.GET_FAVOURITES(userId), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching favourites:', error);
        throw error;
    }
};

/**
 * Fetch the user's watched list.
 * @param userId
 */
export const getUserWatchedList = async (userId: number): Promise<number[]> => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(API_ENDPOINTS.LIBRARY.GET_WATCHLIST(userId), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching favourites:', error);
        throw error;
    }
};
