// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/Dashboard.css';

interface User {
    username: string;
    email: string;
    phoneNumber: string;
}

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/dashboard')
            .then(res => {
                setMessage(res.data.message);
                setUser(res.data.user);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setMessage('Unauthorized or error occurred');
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2 className="dashboard-title">Dashboard</h2>
                <p className="dashboard-welcome">{message}</p>

                {user && (
                    <div className="user-info-container">
                        <h3 className="user-info-title">User Information</h3>
                        <div className="user-info-item">
                            <span className="info-label">Username</span>
                            <span className="info-value">{user.username}</span>
                        </div>
                        <div className="user-info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                        <div className="user-info-item">
                            <span className="info-label">Phone</span>
                            <span className="info-value">{user.phoneNumber}</span>
                        </div>
                    </div>
                )}

                <button className="logout-button" onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;