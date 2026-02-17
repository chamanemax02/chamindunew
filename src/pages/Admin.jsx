import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { LogOut, Plus, Trash2, Star, Check, X, MessageSquare, Briefcase, LayoutDashboard, User, FolderPlus, ShieldCheck, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
    const { user, logout, isAdmin } = useAuth();
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [services, setServices] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', category: 'web', tech: '', image: '', url: '' });
    const [newService, setNewService] = useState({ name: '', price: '', icon: 'Code' });
    const [loadingData, setLoadingData] = useState(false);
    const [addingProject, setAddingProject] = useState(false);
    const [addingService, setAddingService] = useState(false);
    const [processingActionId, setProcessingActionId] = useState(null);
    const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'testimonials', 'services'

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

            const servicesSnap = await getDocs(query(collection(db, 'services'), orderBy('createdAt', 'desc')));
            setServices(servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.error("Data fetch error:", err);
        } finally {
            setLoadingData(false);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        setAddingProject(true);
        console.log("Adding project:", newProject);
        try {
            const projectData = {
                ...newProject,
                tech: newProject.tech ? newProject.tech.split(',').map(t => t.trim()).filter(t => t !== "") : [],
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'projects'), projectData);
            alert("SUCCESS: Project is now live on the registry!");
            setNewProject({ title: '', category: 'web', tech: '', image: '', url: '' });
            fetchData();
        } catch (err) {
            console.error("Firestore Upload Error:", err);
            alert("UPLOAD FAILED: " + err.message);
        } finally {
            setAddingProject(false);
        }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        setAddingService(true);
        try {
            await addDoc(collection(db, 'services'), {
                ...newService,
                createdAt: serverTimestamp()
            });
            alert("SUCCESS: New service added to the registry!");
            setNewService({ name: '', price: '', icon: 'Code' });
            fetchData();
        } catch (err) {
            console.error("Firestore Upload Error:", err);
            alert("UPLOAD FAILED: " + err.message);
        } finally {
            setAddingService(false);
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
                                <h1 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>Admin Dashboard</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <ShieldCheck size={16} color="var(--primary)" />
                                    <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.75rem', letterSpacing: '2px' }}>SYSTEM ADMINISTRATOR</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 p-2 bg-black/40 rounded-2xl border border-white/5">
                            {['projects', 'testimonials', 'services'].map((tab) => (
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
                                        <input type="text" placeholder="React, Node.js, Python, Flutter, Go, PHP, Java, C++, Swift, MySQL, Firebase" className="input-p" value={newProject.tech} onChange={e => setNewProject({ ...newProject, tech: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>PREVIEW IMAGE LINK</label>
                                        <input type="text" placeholder="https://unsplash.com/etc" className="input-p" value={newProject.image} onChange={e => setNewProject({ ...newProject, image: e.target.value })} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>LIVE PROJECT URL</label>
                                        <input type="text" placeholder="https://your-project.com" className="input-p" value={newProject.url} onChange={e => setNewProject({ ...newProject, url: e.target.value })} />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 255, 163, 0.3)' }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={addingProject}
                                        className="btn-primary w-full mt-4"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                    >
                                        {addingProject ? (
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                border: '3px solid rgba(0,0,0,0.1)',
                                                borderTopColor: '#000',
                                                borderRadius: '50%',
                                                animation: 'spin 0.8s linear infinite'
                                            }}></div>
                                        ) : 'Publish Live'}
                                    </motion.button>
                                </form>
                            </motion.div>
                        ) : activeTab === 'services' ? (
                            <motion.div
                                key="serv-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="card-p"
                            >
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Package color="var(--primary)" /> Add New Service
                                </h3>
                                <form onSubmit={handleAddService} className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>SERVICE NAME</label>
                                        <input type="text" placeholder="e.g. Logo Design" className="input-p" value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>PRICE LABEL</label>
                                        <input type="text" placeholder="e.g. Starts from Rs. 2,000" className="input-p" value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-grey)' }}>ICON (LUCIDE NAME)</label>
                                        <select className="input-p" value={newService.icon} onChange={e => setNewService({ ...newService, icon: e.target.value })}>
                                            <option value="Code">Code</option>
                                            <option value="Palette">Palette</option>
                                            <option value="Smartphone">Smartphone</option>
                                            <option value="Search">Search</option>
                                            <option value="PenTool">PenTool</option>
                                            <option value="Layers">Layers</option>
                                            <option value="Zap">Zap</option>
                                            <option value="Activity">Activity</option>
                                        </select>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 255, 163, 0.3)' }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={addingService}
                                        className="btn-primary w-full mt-4"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                    >
                                        {addingService ? (
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                border: '3px solid rgba(0,0,0,0.1)',
                                                borderTopColor: '#000',
                                                borderRadius: '50%',
                                                animation: 'spin 0.8s linear infinite'
                                            }}></div>
                                        ) : 'Add Service'}
                                    </motion.button>
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
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px' }}>Review Management</h3>
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
                                            <Briefcase size={20} color="var(--primary)" /> All Projects ({projects.length})
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
                                                        onClick={async () => {
                                                            if (window.confirm('Warrant deletion?')) {
                                                                setProcessingActionId(p.id);
                                                                try {
                                                                    await deleteDoc(doc(db, 'projects', p.id));
                                                                    fetchData();
                                                                    alert("Project deleted.");
                                                                } catch (err) {
                                                                    alert("Delete failed: " + err.message);
                                                                } finally {
                                                                    setProcessingActionId(null);
                                                                }
                                                            }
                                                        }}
                                                        style={{ color: '#444', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        className="hover:text-red-500"
                                                        disabled={processingActionId === p.id}
                                                    >
                                                        {processingActionId === p.id ? (
                                                            <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,107,107,0.1)', borderTopColor: '#ff6b6b', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
                                                        ) : (
                                                            <Trash2 size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : activeTab === 'services' ? (
                                    <>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Package size={20} color="var(--primary)" /> All Services ({services.length})
                                        </h3>
                                        <div className="flex flex-col gap-4">
                                            {services.map(s => (
                                                <div key={s.id} className="flex justify-between items-center p-4 bg-black/40 border border-white/5 rounded-2xl">
                                                    <div>
                                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '800' }}>{s.name}</h4>
                                                        <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: '800' }}>{s.price}</span>
                                                    </div>
                                                    <button
                                                        onClick={async () => {
                                                            if (window.confirm('Remove service?')) {
                                                                setProcessingActionId(s.id);
                                                                try {
                                                                    await deleteDoc(doc(db, 'services', s.id));
                                                                    fetchData();
                                                                    alert("Service removed.");
                                                                } catch (err) {
                                                                    alert("Remove failed: " + err.message);
                                                                } finally {
                                                                    setProcessingActionId(null);
                                                                }
                                                            }
                                                        }}
                                                        style={{ color: '#444', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        className="hover:text-red-500"
                                                        disabled={processingActionId === s.id}
                                                    >
                                                        {processingActionId === s.id ? (
                                                            <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,107,107,0.1)', borderTopColor: '#ff6b6b', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
                                                        ) : (
                                                            <Trash2 size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <MessageSquare size={20} color="var(--primary)" /> Pending Reviews
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
                                                                <button
                                                                    onClick={async () => {
                                                                        setProcessingActionId(t.id + '_approve');
                                                                        try {
                                                                            await updateDoc(doc(db, 'testimonials', t.id), { status: 'approved' });
                                                                            fetchData();
                                                                            alert("Review approved!");
                                                                        } catch (err) {
                                                                            alert("Approval failed: " + err.message);
                                                                        } finally {
                                                                            setProcessingActionId(null);
                                                                        }
                                                                    }}
                                                                    style={{ background: 'var(--primary)', color: '#000', padding: '10px', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                                    disabled={processingActionId === t.id + '_approve'}
                                                                >
                                                                    {processingActionId === t.id + '_approve' ? (
                                                                        <div style={{ width: '14px', height: '14px', border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
                                                                    ) : (
                                                                        <Check size={16} />
                                                                    )}
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={async () => {
                                                                    if (window.confirm('Delete review?')) {
                                                                        setProcessingActionId(t.id + '_delete');
                                                                        try {
                                                                            await deleteDoc(doc(db, 'testimonials', t.id));
                                                                            fetchData();
                                                                            alert("Review deleted.");
                                                                        } catch (err) {
                                                                            alert("Delete failed: " + err.message);
                                                                        } finally {
                                                                            setProcessingActionId(null);
                                                                        }
                                                                    }
                                                                }}
                                                                style={{ background: 'rgba(255,107,107,0.1)', color: '#ff6b6b', padding: '10px', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                                disabled={processingActionId === t.id + '_delete'}
                                                            >
                                                                {processingActionId === t.id + '_delete' ? (
                                                                    <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,107,107,0.1)', borderTopColor: '#ff6b6b', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
                                                                ) : (
                                                                    <Trash2 size={16} />
                                                                )}
                                                            </button>
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
