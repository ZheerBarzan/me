import React from 'react';

const Step: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="border border-zinc-100 p-8 rounded-xl bg-zinc-50 hover:shadow-lg transition-shadow duration-300">
    <span className="text-sm font-mono text-zinc-400 mb-4 block">{number}</span>
    <h3 className="text-xl font-bold text-zinc-900 mb-3">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const Process: React.FC = () => {
  return (
    <section className="w-full bg-white py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
             <div>
                <span className="text-sm font-semibold tracking-wider uppercase text-zinc-500 mb-4 block">• My Process</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
                    We believe in a streamlined, <span className="text-zinc-400">collaborative approach</span> that brings your vision to life, efficiently and effectively.
                </h2>
                <button className="mt-8 px-6 py-3 border border-zinc-300 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all">
                    Let's get started ↗
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Step 
                    number="01." 
                    title="Discovery & Strategy" 
                    description="We start by understanding your technical requirements, user needs, and business goals." 
                />
                <Step 
                    number="02." 
                    title="Architecture & Design" 
                    description="Creating robust system designs and UI/UX mockups to set a solid foundation." 
                />
                 <Step 
                    number="03." 
                    title="Development & Test" 
                    description="Clean, modular code written with TypeScript. Rigorous testing ensures stability." 
                />
                 <Step 
                    number="04." 
                    title="Launch & Scale" 
                    description="Seamless deployment to cloud infrastructure and ongoing optimization." 
                />
             </div>
        </div>
      </div>
    </section>
  );
};

export default Process;