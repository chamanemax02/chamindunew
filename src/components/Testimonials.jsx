import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { Star, MessageSquare, Send, CheckCircle, Quote } from 'lucide-react';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', company: '', text: '', rating: 5 });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const q = query(collection(db, "testimonials"), where("status", "==", "approved"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (data.length === 0) {
                setReviews([
                    { id: 1, name: "Alexander Wright", company: "TechFlow Solutions", text: "Chamindu's ability to translate complex requirements into elegant code is unmatched. A true professional.", rating: 5 },
                    { id: 2, name: "Sarah J. Miller", company: "Creative Minds Agency", text: "The UI/UX delivered for our project was beyond expectations. Highly recommended for any high-end project.", rating: 5 }
                ]);
            } else { setReviews(data); }
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "testimonials"), {
                ...formData,
                status: 'pending',
                createdAt: serverTimestamp()
            });
            setSubmitted(true);
            setTimeout(() => { setShowForm(false); setSubmitted(false); }, 5000);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Submission failed. Please check your internet connection and try again. Error: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-between items-center mb-16 flex-wrap gap-10"
            >
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', marginBottom: '10px', lineHeight: 1 }}>Global <span style={{ color: 'var(--primary)' }}>Trust</span></h2>
                    <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem' }}>High-impact results from across the professional collaboration network.</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, background: '#00cc82' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(!showForm)}
                    style={{
                        padding: '30px 60px',
                        fontSize: '1.2rem',
                        fontWeight: '900',
                        borderRadius: '100px',
                        background: 'var(--primary)',
                        color: '#000',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 20px 40px var(--primary-glow)'
                    }}
                >
                    {showForm ? 'Close Official Editor' : 'Submit Official Feedback'}
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="card-p mb-20"
                        style={{ maxWidth: '800px', margin: '0 auto 80px' }}
                    >
                        {submitted ? (
                            <div className="text-center py-10">
                                <CheckCircle size={50} color="var(--primary)" style={{ margin: '0 auto 20px' }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Feedback Transmitted for Review!</h3>
                                <p style={{ color: 'var(--text-grey)' }}>Thank you for your documentation. The feedback will be published to the registry once verified by the office admin.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid-2">
                                    <input
                                        type="text"
                                        placeholder="Your Full Name"
                                        className="input-p"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Company / Role"
                                        className="input-p"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <textarea
                                    placeholder="Tell us about your experience..."
                                    className="input-p"
                                    style={{ minHeight: '150px' }}
                                    required
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                ></textarea>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star
                                                key={s}
                                                size={24}
                                                fill={s <= formData.rating ? 'var(--primary)' : 'none'}
                                                color={s <= formData.rating ? 'var(--primary)' : 'var(--text-muted)'}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setFormData({ ...formData, rating: s })}
                                            />
                                        ))}
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 163, 0.4)' }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary"
                                        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                                    >
                                        {isSubmitting ? (
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                border: '3px solid rgba(0,0,0,0.1)',
                                                borderTopColor: '#000',
                                                borderRadius: '50%',
                                                animation: 'spin 0.8s linear infinite'
                                            }}></div>
                                        ) : (
                                            <>Publish Submission <Send size={18} /></>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid-2"
            >
                {reviews.map((rev, idx) => (
                    <motion.div
                        key={rev.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="card-p"
                        style={{ position: 'relative', padding: '50px' }}
                    >
                        <div className="flex gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={18} fill={s <= rev.rating ? 'var(--primary)' : 'none'} color={s <= rev.rating ? 'var(--primary)' : 'transparent'} />
                            ))}
                        </div>
                        <p style={{ fontSize: '1.2rem', fontWeight: '600', fontStyle: 'italic', marginBottom: '30px', color: 'var(--text-white)', lineHeight: 1.6 }}>
                            "{rev.text}"
                        </p>
                        <div className="flex items-center gap-4">
                            <div style={{ width: '45px', height: '45px', background: 'rgba(0,255,163,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MessageSquare size={18} color="var(--primary)" />
                            </div>
                            <div>
                                <h4 style={{ fontWeight: '800', fontSize: '1.1rem' }}>{rev.name}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>{rev.company}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Testimonials;
