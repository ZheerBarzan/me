import React from 'react';
import Footer from '../components/Footer';

/**
 * Contact Page Component
 * 
 * Note: In the current Single Page Application structure, this component 
 * might be redundant if routing is handled solely by Home.tsx with smooth scrolling.
 * 
 * Displays the Footer component centered on the screen, serving as a dedicated contact page.
 */
const Contact: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center">
            <Footer />
        </div>
    );
};

export default Contact;
