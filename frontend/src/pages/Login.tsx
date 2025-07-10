// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Invalid email or password');

            const data = await res.json();
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <p style={{ marginTop: 10 }}>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: 400,
        margin: '100px auto',
        padding: 30,
        border: '1px solid #ccc',
        borderRadius: 8,
        textAlign: 'center' as const,
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        marginBottom: 20,
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 15,
    },
    input: {
        padding: 10,
        fontSize: 16,
        borderRadius: 4,
        border: '1px solid #ccc',
    },
    button: {
        padding: 10,
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold' as const,
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: 14,
        margin: 0,
    },
};

export default Login;
