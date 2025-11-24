import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Work from '../components/Work';
import Footer from '../components/Footer';

/**
 * Home Page Component
 * 
 * This is the main page of the Single Page Application (SPA).
 * It aggregates all the major sections (Hero, Skills, Experience, Work, Footer)
 * into a single scrolling view.
 * 
 * Each section is wrapped in an HTML section element with a specific ID.
 * These IDs are used by the Navbar for smooth scrolling navigation.
 */
const Home: React.FC = () => {
    return (
        <>
            {/* 
              About Section 
              Contains the Hero (intro) and Skills (tech stack) components.
              ID: 'about' is targeted by the 'About' link in Navbar.
            */}
            <section id="about">
                <Hero />
                <Skills />
            </section>

            {/* 
              Experience Section 
              Contains the Experience component (timeline/history).
              ID: 'experience' is targeted by the 'Experience' link in Navbar.
            */}
            <section id="experience">
                <Experience />
            </section>

            {/* 
              Work Section 
              Contains the Work component (portfolio projects).
              ID: 'work' is targeted by the 'Work' link in Navbar.
            */}
            <section id="work">
                <Work />
            </section>

            {/* 
              Contact Section 
              Contains the Footer component (contact info and social links).
              ID: 'contact' is targeted by the 'Contact' link in Navbar.
            */}
            <section id="contact">
                <Footer />
            </section>
        </>
    );
};

export default Home;
