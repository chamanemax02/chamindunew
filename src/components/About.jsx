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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid-2 items-center"
                style={{ gap: '60px' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: 'clamp(250px, 35vw, 400px)',
                            height: 'clamp(250px, 35vw, 400px)',
                            borderRadius: '50%',
                            border: '8px solid var(--primary)',
                            padding: '10px',
                            background: 'rgba(0, 255, 163, 0.05)',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <img
                                src="/profil.png"
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                                onError={(e) => {
                                    e.target.src = "https://ui-avatars.com/api/?name=Chama+Studio&background=00ffa3&color=000&size=512";
                                }}
                            />
                        </div>
                        {/* Modern glow effect */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '110%',
                            height: '110%',
                            background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                            zIndex: 0,
                            filter: 'blur(40px)',
                            opacity: 0.6
                        }}></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: '900', color: 'var(--primary)', marginBottom: '20px' }}>
                        My Standards
                    </h3>
                    <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.8' }}>
                        I am Mr Chamindu Ransika, a professional full-stack developer specialized in high-performance architectures and premium aesthetics.
                        Operating since 2021, I deliver elite solutions for global clients.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '20px'
                    }}>
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.05,
                                    backgroundColor: 'rgba(0, 255, 163, 0.08)',
                                    borderColor: 'var(--primary)',
                                    boxShadow: '0 15px 40px rgba(0, 255, 163, 0.15)'
                                }}
                                className="card-p"
                                style={{
                                    padding: '25px 15px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.3s ease, background-color 0.3s ease'
                                }}
                            >
                                <div style={{
                                    color: 'var(--primary)',
                                    filter: 'drop-shadow(0 0 8px var(--primary-glow))'
                                }}>
                                    {skill.icon}
                                </div>
                                <span style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    color: '#eee',
                                    letterSpacing: '0.5px'
                                }}>{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;
