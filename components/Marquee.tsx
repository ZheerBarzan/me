import React from 'react';
import { Code2, Terminal, Cpu } from 'lucide-react';

/**
 * Marquee Component
 * 
 * Displays a section with large, bold text and icons.
 * Designed to look like a scrolling marquee or a statement banner.
 * 
 * Note: Currently static, but styled to be visually impactful.
 */
const Marquee: React.FC = () => {
  return (
    <div className="w-full bg-white py-24 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto px-6">
        {/* Line 1: Bold Ideas */}
        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-zinc-900">
          Bold Ideas <span className="inline-block align-middle mx-2 p-2 bg-red-600 text-white rotate-3 rounded"><Code2 size={32} /></span> Striking Code
        </h2>

        {/* Line 2: Precision */}
        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-zinc-900 mt-4">
          <span className="inline-block align-middle mx-2 p-2 bg-zinc-900 text-white -rotate-3 rounded"><Terminal size={32} /></span> Precision in Every Pixel
        </h2>

        {/* Line 3: Engineering */}
        <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-zinc-400 mt-4">
          Engineering Without <span className="inline-block align-middle mx-2 p-2 bg-red-600 text-white rotate-6 rounded"><Cpu size={32} /></span> Limits
        </h2>
      </div>
    </div>
  );
};

export default Marquee;