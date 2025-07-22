import axios from 'axios';
import {API_ENDPOINTS} from "../constants/apiUrls.ts";
import type MovieDetails from '../pages/MovieDetails.tsx';

export const getMovieById = async (movieId: string): Promise<MovieDetails> => {
    const response = await axios.get(API_ENDPOINTS.MOVIES.DETAILS(movieId));
    return response.data;
};
