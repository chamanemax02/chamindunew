import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Profile Image - Centered and Large */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                style={{
                    width: 'clamp(180px, 30vw, 240px)',
                    height: 'clamp(180px, 30vw, 240px)',
                    borderRadius: '50%',
                    padding: '8px',
                    border: '2px solid rgba(0, 255, 163, 0.2)',
                    background: 'rgba(255,255,255,0.02)',
                    marginBottom: '40px',
                    position: 'relative'
                }}
            >
                <img
                    src="/profil.png"
                    alt="Chamindu"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        filter: 'grayscale(20%)'
                    }}
                />
            </motion.div>

            {/* Name & Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className="flex items-center justify-center gap-3 mb-2">
                    <h1 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                        fontWeight: '900',
                        color: '#fff',
                        letterSpacing: '-1.5px',
                    }}>
                        Chamindu Ransika
                    </h1>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        background: '#3182ce',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}>
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    </div>
                </div>
                <p style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    color: '#666',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    marginBottom: '40px',
                    maxWidth: '600px',
                    lineHeight: '1.6'
                }}>
                    Specialized in high-end digital experiences, full-stack architectures, and AI-driven creative solutions for modern brands.
                </p>
            </motion.div>

            {/* Role Badges */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex justify-center gap-2 md:gap-3 flex-wrap mb-8"
                style={{ maxWidth: '600px' }}
            >
                {['DEVELOPER', 'DESIGNER', 'CODER', 'AI CREATIVE', 'FOUNDER'].map((role) => (
                    <span
                        key={role}
                        style={{
                            fontSize: 'clamp(0.55rem, 2vw, 0.7rem)',
                            fontWeight: '800',
                            padding: '8px 16px md:10px 24px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '50px',
                            color: '#fff',
                            letterSpacing: '1px',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {role}
                    </span>
                ))}
            </motion.div>

            {/* Minimal Social Links */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex justify-center gap-8 md:gap-10 mb-20"
            >
                <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com/in/chaminduransika" />
                <SocialIcon icon={<Github size={20} />} href="https://github.com/chamindu-ransika" />
            </motion.div>
        </div>
    );
};

const Counter = ({ value, label }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        style={{ textAlign: 'center', padding: '0 10px' }}
    >
        <h3 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' }}>{value}</h3>
        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: '#666', letterSpacing: '1px', maxWidth: '120px', margin: '0 auto' }}>{label}</p>
    </motion.div>
);

const SocialIcon = ({ icon, href }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -5, color: 'var(--primary)' }}
        style={{ color: '#fff', transition: 'all 0.3s ease' }}
    >
        {icon}
    </motion.a>
);

export default Hero;
