import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { LogOut, Plus, Trash2, Star, Check, X, MessageSquare, Briefcase, LayoutDashboard, User, FolderPlus, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
    const { user, logout, isAdmin } = useAuth();
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', category: 'web', tech: '', image: '', url: '' });
    const [loadingData, setLoadingData] = useState(false);
    const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'testimonials'

    useEffect(() => {
        if (isAdmin) fetchData();
    }, [isAdmin]);

    const fetchData = async () => {
        setLoadingData(true);
        try {
            const projectsSnap = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
            setProjects(projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const reviewsSnap = await getDocs(query(collection(db, 'testimonials'), orderBy('createdAt', 'desc')));
            setTestimonials(reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.error("Data fetch error:", err);
        } finally {
            setLoadingData(false);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'projects'), {
                ...newProject,
                tech: newProject.tech.split(',').map(t => t.trim()),
                createdAt: serverTimestamp()
            });
            alert("Project published successfully!");
            setNewProject({ title: '', category: 'web', tech: '', image: '', url: '' });
            fetchData();
        } catch (err) {
            alert("Upload failed: " + err.message);
        }
    };

    if (!user) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/home" />;

    return (
        <div style={{ background: '#050505', minHeight: '100vh', padding: '120px 20px' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>

                {/* Admin Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-p mb-8"
                    style={{ background: 'rgba(20,20,20,0.6)', backdropFilter: 'blur(20px)', padding: '40px' }}
                >
                    <div className="flex justify-between items-center flex-wrap gap-8">
                        <div className="flex items-center gap-6">
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--primary)', padding: '4px' }}>
                                <img src="/profil.png" alt="Admin" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=Chamindu"} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>Dashboard 控制台</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <ShieldCheck size={16} color="var(--primary)" />
                                    <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.75rem', letterSpacing: '2px' }}>SYSTEM ADMINISTRATOR</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 p-2 bg-black/40 rounded-2xl border border-white/5">
                            {['projects', 'testimonials'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '12px 30px',
                                        background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                        color: activeTab === tab ? '#000' : '#fff',
                                        borderRadius: '12px',
                                        fontWeight: '800',
                                        fontSize: '0.8rem',
                                        transition: 'all 0.3s ease',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid-2" style={{ alignItems: 'start' }}>
                    {/* Management Panel */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'projects' ? (
                            <motion.div
                                key="proj-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="card-p"
                            >
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <FolderPlus color="var(--primary)" /> Add New Project
                                </h3>
                                <form onSubmit={handleAddProject} className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>PROJECT TITLE</label>
                                        <input type="text" placeholder="e.g. Finance Dashboard" className="input-p" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>CATEGORY</label>
                                        <select className="input-p" style={{ appearance: 'none' }} value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })}>
                                            <option value="web">WEB DEVELOPMENT</option>
                                            <option value="ai">AI GENERATED ART</option>
                                            <option value="wordpress">WORDPRESS SOLUTIONS</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>TECH STACK (COMMA SEPARATED)</label>
                                        <input type="text" placeholder="React, Node.js, Three.js" className="input-p" value={newProject.tech} onChange={e => setNewProject({ ...newProject, tech: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>PREVIEW IMAGE LINK</label>
                                        <input type="text" placeholder="https://unsplash.com/etc" className="input-p" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>LIVE PROJECT URL</label>
                                        <input type="text" placeholder="https://your-project.com" className="input-p" value={newProject.url} onChange={e => setNewProject({ ...newProject, url: e.target.value })} />
                                    </div>
                                    <button type="submit" className="btn-primary w-full mt-4">Publish Live</button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="mod-info"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="card-p"
                            >
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px' }}>Moderation Console</h3>
                                <p style={{ color: 'var(--text-grey)', lineHeight: 1.8 }}>
                                    All feedback submitted through the "Reviews" section will appear in the right panel for approval.
                                    Once approved, they will be instantly visible to all visitors.
                                </p>
                                <div style={{ borderTop: '1px solid var(--border)', marginTop: '30px', paddingTop: '30px' }}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span style={{ fontWeight: '800' }}>Active Reviews</span>
                                        <span style={{ color: 'var(--primary)' }}>{testimonials.length}</span>
                                    </div>
                                    <div style={{ height: '6px', width: '100%', background: '#222', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: '100%', height: '100%', background: 'var(--primary)' }}></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Data Display Panel */}
                    <div className="flex flex-col gap-6">
                        {loadingData ? (
                            <div className="card-p flex items-center justify-center py-40">
                                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,255,163,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            </div>
                        ) : (
                            <div className="card-p" style={{ minHeight: '600px' }}>
                                {activeTab === 'projects' ? (
                                    <>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Briefcase size={20} color="var(--primary)" /> Live Registry ({projects.length})
                                        </h3>
                                        <div className="flex flex-col gap-4">
                                            {projects.map(p => (
                                                <div key={p.id} className="flex justify-between items-center p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <img src={p.image} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} alt="" />
                                                        <div>
                                                            <h4 style={{ fontSize: '0.9rem', fontWeight: '800' }}>{p.title}</h4>
                                                            <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase' }}>{p.category}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={async () => { if (window.confirm('Warrant deletion?')) { await deleteDoc(doc(db, 'projects', p.id)); fetchData(); } }}
                                                        style={{ color: '#444' }}
                                                        className="hover:text-red-500"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <MessageSquare size={20} color="var(--primary)" /> Queue Management
                                        </h3>
                                        <div className="flex flex-col gap-6">
                                            {testimonials.map(t => (
                                                <div key={t.id} className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <div className="flex gap-1 mb-2">
                                                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < t.rating ? "var(--primary)" : "transparent"} color={i < t.rating ? "var(--primary)" : "#333"} />)}
                                                            </div>
                                                            <h4 style={{ fontWeight: '800', fontSize: '1rem' }}>{t.name}</h4>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {t.status !== 'approved' && (
                                                                <button onClick={async () => { await updateDoc(doc(db, 'testimonials', t.id), { status: 'approved' }); fetchData(); }} style={{ background: 'var(--primary)', color: '#000', padding: '10px', borderRadius: '12px' }}><Check size={16} /></button>
                                                            )}
                                                            <button onClick={async () => { if (window.confirm('Delete review?')) { await deleteDoc(doc(db, 'testimonials', t.id)); fetchData(); } }} style={{ background: 'rgba(255,107,107,0.1)', color: '#ff6b6b', padding: '10px', borderRadius: '12px' }}><Trash2 size={16} /></button>
                                                        </div>
                                                    </div>
                                                    <p style={{ color: 'var(--text-grey)', fontSize: '0.9rem', fontStyle: 'italic' }}>"{t.text}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-20">
                    <button onClick={logout} className="flex items-center gap-2" style={{ color: '#444', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px' }}>
                        <LogOut size={16} /> TERMINATE PERSISTENT SESSION
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                select option { background: #111; color: #fff; }
                .card-p .input-p { font-size: 0.9rem !important; }
            `}</style>
        </div>
    );
};

export default Admin;
