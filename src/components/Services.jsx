import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Globe, Cpu, Smartphone, BarChart, Database, Terminal } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Globe size={40} strokeWidth={1.5} />,
            title: "Web Development",
            desc: "Custom high-performance websites built with the latest technologies.",
            delay: 0.1
        },
        {
            icon: <Smartphone size={40} strokeWidth={1.5} />,
            title: "App Development",
            desc: "Responsive and intuitive mobile applications for iOS and Android.",
            delay: 0.2
        },
        {
            icon: <Layout size={40} strokeWidth={1.5} />,
            title: "UI/UX Design",
            desc: "Beautifully crafted user interfaces that provide seamless experiences.",
            delay: 0.3
        },
        {
            icon: <Cpu size={40} strokeWidth={1.5} />,
            title: "AI Solutions",
            desc: "Integrating intelligent systems and automation into your workflow.",
            delay: 0.4
        },
        {
            icon: <Database size={40} strokeWidth={1.5} />,
            title: "Backend Dev",
            desc: "Robust server-side logic and database architecture for your apps.",
            delay: 0.5
        },
        {
            icon: <Terminal size={40} strokeWidth={1.5} />,
            title: "Site Scrapers",
            desc: "Advanced data extraction and automation tools for any platform.",
            delay: 0.6
        }
    ];

    return (
        <div className="container">
            <h2 className="section-title-p">My <span>Services</span></h2>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px'
                }}
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="service-card-official"
                        style={{
                            background: '#111',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            padding: '40px',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(0,255,163,0.03)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)',
                            marginBottom: '24px'
                        }}>
                            {React.cloneElement(service.icon, { size: 24 })}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>{service.title}</h3>
                        <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>{service.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Services;
