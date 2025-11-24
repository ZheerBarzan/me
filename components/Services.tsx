import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * ServiceItem Component
 * 
 * Displays a single service offering in a list format.
 * 
 * Props:
 * - number: string - The service number.
 * - title: string - The name of the service.
 * - active: boolean (optional) - Highlights the item if true.
 */
const ServiceItem: React.FC<{ number: string; title: string; active?: boolean }> = ({ number, title, active }) => (
  <div className={`py-10 border-b border-zinc-800 flex items-center justify-between group cursor-pointer transition-all duration-500 ${active ? 'border-red-600/50' : 'hover:border-zinc-700'}`}>
    <div className="flex items-center gap-8">
      <span className={`text-sm font-mono ${active ? 'text-red-500' : 'text-zinc-600 group-hover:text-red-500 transition-colors'}`}>{number}</span>
      <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${active ? 'text-white' : 'text-zinc-400 group-hover:text-white transition-colors'}`}>{title}</h3>
    </div>
    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${active ? 'border-red-600 bg-red-600 text-white rotate-0' : 'border-zinc-700 text-zinc-500 group-hover:border-white group-hover:text-white -rotate-45'}`}>
      <ArrowRight size={18} />
    </div>
  </div>
);

/**
 * Services Component
 * 
 * Displays the services offered by the engineer.
 * Features a dark theme design with a glowing background effect.
 */
const Services: React.FC = () => {
  return (
    <section className="relative w-full bg-zinc-950 text-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Background Glow - Strictly contained via overflow-hidden on section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24">
          <span className="text-red-600 font-bold tracking-wider uppercase text-xs mb-3 block">Services</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
          {/* Left Column: Title and Image */}
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">What I bring to <br /><span className="text-red-600">the table.</span></h2>

            {/* Service Preview Card (Visible on Desktop) */}
            <div className="h-[300px] md:h-[400px] w-full bg-zinc-900 rounded-2xl overflow-hidden relative mt-12 hidden lg:block border border-zinc-800 group">
              <img src="https://picsum.photos/seed/code/800/800" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 scale-110" alt="Service Preview" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="w-12 h-1 bg-red-600 rounded-full mb-6"></div>
                <p className="text-zinc-300 text-lg leading-relaxed">From architectural diagrams to deployed scalable systems, I handle the full lifecycle with precision.</p>
              </div>
            </div>

            {/* Mobile Pricing Button */}
            <button className="mt-8 bg-red-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-between w-full md:w-auto gap-4 hover:bg-red-700 transition-colors lg:hidden shadow-lg shadow-red-600/20">
              See pricing <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Column: Service List */}
          <div className="flex flex-col justify-center">
            <p className="text-zinc-400 text-xl mb-16 max-w-md font-light">
              I specialize in building high-performance web applications. My engineering approach ensures your product is scalable, secure, and user-friendly.
            </p>

            <div className="flex flex-col">
              <ServiceItem number="01." title="Full-Stack Development" active />
              <ServiceItem number="02." title="React / Next.js Architecture" />
              <ServiceItem number="03." title="AI Integration (Gemini)" />
              <ServiceItem number="04." title="Performance Optimization" />
            </div>

            {/* Desktop Engagement Button */}
            <button className="mt-16 text-white border border-zinc-700 px-10 py-5 rounded-full font-bold flex items-center justify-between w-full hover:border-red-600 hover:text-red-500 transition-colors hidden lg:flex group">
              See engagement models <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;