import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="fixed top-0 w-full z-[60] bg-white/90 backdrop-blur-xl border-b border-zinc-100 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-1 group cursor-pointer">
                <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold shadow-lg shadow-red-600/20 transition-transform group-hover:scale-110 duration-300">Z</span>
                <span className="group-hover:text-red-600 transition-colors duration-300">heer<span className="text-red-600">.</span></span>
            </Link>
            <div className="hidden md:flex gap-10 text-sm font-medium text-zinc-500">
                <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-red-600 transition-colors duration-300 cursor-pointer">About</a>
                <a href="#experience" onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-red-600 transition-colors duration-300 cursor-pointer">Experience</a>
                <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-red-600 transition-colors duration-300 cursor-pointer">Work</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-red-600 transition-colors duration-300 cursor-pointer">Contact</a>
            </div>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <button className="bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transform hover:-translate-y-0.5">
                    Let's Talk
                </button>
            </a>
        </nav>
    );
};

export default Navbar;
