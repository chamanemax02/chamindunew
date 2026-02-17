import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, Github, Linkedin, ShieldCheck } from 'lucide-react';
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
                <div className="nav-container-inner" id="navbar-top">
                    <div className="flex items-center gap-4">
                        <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'calc(8px + 0.5vw)' }}>
                            <div style={{
                                width: 'clamp(32px, 5vw, 42px)',
                                height: 'clamp(32px, 5vw, 42px)',
                                borderRadius: '50%',
                                // background: 'linear-gradient(135deg, var(--primary) 0%, #00b377 100%)', // Removed gradient
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                // boxShadow: '0 0 20px var(--primary-glow)' // Removed excess glow if not needed
                            }}>
                                <img src="/profil.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{
                                fontWeight: '900',
                                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                letterSpacing: '-0.5px',
                                color: '#fff',
                                textTransform: 'uppercase'
                            }}>CHAMINDU<span style={{ color: 'var(--primary)', opacity: 0.8 }}>.SITE</span></span>
                        </Link>
                    </div>

                    <div className="nav-links flex items-center gap-8">
                        {isHomePage && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`nav-link-item ${location.pathname === link.path ? 'active' : ''}`}
                                style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {isAdmin && (
                            <Link
                                to="/admin"
                                style={{
                                    background: 'rgba(0,255,163,0.1)',
                                    border: '1px solid rgba(0,255,163,0.2)',
                                    color: 'var(--primary)',
                                    padding: '10px 15px',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textDecoration: 'none',
                                    fontSize: '0.8rem',
                                    fontWeight: '800'
                                }}
                                title="Admin Panel"
                            >
                                <ShieldCheck size={18} />
                                <span className="desktop-only-text">ADMIN</span>
                            </Link>
                        )}
                        {user && (
                            <button
                                onClick={logout}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff',
                                    padding: '10px',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        )}
                        <button
                            className="menu-toggle"
                            onClick={toggleMobileMenu}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                display: 'none',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Menu size={22} color="#fff" />
                        </button>
                    </div>

                    <style>{`
                        @media (max-width: 1024px) {
                            .menu-toggle { display: flex !important; }
                            .nav-links { display: none; }
                            .desktop-only-brand { display: none; }
                            .desktop-only-text { display: none; }
                        }
                    `}</style>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            width: '100%',
                            height: '100vh',
                            background: '#0d0d0d',
                            zIndex: 9999,
                            padding: '40px 30px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    <img src="/profil.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <span style={{ fontWeight: '900', fontSize: '1.1rem', color: '#fff', letterSpacing: '1px' }}>CHAMINDU</span>
                            </div>
                            <button
                                onClick={closeMobileMenu}
                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <X size={24} color="#fff" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6" style={{ overflowY: 'auto', flex: 1 }}>
                            {isHomePage && navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={closeMobileMenu}
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '800',
                                        color: location.pathname === link.path ? 'var(--primary)' : '#888',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px'
                                    }}
                                    className="mobile-nav-link"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={closeMobileMenu}
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '800',
                                        color: 'var(--primary)',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                >
                                    <ShieldCheck size={28} /> ADMIN PANEL
                                </Link>
                            )}

                            {user && (
                                <button
                                    onClick={() => { logout(); closeMobileMenu(); }}
                                    style={{ color: '#ff4d4d', fontWeight: '800', background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.1)', borderRadius: '12px', padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}
                                >
                                    <LogOut size={18} /> SIGN OUT
                                </button>
                            )}
                        </div>
                        <style>{`
                            .mobile-nav-link:hover { color: var(--primary) !important; }
                        `}</style>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
