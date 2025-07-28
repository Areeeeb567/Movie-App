import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Card,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
} from '@mui/material';
import { registerUser } from '../services/api';
import GuestButton from '../components/organisms/button/GuestButton';

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
            const res = await registerUser(username, email, phoneNumber, password);
            if (!res.ok) throw new Error('Registration failed');
            navigate('/login');
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
                bgcolor: 'transparent',
                backdropFilter: 'blur(4px)',
            }}
        >
            <Stack spacing={2}>
                <Typography
                    variant="h4"
                    color="white"
                    fontWeight={700}
                    sx={{ paddingLeft: '10%' }}
                >
                    Create Account
                </Typography>
                <Typography
                    variant="body1"
                    color="white"
                    sx={{ paddingLeft: '25%' }}
                >
                    Sign up to get started
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            type="text"
                            value={username}
                            fullWidth
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
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
                            label="Phone Number"
                            type="tel"
                            value={phoneNumber}
                            fullWidth
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                            Create Account
                        </Button>
                    </Stack>
                </form>

                <GuestButton onClick={handleGuestLogin} />

                <Typography variant="body2" align="center" color="white">
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>
                        Sign In
                    </Link>
                </Typography>
            </Stack>
        </Card>
    );
};

export default Register;
