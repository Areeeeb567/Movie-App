import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails.tsx';
import HomePage from './pages/HomePage';
import SearchPage from "./pages/SearchPage.tsx";
import DiscoverPage from './pages/DiscoverPage';
import LibraryPage from './pages/LibraryPage';

// Main App component that defines the routes for the application
const App = () => {
    return (
        <Routes>
            {/*Define the routes for the application, including public and protected routes*/}
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/library" element={<LibraryPage />} />

            {/*<Route path="/" element={<Navigate to="/login" />} />*/}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected route for the dashboard, accessible only if the user is authenticated */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default App;
