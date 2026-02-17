import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { ExternalLink, Folder, Loader2 } from 'lucide-react';

const Portfolio = () => {
    const [filter, setFilter] = useState('all');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const projectsRef = ref(db, 'projects');
        const unsubscribe = onValue(projectsRef, (snapshot) => {
            try {
                const data = snapshot.val();
                const list = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
                setProjects(list.sort((a, b) => b.createdAt - a.createdAt));
                setLoading(false);
            } catch (err) {
                console.error("Data parsing error:", err);
                setError(err.message);
                setLoading(false);
            }
        }, (errorObj) => {
            console.error("Firebase read failed:", errorObj);
            setError(errorObj.message);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    if (loading) {
        return (
            <div className="container" style={{ paddingBottom: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <Loader2 size={40} className="animate-spin" color="var(--primary)" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container" style={{ paddingBottom: '100px', textAlign: 'center', color: '#ff6b6b' }}>
                <h3>Unable to load projects</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <h2 className="section-title-p">My <span>Projects</span></h2>

            <div className="portfolio-filters">
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
                            fontSize: '0.9rem',
                            padding: '12px 24px',
                            fontWeight: '800',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '30px'
            }}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="project-card-official"
                            style={{
                                background: 'rgba(15,15,15,0.7)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '30px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                height: '100%'
                            }}
                        >
                            {/* Banner Image */}
                            <div style={{
                                width: '100%',
                                height: '220px',
                                overflow: 'hidden',
                                background: 'rgba(255,255,255,0.02)',
                                position: 'relative'
                            }}>
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', opacity: 0.2 }}>
                                        <Folder size={60} />
                                    </div>
                                )}
                                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noopener noreferrer"
                                            style={{
                                                width: '40px', height: '40px', background: 'rgba(0,0,0,0.5)',
                                                backdropFilter: 'blur(10px)', borderRadius: '12px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#fff', border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                            className="hover:text-primary transition-colors">
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <span style={{
                                    fontSize: '0.65rem',
                                    fontWeight: '800',
                                    color: 'var(--primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    display: 'block',
                                    marginBottom: '10px'
                                }}>
                                    {project.category}
                                </span>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', marginBottom: '15px' }}>
                                    {project.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.7', marginBottom: '25px' }}>
                                    {project.description || "Experimental digital solution crafted with modern technologies and clean architecture."}
                                </p>

                                <div className="flex gap-2 flex-wrap mt-auto">
                                    {(project.tech || []).map((t, tIdx) => (
                                        <span
                                            key={t}
                                            style={{
                                                fontSize: '0.65rem',
                                                fontWeight: '700',
                                                padding: '6px 14px',
                                                background: 'rgba(255,255,255,0.03)',
                                                borderRadius: '10px',
                                                color: '#666',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                cursor: 'default'
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '20px' }}>
                        <Folder size={40} style={{ opacity: 0.3, marginBottom: '20px' }} />
                        <h4 style={{ color: '#888' }}>No projects found in this category.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Portfolio;
