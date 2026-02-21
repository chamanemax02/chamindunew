// BUILD_TAG: UI_REFRESH_FORCE
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className="container" style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 5
        }}>
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
                    marginBottom: 'clamp(15px, 3vh, 30px)',
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
                        <TypeAnimation
                            sequence={[
                                "Mr. Chamindu Ransika",
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            cursor={true}
                            style={{ display: 'inline-block' }}
                            repeat={0}
                        />
                    </h1>
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

            {/* Advanced Infinite Marquee Roles */}
            <div style={{
                width: '100vw',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '40px',
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                transform: 'rotate(-1deg)', // Subtle skew for 3D feel
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {/* Row 1: Right to Left */}
                <motion.div
                    animate={{ x: [0, -1200] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'flex', gap: '20px', width: 'max-content' }}
                >
                    {[...['DEVELOPER', 'DESIGNER', 'AI CREATIVE', 'FOUNDER', 'FULL STACK', 'UI/UX'], ...['DEVELOPER', 'DESIGNER', 'AI CREATIVE', 'FOUNDER', 'FULL STACK', 'UI/UX'], ...['DEVELOPER', 'DESIGNER', 'AI CREATIVE', 'FOUNDER', 'FULL STACK', 'UI/UX']].map((role, idx) => (
                        <MarqueeBadge key={`r1-${idx}`} label={role} />
                    ))}
                </motion.div>

                {/* Row 2: Left to Right */}
                <motion.div
                    animate={{ x: [-1200, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'flex', gap: '20px', width: 'max-content' }}
                >
                    {[...['APP DEV', 'BACKEND', 'SOLUTIONS', 'ARCHITECT', 'SYSTEMS', 'WEB3'], ...['APP DEV', 'BACKEND', 'SOLUTIONS', 'ARCHITECT', 'SYSTEMS', 'WEB3'], ...['APP DEV', 'BACKEND', 'SOLUTIONS', 'ARCHITECT', 'SYSTEMS', 'WEB3']].map((role, idx) => (
                        <MarqueeBadge key={`r2-${idx}`} label={role} />
                    ))}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center"
                style={{ gap: '24px' }}
            >
                <SocialIcon icon={<Linkedin size={26} />} href="https://www.linkedin.com/in/chamindu-ransika-2008-chama" />
                <SocialIcon icon={<Twitter size={26} />} href="https://x.com/chamindu_dev" />
                <SocialIcon icon={<Github size={26} />} href="https://github.com/chamindu-ransika" />
            </motion.div>
        </div>
    );
};

const MarqueeBadge = ({ label }) => (
    <motion.span
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'var(--primary)' }}
        style={{
            fontSize: 'clamp(0.65rem, 1.8vw, 0.8rem)',
            fontWeight: '800',
            padding: '12px 28px',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '100px',
            color: '#fff',
            letterSpacing: '2px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'border-color 0.3s ease, background-color 0.3s ease'
        }}
    >
        {label}
    </motion.span>
);

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
