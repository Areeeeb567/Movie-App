import axios from 'axios';
import {API_ENDPOINTS} from "../constants/apiUrls.ts";
import type MovieDetails from '../pages/MovieDetails.tsx';

export const getMovieById = async (movieId: string): Promise<MovieDetails> => {
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

export const searchMovies = async (query: string, page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.SEARCH(query), {
        params: { page }
    });
    return response.data;
}

export const getGenres = async (): Promise<any[]> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.GENRES);
    return response.data;
};

export const discoverMoviesByGenres = async (
    genreIds: number[] = [],
    page: number = 1
): Promise<any> => {
    const url = API_ENDPOINTS.MOVIES.DISCOVER('popularity.desc', page, genreIds);
    const response = await axios.get(url);
    return response.data;
};