import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GitHubCallback = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('Processing login...');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');

        if (code) {
            setStatus('Authorizing with GitHub...');
            // In a real production app, you would send this 'code' to your backend.
            // Since we don't have a backend, we will simulate the success for the UI challenge.

            setTimeout(() => {
                const userData = {
                    name: 'GitHub User',
                    email: 'github_user@example.com',
                    picture: 'https://github.com/identicons/jasonlong.png',
                    provider: 'github'
                };
                login(userData);
                navigate('/home');
            }, 300);
        } else {
            setStatus('No authorization code found.');
            setTimeout(() => navigate('/login'), 2000);
        }
    }, [location, login, navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            color: 'var(--primary)',
            gap: '20px'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(0,255,163,0.1)',
                borderTopColor: 'var(--primary)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }}></div>
            <h2 style={{ letterSpacing: '2px', fontSize: '1rem' }}>{status}</h2>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default GitHubCallback;
