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
            setProjects(projectData);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <h2 className="section-title-p">My <span>Projects</span></h2>

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

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px'
                }}
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="project-card-official"
                                style={{
                                    background: '#111',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    padding: '32px',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px'
                                }}
                            >
                                <div className="flex justify-between items-start">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary)'
                                    }}>
                                        <Folder size={24} />
                                    </div>
                                    <div className="flex gap-4">
                                        {project.url && (
                                            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#666' }} className="hover:text-white transition-colors">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <span style={{
                                        fontSize: '0.65rem',
                                        fontWeight: '800',
                                        color: 'var(--primary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        display: 'block',
                                        marginBottom: '8px'
                                    }}>
                                        {project.category}
                                    </span>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.6', marginBottom: '20px' }}>
                                        {project.description || "Experimental digital solution crafted with modern technologies and clean architecture."}
                                    </p>
                                </div>

                                <div className="flex gap-2 flex-wrap mt-auto">
                                    {project.tech.map(t => (
                                        <span key={t} style={{
                                            fontSize: '0.65rem',
                                            fontWeight: '700',
                                            padding: '6px 12px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '8px',
                                            color: '#666',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>{t}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            key="no-projects"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                gridColumn: '1 / -1',
                                textAlign: 'center',
                                padding: '60px',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '30px',
                                border: '1px dashed rgba(255,255,255,0.1)'
                            }}
                        >
                            <Folder size={40} color="var(--primary)" style={{ marginBottom: '15px', opacity: 0.5 }} />
                            <h4 style={{ color: 'var(--text-grey)', fontWeight: '700' }}>No projects found in this category.</h4>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Portfolio;
