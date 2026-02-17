import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import GitHubCallback from './pages/GitHubCallback';
import TechBackground from './components/TechBackground';
import Order from './pages/Order';
import PrivacyPolicy from './pages/PrivacyPolicy';

const LoadingScreen = () => (
    <div style={{
        height: '100vh',
        width: '100%',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        <p style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.7rem', fontWeight: '800' }}>INITIALIZING</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

function App() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading && !user) return <LoadingScreen />;

    return (
        <NotificationProvider>
            <div className="app-wrapper">
                <TechBackground />
                <Notification />

                {/* Navbar is global */}
                <Navbar />

                <div className="content-wrapper" role="main" style={{ position: 'relative', zIndex: 2 }}>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname.split('/')[1] || 'root'}>
                            {/* Public Routes */}
                            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" replace />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/auth/github/callback" element={<GitHubCallback />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />

                            {/* Protected All-in-One Home Sections */}
                            <Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />
                            <Route path="/about" element={user ? <Home /> : <Navigate to="/login" replace />} />
                            <Route path="/services" element={user ? <Home /> : <Navigate to="/login" replace />} />
                            <Route path="/portfolio" element={user ? <Home /> : <Navigate to="/login" replace />} />
                            <Route path="/testimonials" element={user ? <Home /> : <Navigate to="/login" replace />} />
                            <Route path="/contact" element={user ? <Home /> : <Navigate to="/login" replace />} />

                            {/* Admin Route */}
                            <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" replace />} />

                            {/* Fallbacks */}
                            <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </AnimatePresence>
                </div>
            </div>
        </NotificationProvider>
    );
}

export default App;
