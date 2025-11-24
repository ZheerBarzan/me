import React from 'react';
import Experience from '../components/Experience';

/**
 * Experience Page Component
 * 
 * Note: In the current Single Page Application structure, this component 
 * might be redundant if routing is handled solely by Home.tsx with smooth scrolling.
 * 
 * Displays the Experience component with top padding to account for the fixed navbar.
 */
const ExperiencePage: React.FC = () => {
    return (
        <div className="pt-12">
            <Experience />
        </div>
    );
};

export default ExperiencePage;
