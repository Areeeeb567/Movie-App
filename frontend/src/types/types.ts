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