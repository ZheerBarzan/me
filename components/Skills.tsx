import React from 'react';

const skills = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Swift", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Unreal Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg" },
  { name: "AppWrite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/appwrite/appwrite-original.svg" },
];

const Skills: React.FC = () => {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto">
         <div className="flex flex-col items-center text-center mb-16">
            <span className="text-red-600 font-bold tracking-wider uppercase text-xs mb-3">Tech Stack</span>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900">Technical Arsenal<span className="text-red-600">.</span></h2>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
                <div key={index} className="bg-white border border-zinc-100 p-6 rounded-xl flex flex-col items-center gap-4 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="w-12 h-12 p-2 bg-zinc-50 rounded-xl group-hover:bg-white transition-colors relative z-10">
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                    <span className="font-semibold text-zinc-500 group-hover:text-red-600 relative z-10 transition-colors">{skill.name}</span>
                </div>
            ))}
         </div>
      </div>
    </section>
  );
};

export default Skills;