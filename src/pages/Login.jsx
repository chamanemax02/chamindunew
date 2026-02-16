import React, { useState } from 'react';
import { Github, Facebook, Chrome, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = () => {
    const { user, handleGoogleLogin, handleFacebookLogin } = useAuth();
    const navigate = useNavigate();
    const [isSimulating, setIsSimulating] = useState(false);

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
            padding: '20px'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-p"
                style={{
                    width: '100%',
                    maxWidth: '440px',
                    padding: '60px 40px',
                    textAlign: 'center',
                    background: 'rgba(15, 15, 15, 0.7)',
                    backdropFilter: 'blur(30px)',
                    zIndex: 10,
                    borderRadius: '40px'
                }}
            >
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(0,255,163,0.1)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        margin: '0 auto 24px',
                        border: '1px solid rgba(0,255,163,0.2)'
                    }}>
                        <ShieldCheck size={40} />
                    </div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1.5px' }}>Portal Login</h1>
                    <p style={{ color: 'var(--text-grey)', fontSize: '1rem', fontWeight: '500' }}>Choose your preferred access method</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-col flex gap-5"
                >
                    {/* Google Login Component */}
                    <div style={{ width: '100%', overflow: 'hidden', borderRadius: '20px' }}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                handleGoogleLogin(credentialResponse);
                                navigate('/home');
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                            theme="filled_black"
                            width="100%"
                        />
                    </div>

                    {/* Facebook Login Component */}
                    <FacebookLogin
                        appId="YOUR_FACEBOOK_APP_ID"
                        callback={(response) => {
                            handleFacebookLogin(response);
                            if (response.accessToken) navigate('/home');
                        }}
                        render={renderProps => (
                            <LoginButton
                                icon={<Facebook size={22} />}
                                text="Facebook Login"
                                bg="#1877F2"
                                onClick={renderProps.onClick}
                            />
                        )}
                    />

                    {/* GitHub Login Button */}
                    <LoginButton
                        icon={<Github size={22} />}
                        text="GitHub Account"
                        bg="#24292e"
                        onClick={handleGithubLogin}
                    />
                </motion.div>

                {isSimulating && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,255,163,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

const LoginButton = ({ icon, text, bg, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        style={{
            background: bg,
            color: '#fff',
            padding: '18px',
            borderRadius: '20px',
            fontWeight: '800',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            border: 'none',
            boxShadow: `0 15px 30px ${bg}15`,
            cursor: 'pointer',
            width: '100%'
        }}
    >
        {icon} {text}
    </motion.button>
);

export default Login;
