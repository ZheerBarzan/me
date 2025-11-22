import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Work from '../components/Work';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Skills />
            <Work />
            <Footer />
        </>
    );
};

export default Home;
