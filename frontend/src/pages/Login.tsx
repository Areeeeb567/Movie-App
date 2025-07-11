// frontend/src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Login.css';
import { API_ENDPOINTS } from '../constants/apiUrls';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        setError('');

        // Validate email and password
        try {
            // Check if email and password are provided
            const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // If the response is not ok, throw an error
            if (!res.ok) throw new Error('Invalid email or password');

            // Parse the response data and store the token in localStorage
            const data = await res.json();
            localStorage.setItem('token', data.token);

            // Redirect to the dashboard after successful login
            navigate('/dashboard');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    // Render the login form with email and password fields
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Sign in to continue</p>

                {error && <div className="error-container">
                    <p className="error-message">{error}</p>
                </div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">Sign In</button>
                </form>

                <p className="login-footer">
                    Don't have an account? <Link to="/register" className="login-link">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;