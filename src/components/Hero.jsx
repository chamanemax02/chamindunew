import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            {/* Background Glow */}
            <div className="glow-overlay" style={{ top: '20%', left: '10%' }}></div>
            <div className="glow-overlay" style={{ bottom: '20%', right: '10%', background: 'var(--orange-glow)' }}></div>

            {/* Profile Image - Centered and Large */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                style={{
                    width: 'clamp(140px, 35vw, 240px)',
                    height: 'clamp(140px, 35vw, 240px)',
                    borderRadius: '50%', // Circular
                    padding: '8px',
                    border: '1px solid rgba(0, 255, 163, 0.2)',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(20px)',
                    marginBottom: 'clamp(20px, 4vh, 40px)',
                    position: 'relative',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <img
                    src="/profil.png"
                    alt="Chamindu"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%', // Circular
                    }}
                />
            </motion.div>

            {/* Name & Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ width: '100%' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                    <h1 style={{
                        fontWeight: '900',
                        color: '#fff',
                        letterSpacing: 'clamp(-2px, -0.5vw, -0.5px)',
                        lineHeight: 1,
                        fontSize: 'clamp(2.2rem, 10vw, 5rem)',
                        textShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        textAlign: 'center'
                    }}>
                        Mr. Chamindu <span style={{ color: 'var(--primary)', textShadow: '0 0 30px var(--primary-glow)' }}>Ransika</span>
                    </h1>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        background: '#3182ce',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0
                    }}>
                        <svg width="60%" height="60%" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    </div>
                </div>
                <p style={{
                    color: '#888',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginBottom: 'clamp(20px, 4vh, 40px)',
                    maxWidth: '800px',
                    marginInline: 'auto',
                    lineHeight: '1.6',
                    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)'
                }}>
                    Specializing in <span style={{ color: '#fff' }}>high-end digital experiences</span>, scalable full-stack architectures, and AI-driven creative solutions. Dedicated to building clean, powerful, and user-centric applications.
                </p>
            </motion.div>

            {/* Role Badges */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center gap-2 flex-wrap"
                style={{ maxWidth: '700px', marginBottom: '50px' }}
            >
                {['DEVELOPER', 'DESIGNER', 'AI CREATIVE', 'FOUNDER'].map((role) => (
                    <span
                        key={role}
                        style={{
                            fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', // Increased size
                            fontWeight: '900',
                            padding: '10px 24px', // Increased padding
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '100px',
                            color: '#fff',
                            letterSpacing: '1.5px',
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
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center gap-8"
            >
                <SocialIcon icon={<Linkedin size={28} />} href="https://www.linkedin.com/in/chamindu-ransika-2008-chama" />
                <SocialIcon icon={<Github size={28} />} href="https://github.com/chamindu-ransika" />
            </motion.div>
        </div>
    );
};

const Counter = ({ value, label }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', padding: '0 10px' }}
    >
        <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: '900', color: 'var(--primary)', marginBottom: '5px' }}>{value}</h3>
        <p style={{ fontSize: '0.6rem', fontWeight: '800', color: '#666', letterSpacing: '1px', maxWidth: '100px', margin: '0 auto' }}>{label}</p>
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
