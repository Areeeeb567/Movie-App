import axios from 'axios';
import {API_ENDPOINTS} from "../constants/apiUrls.ts";
import type { MovieDetail } from '../types/types.ts';

/**
 * Fetch movie details by ID from the API.
 * @param movieId
 */
export const getMovieById = async (movieId: string): Promise<MovieDetail> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.DETAILS(movieId));
    return response.data;
};

/**
 * Fetch Trending movies from the API.
 * @param page
 */
export const getTrending = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.TRENDING, {
        params: { page }
    });
    return response.data;
}

/**
 * Fetch Now Playing movies from the API.
 * @param page
 */
export const getNowPlaying = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.NOW_PLAYING, {
        params: { page }
    });
    return response.data;
};

/**
 * Fetch Top Rated movies from the API.
 * @param page
 */
export const getTopRated = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.TOP_RATED, {
        params: { page }
    });
    return response.data;
};

/**
 * Fetch Popular Movies from the API.
 */
export const getPopular = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.POPULAR, {
        params: { page }
    });
    return response.data;
};

/**
 * Search for movies based on a query string.
 * @param query
 * @param page
 */
export const searchMovies = async (query: string, page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.SEARCH(query), {
        params: { page }
    });
    return response.data;
}

/**
 * Fetch movie genres from the API.
 */
export const getGenres = async (): Promise<any[]> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.GENRES);
    return response.data;
};

/**
 * Discover movies based on genres and sorting options.
 * @param genreIds
 * @param page
 */
export const discoverMoviesByGenres = async (
    genreIds: number[] = [],
    page: number = 1
): Promise<any> => {
    const url = API_ENDPOINTS.MOVIES.DISCOVER('popularity.desc', page, genreIds);
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
};