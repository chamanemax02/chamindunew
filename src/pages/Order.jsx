import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, CheckCircle, Package, Smartphone, Code, Palette, Search,
    PenTool, MessageSquare, Layers, Zap, Activity
} from 'lucide-react';
import TechBackground from '../components/TechBackground';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, orderBy, query, addDoc } from 'firebase/firestore';

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

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzI9xXG6p45O_uU4nS6_W_U_N_U_N/exec';

const Order = () => {
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
        const fetchServices = async () => {
            try {
                const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
                const snap = await getDocs(q);
                const fetchedServices = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setServices(fetchedServices);
            } catch (err) {
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const toggleService = (id) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedServices.length === 0) {
            alert('Please select at least one service.');
            return;
        }

        setStatus('sending');

        const serviceNames = selectedServices.map(id => services.find(s => s.id === id).name).join(', ');

        const payload = {
            ...formData,
            services: serviceNames,
            type: 'Order',
            adminEmail: 'ransikachamindu43@gmail.com',
            createdAt: new Date().toISOString()
        };

        try {
            // Backup to Firestore
            await addDoc(collection(db, 'orders'), {
                ...payload,
                status: 'new'
            });

            // Original Google Script notification
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            setStatus('success');
        } catch (error) {
            console.error("Order submission error:", error);
            setStatus('error');
            alert("Submission error: " + error.message);
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
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            <TechBackground />
            <div className="container relative z-10">
                <header className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-title-p"
                    >
                        Place Your <span>Order</span>
                    </motion.h1>
                    <p style={{ color: 'var(--text-grey)', maxWidth: '600px', margin: '0 auto' }}>
                        Select the services you need and provide some details. I'll get back to you with a personalized quote and timeline.
                    </p>
                </header>

                <div className="flex flex-col gap-10">
                    {/* Left Side: Service Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Package color="var(--primary)" /> Select Services
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
                            <div className="grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                                gap: '15px'
                            }}>
                                {services.map(service => (
                                    <div
                                        key={service.id}
                                        onClick={() => toggleService(service.id)}
                                        className={`card-p ${selectedServices.includes(service.id) ? 'active-service' : ''}`}
                                        style={{
                                            padding: '20px',
                                            cursor: 'pointer',
                                            borderColor: selectedServices.includes(service.id) ? 'var(--primary)' : 'var(--border)',
                                            background: selectedServices.includes(service.id) ? 'rgba(0,255,163,0.05)' : 'var(--bg-card)'
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div style={{ color: selectedServices.includes(service.id) ? 'var(--primary)' : '#fff' }}>
                                                {iconMap[service.icon] || <Package size={20} />}
                                            </div>
                                            {selectedServices.includes(service.id) && <CheckCircle size={16} color="var(--primary)" />}
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '5px' }}>{service.name}</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.price}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right Side: Contact Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="card-p">
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MessageSquare color="var(--primary)" /> Project Details
                            </h3>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                                    background: 'rgba(255,255,255,0.02)',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    marginBottom: '10px'
                                }}>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-grey)' }}>
                                        Selected Services: <span style={{ color: 'var(--primary)', fontWeight: '700' }}>
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
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .active-service {
                    border-color: var(--primary) !important;
                    box-shadow: 0 0 20px rgba(0,255,163,0.1);
                }
                .min-h-screen { min-height: 100vh; }
            `}</style>
        </div>
    );
};

export default Order;
