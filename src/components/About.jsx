import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Rocket, Heart, Cpu, Globe, Figma, Smartphone } from 'lucide-react';

const About = () => {
    const skills = [
        { name: 'JavaScript', icon: <Code2 size={24} />, color: '#F7DF1E' },
        { name: 'Node.js', icon: <Cpu size={24} />, color: '#339933' },
        { name: 'HTML5', icon: <Globe size={24} />, color: '#E34F26' },
        { name: 'Figma', icon: <Figma size={24} />, color: '#F24E1E' },
        { name: 'AI/ML', icon: <Rocket size={24} />, color: '#00FFA3' },
        { name: 'React', icon: <Smartphone size={24} />, color: '#61DAFB' },
    ];

    return (
        <div className="container">
            <h2 className="section-title-p">About <span>Me</span></h2>

            <div className="grid-2 items-center" style={{ gap: '60px' }}>
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
                                    e.target.src = "https://ui-avatars.com/api/?name=Chamindu+Ransika&background=00ffa3&color=000&size=512";
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
                        Crafting Digital Excellence
                    </h3>
                    <p style={{ color: 'var(--text-grey)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.8' }}>
                        I'm a passionate full-stack developer and AI creative with over 3 years of experience in building cutting-edge digital solutions.
                        Today, I specialize in creating responsive web applications and AI-generated artwork.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '20px'
                    }}>
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    y: -10,
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderColor: skill.color
                                }}
                                className="card-p"
                                style={{
                                    padding: '24px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    cursor: 'default'
                                }}
                            >
                                <div style={{ color: skill.color }}>{skill.icon}</div>
                                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fff' }}>{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
