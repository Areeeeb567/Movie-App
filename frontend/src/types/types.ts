// frontend/src/types/types.ts

/**
 * TypeScript interfaces for the application.
 */

/**
 * Interface for user authentication data.
 */
export interface User {
    username: string;
    email: string;
    phoneNumber: string;
}

/**
 * Interface for MovieCard component props.
 */
export interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
}

/**
 * Interface for Movie Genre
 */
export interface Genre {
    id: number;
    name: string;
}

/**
 * Interface for Cast Member
 */
export interface CastMember {
    id: number;
    name: string;
    profile_path: string;
}

/**
 * Interface for MovieDetails component props.
 */
export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    backdrop_path: string;
    genres?: Genre[];
    runtime: number;
    vote_average: number;
    tagline: string;
    adult: boolean;
    credits?: {
        cast: CastMember[];
    };
}