// src/pages/Register.tsx
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
            });
            alert(res.data);
        } catch (err) {
            alert('Registration failed');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            /><br />
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            /><br />
            <button type="submit">Register</button>
        </form>
    );
}
