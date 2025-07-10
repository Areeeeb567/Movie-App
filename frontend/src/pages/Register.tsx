// frontend/src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, phoneNumber, password }),
            });

            if (!res.ok) throw new Error('Registration failed');

            // alert('Registration successful');
            navigate('/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

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