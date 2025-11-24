import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';

/**
 * About Page Component
 * 
 * Note: In the current Single Page Application structure, this component 
 * might be redundant if routing is handled solely by Home.tsx with smooth scrolling.
 * However, it can serve as a standalone page if multi-page routing is re-enabled.
 * 
 * Displays the introductory sections: Hero and Skills.
 */
const About: React.FC = () => {
    return (
        <>
            <Hero />
            <Skills />
        </>
    );
};

export default About;
