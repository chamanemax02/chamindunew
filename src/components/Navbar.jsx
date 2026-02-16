import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAdmin, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20 || document.getElementById('scroll-container')?.scrollTop > 20);
        };

        const container = document.getElementById('scroll-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        } else {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            container?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/portfolio' },
        { name: 'Reviews', path: '/testimonials' },
        { name: 'Order', path: '/order' },
        { name: 'Contact', path: '/contact' },
    ];

    const isHomePage = ['/', '/home', '/about', '/services', '/portfolio', '/testimonials', '/contact', '/order'].includes(location.pathname);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container">
                <div className="nav-container-inner" style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    gap: mobileMenuOpen ? '0' : '5px',
                    paddingLeft: '0' // Absolute edge
                }}>
                    <style>{`
                        @media (max-width: 1024px) {
                            .nav-container-inner { padding-left: 0 !important; }
                        }
                    `}</style>
                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="menu-toggle"
                        onClick={toggleMobileMenu}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            width: '45px',
                            height: '45px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            order: -1
                        }}
                    >
                        {mobileMenuOpen ? <X size={24} color="var(--primary)" /> : <Menu size={24} color="#fff" />}
                    </button>

                    <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            border: '2px solid var(--primary)',
                            padding: '2px',
                            overflow: 'hidden',
                            background: 'rgba(0, 255, 163, 0.05)',
                            transition: 'transform 0.3s ease'
                        }}
                            className="nav-logo-img"
                        >
                            <img
                                src="/profil.png"
                                alt="Logo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%'
                                }}
                            />
                        </div>
                    </Link>
                    <div className="nav-links" style={{ marginLeft: 'auto' }}>
                        {isHomePage && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`nav-link-item ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex items-center gap-4">
                            {user && (
                                <button
                                    onClick={logout}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#fff',
                                        opacity: 0.4,
                                        cursor: 'pointer',
                                        padding: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        transition: 'var(--transition)'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                    <style>{`
                        @media (max-width: 1024px) {
                            .menu-toggle { display: flex !important; position: relative; z-index: 2501; }
                            .nav-links { display: none; }
                            .desktop-only-brand { display: none; }
                        }
                    `}</style>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                width: '100%',
                                height: '100vh',
                                background: 'rgba(5,5,5,0.98)',
                                backdropFilter: 'blur(15px)',
                                zIndex: 2000,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '30px'
                            }}
                        >
                            {isHomePage && navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={closeMobileMenu}
                                    style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user && (
                                <button onClick={() => { logout(); closeMobileMenu(); }} style={{ color: '#ff4d4d', fontWeight: '700', marginTop: '30px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <LogOut size={20} /> Sign Out
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
