import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ExternalLink, Folder } from 'lucide-react';

const Portfolio = () => {
    const [filter, setFilter] = useState('all');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const projectData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (projectData.length === 0) {
                // High quality placeholders if database is empty
                setProjects([
                    { id: 1, title: "Modern E-commerce Platform", category: "web", tech: ["React", "Express", "Node"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
                    { id: 2, title: "AI Vision Dashboard", category: "ai", tech: ["Python", "PyTorch", "OpenCV"], image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800" },
                    { id: 3, title: "Corporate Branding Site", category: "wordpress", tech: ["PHP", "SCSS", "JS"], image: "https://images.unsplash.com/photo-1510605395823-530474d7490f?w=800" }
                ]);
            } else { setProjects(projectData); }
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <h2 className="section-title-p">Work <span>Showcase</span></h2>

            <div className="flex justify-center gap-4 mb-20 flex-wrap">
                {['all', 'web', 'ai', 'wordpress'].map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`contact-btn`}
                        style={{
                            background: filter === category ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                            color: filter === category ? '#000' : '#fff',
                            border: '1px solid',
                            borderColor: filter === category ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            fontSize: '0.75rem'
                        }}
                    >
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,255,163,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '30px'
                }}>
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="card-p"
                                style={{ padding: 0, overflow: 'hidden' }}
                            >
                                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        background: 'rgba(0,0,0,0.8)',
                                        backdropFilter: 'blur(10px)',
                                        padding: '6px 14px',
                                        borderRadius: '50px',
                                        fontSize: '0.7rem',
                                        fontWeight: '800',
                                        color: 'var(--primary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        {project.category}
                                    </div>
                                </div>
                                <div style={{ padding: '30px' }}>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{project.title}</h3>
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: 'var(--primary)', opacity: 0.8 }}
                                                className="hover:opacity-100 transition-opacity"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tech.map(t => (
                                            <span key={t} style={{
                                                fontSize: '0.65rem',
                                                fontWeight: '800',
                                                padding: '4px 10px',
                                                background: 'rgba(255,255,255,0.03)',
                                                borderRadius: '6px',
                                                color: 'var(--text-grey)'
                                            }}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
