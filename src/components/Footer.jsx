import React from 'react';
import { Github, Linkedin, Twitter, Heart, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            marginTop: '100px',
            padding: '80px 0 40px',
            borderTop: '1px solid var(--border)',
            background: 'linear-gradient(to bottom, transparent, rgba(0,255,163,0.02))'
        }}>
            <div className="container">
                <div className="grid-3" style={{ marginBottom: '80px', gap: '60px' }}>
                    <div>
                        <h2 className="nav-logo" style={{ marginBottom: '25px', fontSize: '1.4rem', letterSpacing: '2px' }}>
                            CHAMINDU <span style={{ color: 'var(--primary)' }}>RANSIKA</span>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '350px', fontSize: '1rem', lineHeight: 1.8 }}>
                            Transforming complex business requirements into high-end digital experiences through innovative code and premium design.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Quick Navigation</h4>
                        <div className="flex flex-col gap-3">
                            <FooterLink to="/home" label="Home" />
                            <FooterLink to="/about" label="About" />
                            <FooterLink to="/portfolio" label="Projects" />
                            <FooterLink to="/testimonials" label="Reviews" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <h4 style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Social Media</h4>
                        <div className="flex gap-5">
                            <SocialLink icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/chamindu-ransika-2008-chama" />
                            <SocialLink icon={<Twitter size={20} />} href="https://x.com/chamindu_dev" />
                            <SocialLink icon={<Github size={20} />} href="https://github.com/chamindu-ransika" />
                            <SocialLink icon={<Briefcase size={20} />} href="#" />
                        </div>
                        <div>
                            <p style={{ color: '#444', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase' }}>Work Availability</p>
                            <p style={{ color: 'var(--primary)', fontWeight: '700' }}>Open for Remote Collaboration</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center flex-wrap gap-6" style={{ paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <p style={{ fontSize: '0.9rem', color: '#444', fontWeight: '800', letterSpacing: '1px' }}>
                            © 2021 - 2026 CHAMINDU RANSIKA Studio
                        </p>
                        <Link to="/privacy" style={{ fontSize: '0.75rem', color: '#333', textDecoration: 'none', fontWeight: '700' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = '#333'}>PRIVACY POLICY</Link>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#444', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        CRAFTED WITH <Heart size={16} color="var(--primary)" fill="var(--primary)" /> IN SRI LANKA
                    </p>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ to, label }) => (
    <Link
        to={to}
        style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.3s ease', textDecoration: 'none' }}
        onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
        onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
    >
        {label}
    </Link>
);

const SocialLink = ({ icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
            width: '50px',
            height: '50px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid var(--border)'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.color = 'var(--primary)';
            e.currentTarget.style.transform = 'translateY(-5px)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'translateY(0)';
        }}
    >
        {icon}
    </a>
)

export default Footer;
