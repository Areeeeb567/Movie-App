import axios from 'axios';
import {API_ENDPOINTS} from "../constants/apiUrls.ts";
import type MovieDetails from '../pages/MovieDetails.tsx';

export const getMovieById = async (movieId: string): Promise<MovieDetails> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.DETAILS(movieId));
    return response.data;
};

export const getTrending = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.TRENDING, {
        params: { page }
    });
    return response.data;
}

export const getNowPlaying = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.NOW_PLAYING, {
        params: { page }
    });
    return response.data;
};

export const getTopRated = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.TOP_RATED, {
        params: { page }
    });
    return response.data;
};

export const getPopular = async (page: number = 1): Promise<any> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.POPULAR, {
        params: { page }
    });
    return response.data;
};
