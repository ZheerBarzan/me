import React from 'react';
import { ArrowUpRight, Download, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-white pt-12 pb-16 md:pt-32 md:pb-32 px-6 md:px-12 border-b border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 w-fit mb-8">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-semibold tracking-wide uppercase text-zinc-500">Software Engineer</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[1] text-zinc-900 mb-8">
              Hello, I'm <br/>
              <span className="text-zinc-300">Zheer Barzan<span className="text-red-600">.</span></span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed mb-10 font-light">
               I blend technical architecture with precision, transforming complex problems into scalable systems, sleek user interfaces, and robust digital assets.
            </p>
            
            <div className="flex flex-wrap gap-4">
                <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 hover:shadow-red-600/40 group transform hover:-translate-y-1">
                    Download CV <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
                <button className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-xl font-semibold hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all group flex items-center gap-2">
                    View Github <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 mb-10 lg:mb-0">
             <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200 bg-zinc-100 group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-transparent z-0"></div>
                 <img 
                   src="https://picsum.photos/seed/zheerprofile/1000/1200" 
                   alt="Zheer Barzan" 
                   className="w-full h-full object-cover relative z-10 mix-blend-multiply grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                 />
                 
                 {/* Floating Badge */}
                 <div className="absolute bottom-6 left-6 right-6 md:right-auto md:bottom-8 md:-left-8 bg-white/90 backdrop-blur-xl px-6 py-4 rounded-xl border border-white shadow-xl z-20 flex items-center gap-4 transform md:group-hover:translate-x-4 transition-transform duration-500">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-lg">5+</div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Experience</p>
                        <p className="font-bold text-zinc-900 whitespace-nowrap">Years Working</p>
                    </div>
                 </div>
             </div>
             
             {/* Decorative Elements - Positioned strictly within relative container */}
             <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
             <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-zinc-900/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;