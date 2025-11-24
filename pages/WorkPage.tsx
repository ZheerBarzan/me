import React from 'react';
import Work from '../components/Work';

/**
 * Work Page Component
 * 
 * Note: In the current Single Page Application structure, this component 
 * might be redundant if routing is handled solely by Home.tsx with smooth scrolling.
 * 
 * Displays the Work component (portfolio) with top padding to account for the fixed navbar.
 */
const WorkPage: React.FC = () => {
    return (
        <div className="pt-12">
            <Work />
        </div>
    );
};

export default WorkPage;
