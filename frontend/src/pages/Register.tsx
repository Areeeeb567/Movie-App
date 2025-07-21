// frontend/src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Register.css';
import { registerUser } from '../services/api';

/**
 * Register component for user registration.
 * @constructor
 */
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        setError('');

        // Validate input fields
        try {
            const res = await registerUser(username, email, phoneNumber, password);

            // If the response is not ok, throw an error
            if (!res.ok) throw new Error('Registration failed');

            // Navigate to the login page after successful registration
            navigate('/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    // Render the registration form with username, email, phone number, and password fields
    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Sign up to get started</p>

                {error && <div className="error-container">
                    <p className="error-message">{error}</p>
                </div>}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label className="input-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>

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
                        <label className="input-label">Phone Number</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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

                    <button type="submit" className="register-button">Create Account</button>
                </form>

                <p className="register-footer">
                    Already have an account? <Link to="/login" className="register-link">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;