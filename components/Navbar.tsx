import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';

/**
 * Navbar Component
 * 
 * The main navigation bar for the application.
 * It handles:
 * - Navigation links with smooth scrolling to sections.
 * - Mobile menu toggle state and rendering.
 * - Dark mode toggle state and application to the document root.
 * - Responsive layout for desktop and mobile views.
 */
const Navbar: React.FC = () => {
    // State to track if the mobile menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // State to track if dark mode is enabled
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Effect to apply the 'dark' class to the html element when isDarkMode changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Toggles the mobile menu open/close state
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Toggles the dark mode state
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Navigation links data
    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    /**
     * Handles smooth scrolling to section IDs.
     * Prevents default anchor behavior and uses scrollIntoView.
     * Closes the mobile menu after clicking a link.
     * 
     * @param e - The click event
     * @param id - The target section ID (e.g., '#about')
     */
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        // Fixed navbar with backdrop blur and responsive padding
        <nav className="fixed top-0 w-full z-[60] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300">

            {/* Logo Section */}
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-1 group cursor-pointer">
                {/* Animated 'Z' logo box */}
                <span className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold shadow-lg shadow-red-600/20 transition-transform group-hover:scale-110 duration-300">Z</span>
                {/* Text part of the logo with hover effect */}
                <span className="group-hover:text-red-600 transition-colors duration-300 dark:text-white">heer<span className="text-red-600">.</span></span>
            </Link>

            {/* Desktop Navigation Links (Centered) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
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

            {/* Desktop Theme Toggle Button */}
            <div className="hidden md:flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Navigation Controls (Theme Toggle + Hamburger Menu) */}
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
