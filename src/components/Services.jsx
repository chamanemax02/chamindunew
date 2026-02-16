import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Globe, Cpu, Smartphone, BarChart, Database } from 'lucide-react';

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
            icon: <BarChart size={40} strokeWidth={1.5} />,
            title: "SEO & Analysis",
            desc: "Data-driven optimization to boost your online visibility and growth.",
            delay: 0.6
        }
    ];

    return (
        <div className="container">
            <h2 className="section-title-p">My <span>Services</span></h2>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid-3"
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: service.delay, duration: 0.5 }}
                        className="card-p flex flex-col items-center text-center"
                        style={{ padding: '50px 30px' }}
                    >
                        <div style={{
                            color: 'var(--primary)',
                            marginBottom: '25px',
                            background: 'rgba(0,255,163,0.03)',
                            padding: '24px',
                            borderRadius: '30px',
                            border: '1px solid rgba(0,255,163,0.1)'
                        }}>
                            {service.icon}
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px' }}>{service.title}</h3>
                        <p style={{ color: 'var(--text-grey)', fontSize: '0.95rem', lineHeight: '1.6' }}>{service.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Services;
