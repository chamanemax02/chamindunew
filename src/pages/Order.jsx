import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, CheckCircle, Package, Smartphone, Code, Palette, Search,
    PenTool, MessageSquare, Layers, Zap, Activity
} from 'lucide-react';
import TechBackground from '../components/TechBackground';
import { db } from '../firebase/firebaseConfig';
import { ref, onValue, push, set } from 'firebase/database';
import { useNotification } from '../context/NotificationContext';

const iconMap = {
    Code: <Code size={20} />,
    Palette: <Palette size={20} />,
    Smartphone: <Smartphone size={20} />,
    Search: <Search size={20} />,
    PenTool: <PenTool size={20} />,
    Layers: <Layers size={20} />,
    Zap: <Zap size={20} />,
    Activity: <Activity size={20} />
};

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzpzd7qgcEM9LJ8fr8PW7j78FjklvzucNVUsfUoqN3fL9jGylrjQKdy8y_OxOltIDrR/exec';

const Order = () => {
    const { showNotification } = useNotification();
    const [status, setStatus] = useState('idle');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedServices, setSelectedServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        details: ''
    });

    useEffect(() => {
        const servicesRef = ref(db, 'services');
        const unsubscribe = onValue(servicesRef, (snapshot) => {
            const data = snapshot.val();
            const list = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
            setServices(list.sort((a, b) => b.createdAt - a.createdAt));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const toggleService = (id) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedServices.length === 0) {
            showNotification('Please select at least one service.', 'error');
            return;
        }

        setStatus('sending');

        const serviceNames = selectedServices.map(id => services.find(s => s.id === id).name).join(', ');

        const payload = {
            ...formData,
            services: serviceNames,
            type: 'Order',
            createdAt: Date.now()
        };

        try {
            // 1. Save to Realtime Database
            const ordersRef = ref(db, 'orders');
            const newOrderRef = push(ordersRef);
            await set(newOrderRef, payload);

            // 2. Notify via GAS (Keep email notification)
            const params = new URLSearchParams({
                ...formData,
                services: serviceNames,
                type: 'Order'
            });

            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString()
            });

            setStatus('success');
            showNotification("Order placed successfully! I'll contact you soon.");
        } catch (error) {
            console.error("Order error:", error);
            setStatus('error');
            showNotification("Submission error: " + error.message, "error");
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <TechBackground />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="card-p text-center max-w-md mx-auto relative z-10"
                >
                    <div className="flex justify-center mb-6">
                        <div style={{ width: '100px', height: '100px', background: 'rgba(0,255,163,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircle size={50} color="var(--primary)" />
                        </div>
                    </div>
                    <h2 className="section-title-p" style={{ marginBottom: '10px' }}>Order <span>Placed!</span></h2>
                    <p style={{ color: 'var(--text-grey)', marginBottom: '30px' }}>
                        Thank you for your order, {formData.name}. I've received your requirements and will contact you via {formData.contact} or {formData.email} soon.
                    </p>
                    <button onClick={() => window.location.href = '/home'} className="btn-primary">Back to Home</button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="order-wrapper min-h-screen pb-20 relative overflow-hidden">
            <TechBackground />
            <div className="container relative z-10" style={{ maxWidth: '1000px' }}>
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ marginBottom: '20px' }}
                    >
                        <span style={{
                            background: 'rgba(0,255,163,0.1)',
                            color: 'var(--primary)',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>Service Marketplace</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-title-p"
                        style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '15px' }}
                    >
                        Place Your <span>Order</span>
                    </motion.h1>
                    <p style={{ color: 'var(--text-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
                        Select the services you need and provide some details. I'll get back to you with a personalized quote and timeline.
                    </p>
                </header>

                <div className="order-grid-parent">
                    {/* Left Side: Service Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-p"
                        style={{ background: 'rgba(15,15,15,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', padding: '30px' }}
                    >
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '-0.5px' }}>
                            <span style={{ background: 'var(--primary)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>1</span>
                            Select Your Services
                        </h3>

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,255,163,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            </div>
                        ) : services.length === 0 ? (
                            <div className="card-p text-center py-10">
                                <p style={{ color: 'var(--text-grey)' }}>No services available at the moment.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                                {services.map(service => (
                                    <motion.div
                                        key={service.id}
                                        whileHover={{ y: -5, borderColor: 'var(--primary)', background: 'rgba(0,255,163,0.02)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleService(service.id)}
                                        className={`card-p ${selectedServices.includes(service.id) ? 'active-service' : ''}`}
                                        style={{
                                            padding: '15px',
                                            cursor: 'pointer',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            borderWidth: '1px',
                                            borderColor: selectedServices.includes(service.id) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                            background: selectedServices.includes(service.id) ? 'rgba(0,255,163,0.05)' : 'rgba(15,15,15,0.2)',
                                            borderRadius: '16px'
                                        }}
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                background: selectedServices.includes(service.id) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                                color: selectedServices.includes(service.id) ? '#000' : 'var(--primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {iconMap[service.icon] || <Package size={20} />}
                                            </div>
                                            {selectedServices.includes(service.id) && (
                                                <div style={{ background: 'var(--primary)', borderRadius: '50%', padding: '2px' }}>
                                                    <CheckCircle size={14} color="#000" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '4px', color: '#fff' }}>{service.name}</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>{service.price}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right Side: Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="card-p"
                        style={{ background: 'rgba(15,15,15,0.4)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', padding: '30px' }}
                    >
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px', letterSpacing: '-0.5px' }}>
                            <span style={{ background: 'var(--primary)', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</span>
                            Project Briefing
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '15px'
                            }}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="input-p"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="input-p"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="WhatsApp / Telegram / Phone"
                                className="input-p"
                                required
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            />
                            <textarea
                                placeholder="Tell me more about your requirements (Preferred colors, references, etc.)"
                                className="input-p"
                                style={{ minHeight: '150px', resize: 'none' }}
                                required
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            ></textarea>

                            <div style={{
                                background: 'rgba(0,255,163,0.03)',
                                padding: '20px',
                                borderRadius: '16px',
                                border: '1px solid rgba(0,255,163,0.1)',
                                marginTop: '10px',
                                marginBottom: '5px'
                            }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-grey)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Layers size={16} color="var(--primary)" />
                                    Selected: <span style={{ color: 'var(--primary)', fontWeight: '800' }}>
                                        {selectedServices.length > 0
                                            ? selectedServices.map(id => services.find(s => s.id === id).name).join(', ')
                                            : 'None'}
                                    </span>
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 255, 163, 0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn-primary"
                                disabled={status === 'sending'}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', height: '55px' }}
                            >
                                {status === 'sending' ? (
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        border: '3px solid rgba(0,0,0,0.1)',
                                        borderTopColor: '#000',
                                        borderRadius: '50%',
                                        animation: 'spin 0.8s linear infinite'
                                    }}></div>
                                ) : (
                                    <>Submit Order <Send size={18} /></>
                                )}
                            </motion.button>
                            {status === 'error' && <p style={{ color: '#ff6b6b', textAlign: 'center', fontSize: '0.8rem' }}>Something went wrong. Please try again.</p>}
                        </form>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .order-wrapper {
                    padding-top: 220px;
                }
                @media (max-width: 768px) {
                    .order-wrapper {
                        padding-top: 180px;
                    }
                }
                .order-grid-parent {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                    align-items: start;
                }
                @media (min-width: 768px) {
                    .order-grid-parent {
                        grid-template-columns: 1.1fr 1fr;
                        gap: 30px;
                    }
                }
                @media (min-width: 1200px) {
                    .container { max-width: 1200px !important; }
                }
                .active-service {
                    border-color: var(--primary) !important;
                    box-shadow: 0 0 25px rgba(0,255,163,0.15);
                }
                .min-h-screen { min-height: 100vh; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default Order;
