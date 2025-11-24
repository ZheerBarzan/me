import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-[60] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-1 group cursor-pointer">
                <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold shadow-lg shadow-red-600/20 transition-transform group-hover:scale-110 duration-300">Z</span>
                <span className="group-hover:text-red-600 transition-colors duration-300 dark:text-white">heer<span className="text-red-600">.</span></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
                <div className="flex gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="hover:text-red-600 dark:hover:text-red-500 transition-colors duration-300 cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={toggleMenu} className="text-zinc-600 dark:text-zinc-300">
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 p-6 flex flex-col gap-4 shadow-xl md:hidden">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-lg font-medium text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
