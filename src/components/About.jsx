import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Rocket, Heart, Cpu, Globe, Figma, Smartphone, Database, MessageSquare, Cloud, Palette, Terminal, Atom, Search, BarChart3, Flame, Shield, Monitor, Video, FileCode, Layout, Code } from 'lucide-react';

const About = () => {
    const skills = [
        { name: 'HTML', icon: <FileCode size={26} />, color: '#00ffa3' },
        { name: 'CSS', icon: <Layout size={26} />, color: '#00ffa3' },
        { name: 'JavaScript', icon: <Code2 size={26} />, color: '#00ffa3' },
        { name: 'C++', icon: <Code size={26} />, color: '#00ffa3' },
        { name: 'Node.js', icon: <Cpu size={26} />, color: '#00ffa3' },
        { name: 'React', icon: <Atom size={26} />, color: '#00ffa3' },
        { name: 'MongoDB', icon: <Database size={26} />, color: '#00ffa3' },
        { name: 'Firebase', icon: <Flame size={26} />, color: '#00ffa3' },
        { name: 'Auth Systems', icon: <Shield size={26} />, color: '#00ffa3' },
        { name: 'SEO', icon: <Search size={26} />, color: '#00ffa3' },
        { name: 'AI Image Gen', icon: <Monitor size={26} />, color: '#00ffa3' },
        { name: 'AI Prompt', icon: <MessageSquare size={26} />, color: '#00ffa3' },
        { name: 'AI Video', icon: <Video size={26} />, color: '#00ffa3' },
        { name: 'WA Bots', icon: <MessageSquare size={26} />, color: '#00ffa3' },
        { name: 'Flask', icon: <Terminal size={26} />, color: '#00ffa3' },
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
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.03 }}
                            style={{
                                padding: '20px 10px',
                                textAlign: 'center',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '15px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <div style={{ color: 'var(--primary)', opacity: 0.8 }}>
                                {skill.icon}
                            </div>
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
