import React from 'react';
import { ArrowUpRight, Download, ChevronRight } from 'lucide-react';

/**
 * Hero Component
 * 
 * The introductory section of the portfolio.
 * Displays a welcome message, a brief bio, call-to-action buttons,
 * and a profile image with decorative elements.
 * 
 * Features:
 * - Responsive grid layout (single column on mobile, two columns on desktop).
 * - Dark mode support.
 * - Animated elements and hover effects.
 */
const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-white dark:bg-zinc-950 pt-12 pb-16 md:pt-32 md:pb-32 px-6 md:px-12 border-b border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 order-2 lg:order-1">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs font-semibold tracking-wide uppercase text-zinc-500 dark:text-zinc-400">Software Engineer</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[1] text-zinc-900 dark:text-white mb-8">
              Hello, I'm <br />
              <span className="text-zinc-300 dark:text-zinc-700">Zheer Barzan<span className="text-red-600">.</span></span>
            </h1>

            {/* Bio Description */}
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-10 font-light">
              I blend technical architecture with precision, transforming complex problems into scalable systems, sleek user interfaces, and robust digital assets.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 hover:shadow-red-600/40 group transform hover:-translate-y-1">
                Download CV <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <button className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-8 py-4 rounded-xl font-semibold hover:border-red-200 hover:bg-red-50 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-500 transition-all group flex items-center gap-2">
                View Github <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Image Column */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 mb-10 lg:mb-0">
            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200 dark:shadow-zinc-900/50 bg-zinc-100 dark:bg-zinc-900 group">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 dark:from-zinc-800 to-transparent z-0"></div>

              {/* Profile Image */}
              <img
                src="public/images/personal/IMG_1495.JPG"
                alt="Zheer Barzan"
                className="w-full h-full object-cover relative z-10 mix-blend-multiply dark:mix-blend-normal grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
              />

              {/* Floating Experience Badge */}
              
            </div>

            {/* Decorative Background Blurs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-zinc-900/5 dark:bg-white/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;