// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/dashboard')
            .then(res => setMessage(res.data.message))
            .catch(err => {
                console.error(err); // <-- Use the variable
                setMessage('Unauthorized or error occurred');
            });
        console.log('Token in localStorage:', localStorage.getItem('token'));
    }, []);


    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;
