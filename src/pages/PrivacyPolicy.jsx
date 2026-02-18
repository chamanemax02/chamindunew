import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ padding: '80px 20px 60px' }}>
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)}
                style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '30px',
                    fontSize: '0.9rem',
                    fontWeight: '700'
                }}
            >
                <ArrowLeft size={18} /> GO BACK
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-p"
                style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
            >
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', color: 'var(--primary)', marginBottom: '5px' }}>
                        PrivacyPolicy
                    </h1>
                    <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem' }}>Last updated: February 17, 2026</p>
                </div>

                <div className="flex flex-col gap-2">
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Shield size={22} color="var(--primary)" /> Introduction
                        </h2>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Welcome to the official portfolio of **Chamindu Ransika**. This Privacy Policy explains how I collect, use, and protect your information when you use my website and its services, including the contact forms and authentication systems.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Eye size={22} color="var(--primary)" /> InformationWeCollect
                        </h2>
                        <p style={{ marginBottom: '10px', fontSize: '0.95rem' }}>I collect information to provide better services to you and to ensure the security of my platform:</p>
                        <ul style={{ color: 'var(--text-grey)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                            <li>**Personal Data:** When you contact me via the contact form or place an order, I collect your name, email address, and message content.</li>
                            <li>**Authentication Data:** If you choose to sign in via Google or GitHub, I receive your public profile information (name, email, profile picture) as permitted by the respective platform's settings.</li>
                            <li>**Usage Data:** I may collect diagnostic data about how the site is accessed and used to improve performance and user experience.</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Lock size={22} color="var(--primary)" /> DataUsage&Security
                        </h2>
                        <p style={{ fontSize: '0.95rem' }}>
                            Your data is stored securely using **Firebase Realtime Database**. I use your information exclusively for communication, processing orders, and providing a personalized experience (such as autofilling your name in reviews).
                        </p>
                        <p style={{ marginTop: '8px', fontSize: '0.95rem' }}>
                            **I do not sell or share your personal data with third-party advertisers.** Security is a priority, and I implement industry-standard encryption and access controls to protect your information.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={22} color="var(--primary)" /> Cookies&Tracking
                        </h2>
                        <p style={{ fontSize: '0.95rem' }}>
                            This site uses a small number of essential cookies and local storage tokens to maintain your login session and preferences. These are necessary for the functional operation of the portfolio's advanced features.
                        </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                        <h3 style={{ color: '#fff', fontWeight: '800', marginBottom: '10px', fontSize: '1.1rem' }}>Contact for Privacy Concerns</h3>
                        <p style={{ fontSize: '0.9rem' }}>If you have any questions about this policy or wish to request the deletion of your data, please contact me at: <a href="mailto:ransikachamindu43@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>ransikachamindu43@gmail.com</a></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
