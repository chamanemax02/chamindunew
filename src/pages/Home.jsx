import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Section Components
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    const location = useLocation();
    const containerRef = useRef(null);
    const lastScrollUpdate = useRef(0);

    // Initial scroll based on URL
    useEffect(() => {
        const path = location.pathname.split('/').pop() || 'home';
        const sectionId = path === '' ? 'home' : path;
        const target = document.getElementById(sectionId);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location.pathname]);

    // Scroll Spy: Update URL based on active section
    const handleScroll = () => {
        const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
        const container = containerRef.current;
        if (!container) return;

        const scrollPos = container.scrollTop + (window.innerHeight / 2);

        // Prevent excessive URL updates
        const now = Date.now();
        if (now - lastScrollUpdate.current < 100) return;

        for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
                const { offsetTop, offsetHeight } = el;
                if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                    const newPath = `/${section}`;
                    if (window.location.pathname !== newPath) {
                        window.history.replaceState(null, '', newPath);
                        lastScrollUpdate.current = now;

                        // Update Browser Tab Title
                        const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
                        document.title = `${sectionTitle} | Professional Developer`;
                    }
                    break;
                }
            }
        }
    };

    return (
        <div
            id="scroll-container"
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full"
            style={{
                height: '100vh',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                scrollBehavior: 'smooth'
            }}
        >
            <section id="home"><Hero /></section>
            <section id="about" className="relative"><About /></section>
            <section id="services" className="relative"><Services /></section>
            <section id="portfolio" className="relative"><Portfolio /></section>
            <section id="testimonials" className="relative"><Testimonials /></section>
            <section id="contact" className="relative" style={{ display: 'block' }}>
                <Contact />
                <Footer />
            </section>
        </div>
    );
};

export default Home;
