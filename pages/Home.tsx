import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Work from '../components/Work';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    return (
        <>
            <section id="about">
                <Hero />
                <Skills />
            </section>
            <section id="experience">
                <Experience />
            </section>
            <section id="work">
                <Work />
            </section>
            <section id="contact">
                <Footer />
            </section>
        </>
    );
};

export default Home;
