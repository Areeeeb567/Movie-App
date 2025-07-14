// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import type {JSX} from "react";

/**
 * ProtectedRoute component that checks for user authentication.
 * @param children
 * @constructor
 */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');

    // If no token is found, redirect to the login page.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
