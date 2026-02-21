import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Rocket, Heart, Cpu, Globe, Figma, Smartphone, Database, MessageSquare, Cloud, Palette, Terminal, Atom, Search, BarChart3, Flame, Shield, Monitor, Video, FileCode, Layout, Code } from 'lucide-react';

const About = () => {
    const skills = [
        { name: 'HTML', icon: <FileCode size={26} />, color: '#E34F26' },
        { name: 'CSS', icon: <Layout size={26} />, color: '#1572B6' },
        { name: 'JavaScript', icon: <Code2 size={26} />, color: '#F7DF1E' },
        { name: 'C++', icon: <Code size={26} />, color: '#00599C' },
        { name: 'Node.js', icon: <Cpu size={26} />, color: '#339933' },
        { name: 'React', icon: <Atom size={26} />, color: '#61DAFB' },
        { name: 'MongoDB', icon: <Database size={26} />, color: '#47A248' },
        { name: 'Firebase', icon: <Flame size={26} />, color: '#FFCA28' },
        { name: 'Auth Systems', icon: <Shield size={26} />, color: '#00ffa3' },
        { name: 'SEO', icon: <Search size={26} />, color: '#8AB4F8' },
        { name: 'AI Image Gen', icon: <Monitor size={26} />, color: '#9C27B0' },
        { name: 'AI Prompt', icon: <MessageSquare size={26} />, color: '#FF9800' },
        { name: 'AI Video', icon: <Video size={26} />, color: '#E91E63' },
        { name: 'WA Bots', icon: <MessageSquare size={26} />, color: '#25D366' },
        { name: 'Flask', icon: <Terminal size={26} />, color: '#FFFFFF' },
    ];

    return (
        <div className="container">
            <h2 className="section-title-p">My <span>Experience</span></h2>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ marginTop: '40px' }}
            >
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800', color: '#fff', marginBottom: '20px' }}>
                        Professional Standards
                    </h3>
                    <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.8' }}>
                        I am Mr Chamindu Ransika, a professional full-stack developer specialized in high-performance architectures and premium aesthetics.
                        Operating since 2021, I deliver elite solutions for global clients with a focus on clean, scalable code.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '15px'
                }}>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, y: -5, borderColor: skill.color, boxShadow: `0 0 25px ${skill.color}40` }}
                            animate={{
                                y: [0, -6, 0],
                                borderColor: ['rgba(255, 255, 255, 0.08)', `${skill.color}66`, 'rgba(255, 255, 255, 0.08)'],
                                boxShadow: [
                                    '0 0 0 rgba(0,0,0,0)',
                                    `0 0 20px ${skill.color}20`,
                                    '0 0 0 rgba(0,0,0,0)'
                                ]
                            }}
                            transition={{
                                opacity: { duration: 0.5, delay: index * 0.05 },
                                scale: { duration: 0.5, delay: index * 0.05 },
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                                borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                            }}
                            viewport={{ once: true }}
                            style={{
                                padding: '20px 10px',
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer'
                            }}
                        >
                            <motion.div
                                style={{ color: skill.color, opacity: 0.9 }}
                                animate={{ rotateY: [0, 360] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                            >
                                {skill.icon}
                            </motion.div>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                color: '#eee',
                                letterSpacing: '0.5px'
                            }}>{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default About;
