import React from 'react';

/**
 * Skills Data
 * 
 * A list of technical skills to be displayed.
 * Each skill has a name and a URL to its icon.
 */
const skills = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "#02569B" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", color: "#0175C2" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "#FFCA28" },
  { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", color: "#F05138" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "#092E20" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599C" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", color: "#E87D0D" },
  { name: "Unreal Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg", color: "#0E1128" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ED" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#F24E1E" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg", color: "#31A8FF" },
  { name: "AppWrite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/appwrite/appwrite-original.svg", color: "#FD366E" },
];

/**
 * Skills Component
 * 
 * Displays a grid of technical skills with icons and names.
 * Features hover effects that reveal a background color and colorize the icon.
 */
const Skills: React.FC = () => {
  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-24 px-6 md:px-12 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-red-600 font-bold tracking-wider uppercase text-xs mb-3">Tech Stack</span>
          <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">Technical Arsenal<span className="text-red-600">.</span></h2>
        </div>

        {/* Skills Marquee Container */}
        <div className="relative w-full overflow-hidden pause-on-hover flex flex-col gap-8">
          {/* Gradient Masks for smooth fade out at edges */}
          <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none"></div>

          {/* Row 1: Left to Right (Standard) */}
          <div className="flex animate-marquee gap-8">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 bg-white dark:bg-zinc-900 border p-4 rounded-xl flex items-center gap-3 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden w-48"
                style={{ borderColor: skill.color }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: skill.color }}></div>
                <div className="w-10 h-10 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors relative z-10">
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain transition-all duration-300" />
                </div>
                <span className="font-semibold text-sm relative z-10 transition-colors" style={{ color: skill.color }}>{skill.name}</span>
              </div>
            ))}
          </div>

          {/* Row 2: Right to Left (Reverse) */}
          <div className="flex animate-marquee-reverse gap-8">
            {[...[...skills].reverse(), ...skills].map((skill, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 bg-white dark:bg-zinc-900 border p-4 rounded-xl flex items-center gap-3 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden w-48"
                style={{ borderColor: skill.color }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: skill.color }}></div>
                <div className="w-10 h-10 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors relative z-10">
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain transition-all duration-300" />
                </div>
                <span className="font-semibold text-sm relative z-10 transition-colors" style={{ color: skill.color }}>{skill.name}</span>
              </div>
            ))}
          </div>

          {/* Row 3: Left to Right (Standard) */}
          <div className="flex animate-marquee gap-8">
            {[...[...skills].sort(() => Math.random() - 0.5), ...skills].map((skill, index) => (
              <div
                key={`row3-${index}`}
                className="flex-shrink-0 bg-white dark:bg-zinc-900 border p-4 rounded-xl flex items-center gap-3 hover:shadow-lg transition-all duration-300 group cursor-default relative overflow-hidden w-48"
                style={{ borderColor: skill.color }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: skill.color }}></div>
                <div className="w-10 h-10 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors relative z-10">
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain transition-all duration-300" />
                </div>
                <span className="font-semibold text-sm relative z-10 transition-colors" style={{ color: skill.color }}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
};

export default Skills;