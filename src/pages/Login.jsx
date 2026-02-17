import React, { useState } from 'react';
import { Github, Chrome, ShieldCheck, Mail, Lock, User as UserIcon, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const { user, handleGoogleLogin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    if (user) return <Navigate to="/home" />;

    const handleGithubLogin = () => {
        const clientId = 'Ov23liXTuHUhqhw755YX';
        const redirectUri = window.location.origin + '/auth/github/callback';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    };

    return (
        <div className="login-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #0a0a0a 0%, #000 100%)',
            padding: '20px',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'var(--primary-glow)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }}></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-container"
            >
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px', marginBottom: '8px' }}>
                        Welcome
                    </h1>
                    <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem' }}>
                        Secure authorization required to enter.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                        <GoogleLogin
                            onSuccess={(resp) => { handleGoogleLogin(resp); navigate('/home'); }}
                            theme="filled_black"
                            shape="pill"
                            text="continue_with"
                            width="280"
                        />
                    </div>

                    <SocialLargeBtn
                        onClick={handleGithubLogin}
                        icon={<Github size={24} />}
                        label="Authorise with GitHub"
                        color="#24292e"
                    />
                </div>
            </motion.div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const SocialLargeBtn = ({ icon, label, onClick, color = 'rgba(255,255,255,0.03)', isGoogle = false }) => (
    <motion.button
        whileHover={{ scale: 1.02, background: isGoogle ? 'transparent' : 'rgba(255,255,255,0.05)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        style={{
            width: '100%',
            height: isGoogle ? '40px' : '56px',
            background: isGoogle ? 'transparent' : color,
            border: isGoogle ? 'none' : '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: '700',
            cursor: 'pointer',
            overflow: 'hidden'
        }}
    >
        {icon}
        {!isGoogle && <span>{label}</span>}
    </motion.button>
);

const SocialSmallBtn = ({ icon, onClick, color = '#24292e' }) => (
    <motion.button
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        style={{
            flex: 1,
            height: '50px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer'
        }}
    >
        {icon}
    </motion.button>
);

export default Login;
