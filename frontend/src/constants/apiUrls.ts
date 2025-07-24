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
    DASHBOARD: `${API_BASE_URL}/dashboard`,
    MOVIES: {
        LIST: `${API_BASE_URL}/movies`,
        DETAILS: (movieId: string) => `${API_BASE_URL}/movies/${movieId}`,
        SEARCH: (query: string) => `${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`,
        TRENDING: `${API_BASE_URL}/movies/trending`,
        NOW_PLAYING: `${API_BASE_URL}/movies/now_playing`,
        TOP_RATED: `${API_BASE_URL}/movies/top_rated`,
        POPULAR: `${API_BASE_URL}/movies/popular`,
        GENRES: `${API_BASE_URL}/movies/genres`,
        POSTER_IMAGE: `https://image.tmdb.org/t/p/w500`,
        DISCOVER: (
            sortBy: string = 'popularity.desc',
            page: number = 1,
            genres: number[] = []
        ) =>
            `${API_BASE_URL}/movies/discover?sort_by=${encodeURIComponent(sortBy)}&page=${page}${
                genres.length > 0 ? `&genres=${genres.join(',')}` : ''
            }`
    },
    LIBRARY: {
        ADD_FAVOURITE: `${API_BASE_URL}/library/addfav`,
        REMOVE_FAVOURITE: `${API_BASE_URL}/library/removefav`,
        GET_FAVOURITES: (userId: number) => `${API_BASE_URL}/library/favourites/${userId}`,
        GET_WATCHLIST: (userId: number) => `${API_BASE_URL}/library/watchlist/${userId}`,
        ADD_TO_WATCHLIST: `${API_BASE_URL}/library/addwatchlist`,
        REMOVE_FROM_WATCHLIST: `${API_BASE_URL}/library/removewatchlist`
    },
};