import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzI9xXG6p45O_uU4nS6_W_U_N_U_N/exec';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, adminEmail: 'ransikachamindu43@gmail.com' }),
            });
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) { setStatus('error'); }
    };

    return (
        <div className="container" style={{ paddingTop: '50px' }}>
            <h2 className="section-title-p">Get In <span>Touch</span></h2>
            
            <div className="grid-2">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '20px' }}>Let's Work Together</h3>
                    <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', marginBottom: '40px' }}>
                        Whether you have a specific project in mind or just want to explore possibilities, 
                        I'm always open to discussing new ideas and challenges.
                    </p>

                    <div className="flex flex-col gap-8">
                        <ContactInfo icon={<Mail color="var(--primary)" />} title="Email Me" text="ransikachamindu43@gmail.com" />
                        <ContactInfo icon={<Phone color="var(--primary)" />} title="Call Me" text="+94 71 234 5678" />
                        <ContactInfo icon={<MapPin color="var(--primary)" />} title="Location" text="Sri Lanka, Southern Province" />
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="card-p"
                >
                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <center><div style={{ width: '80px', height: '80px', background: 'rgba(0,255,163,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                <MessageCircle size={40} color="var(--primary)" />
                            </div></center>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px' }}>Message Sent!</h3>
                            <p style={{ color: 'var(--text-grey)' }}>I'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="input-p" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="input-p" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                            <textarea 
                                placeholder="Tell me about your project..." 
                                className="input-p" 
                                style={{ minHeight: '180px', resize: 'none' }}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                            
                            <button 
                                type="submit" 
                                className="btn-primary" 
                                disabled={status === 'sending'}
                                style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
                            </button>
                            {status === 'error' && <p style={{ color: '#ff6b6b', textAlign: 'center', fontSize: '0.8rem' }}>Something went wrong. Please try again.</p>}
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

const ContactInfo = ({ icon, title, text }) => (
    <div className="flex gap-4 items-center">
        <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</span>
            <p style={{ fontWeight: '700', color: '#fff' }}>{text}</p>
        </div>
    </div>
);

export default Contact;
