import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import {
    Card,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
} from '@mui/material';
import GuestButton from '../components/organisms/button/GuestButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await loginUser(email, password);
            if (!res.ok) throw new Error('Invalid email or password');
            const data = await res.json();
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    };

    const handleGuestLogin = () => {
        navigate('/');
    };

    return (
        <Card
            sx={{
                p: 4,
                maxWidth: 400,
                width: '100%',
                boxShadow: 6,
                borderRadius: 4,
                margin: 'auto',
                position: 'relative',
                top: '10vh',
            }}
        >
            <Stack spacing={2}>
                <Typography
                    variant="h4"
                    color="white"
                    fontWeight={700}
                    sx={{ paddingLeft: '25%' }}
                >
                    Welcome
                </Typography>
                <Typography
                    variant="body1"
                    color="white"
                    sx={{ paddingLeft: '25%' }}
                >
                    Sign in to continue
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            fullWidth
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            fullWidth
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            size="large"
                        >
                            Sign In
                        </Button>
                    </Stack>
                </form>

                <GuestButton onClick={handleGuestLogin} />

                <Typography variant="body2" align="center" color="white">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" style={{ color: 'white', textDecoration: 'underline' }}>
                        Sign Up
                    </Link>
                </Typography>
            </Stack>
        </Card>
    );
};

export default Login;
