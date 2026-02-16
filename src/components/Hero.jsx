import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
            {/* Main Title Section */}
            <div style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                    fontWeight: '900',
                    color: '#fff',
                    letterSpacing: '-1px',
                    lineHeight: 1.1,
                    marginBottom: '40px',
                    maxWidth: '900px'
                }}>
                    <TypeAnimation
                        sequence={[
                            'HELLO I AM ',
                            500,
                            'HELLO I AM MR CHAMINDU RANSIKA',
                            2000
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        style={{ display: 'block' }}
                    />
                    <style>{`
                        .type-primary { color: var(--primary); }
                    `}</style>
                </h1>
            </div>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                style={{
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    color: '#888',
                    maxWidth: '800px',
                    margin: '0 auto 60px',
                    fontWeight: '500',
                    lineHeight: '1.6'
                }}
            >
                Premier Digital Studio & AI Solutions <br /> specialized in high-end digital experiences.
            </motion.p>

            {/* Counters */}
            <div className="flex justify-center flex-wrap gap-6 md:gap-32 mb-12 px-4">
                <Counter value="50" label="PROJECTS COMPLETED" />
                <Counter value="30" label="HAPPY CLIENTS" />
                <Counter value="2021-2026" label="YEARS EXPERIENCE" />
            </div>

            {/* Social Icons Below Counters */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="flex justify-center gap-8 mb-20"
            >
                <SocialIcon icon={<Linkedin size={24} />} href="https://linkedin.com/in/chaminduransika" />
                <SocialIcon icon={<Github size={24} />} href="https://github.com/chamindu-ransika" />
            </motion.div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-10 flex-wrap">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 40px var(--primary-glow)' }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    style={{ minWidth: '200px', padding: '16px 40px' }}
                    onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                >
                    View Our Work
                </motion.button>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.4 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 40px var(--primary-glow)' }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    style={{ minWidth: '200px', padding: '16px 40px' }}
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                >
                    Hire Me Now
                </motion.button>
            </div>
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
