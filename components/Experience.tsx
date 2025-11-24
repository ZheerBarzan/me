import React from 'react';
import { GraduationCap, Briefcase, Award, Calendar } from 'lucide-react';

/**
 * Card Component
 * 
 * A reusable card component to display education or experience items.
 * 
 * Props:
 * - icon: ReactNode - The icon to display.
 * - title: string - The main title (e.g., Job Title or Degree).
 * - subtitle: string - The subtitle (e.g., Company or University).
 * - description: string (optional) - A brief description of the role or achievement.
 * - year: string (optional) - The time period.
 */
const Card: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; description?: string; year?: string }> = ({ icon, title, subtitle, description, year }) => (
    <div className="bg-white dark:bg-zinc-950 group p-6 md:p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-red-100 dark:hover:border-red-900 hover:shadow-[0_8px_30px_rgb(239,68,68,0.06)] transition-all duration-300 h-full flex flex-col relative overflow-hidden">
        {/* Hover accent line on the left */}
        <div className="absolute top-0 left-0 w-1 h-full bg-red-600 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300"></div>

        <div className="flex justify-between items-start mb-6">
            {/* Icon Container */}
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                {icon}
            </div>
            {/* Year Badge */}
            {year && <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors whitespace-nowrap ml-2">{year}</span>}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{title}</h3>
        <p className="text-zinc-400 text-sm font-medium mb-4 uppercase tracking-wide">{subtitle}</p>
        {description && <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-auto">{description}</p>}
    </div>
);

/**
 * Experience Component
 * 
 * Displays the user's education and professional experience in a two-column layout.
 * Includes a decorative quote card at the end of the experience column.
 */
const Experience: React.FC = () => {
    return (
        <section className="relative w-full bg-zinc-50/50 dark:bg-zinc-900/50 py-24 md:py-32 px-6 md:px-12 overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-6">
                    <div className="w-full md:w-auto">
                        <span className="text-red-600 font-bold tracking-wider uppercase text-xs mb-4 block">The Journey</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
                            Experience<span className="text-red-600">.</span>
                        </h2>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-left md:text-right text-lg">
                        A timeline of my academic foundation and professional career growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Education Column */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 mb-4">
                            <span className="w-8 h-1 bg-red-600 rounded-full"></span> Education
                        </h3>

                        <Card
                            icon={<GraduationCap size={24} />}
                            title="MSc. Software Engineering"
                            subtitle="University of Kurdistan - Hawler"
                            description="Specialized in advanced software architecture and distributed systems."
                            year="2021 - 2023"
                        />

                        <Card
                            icon={<GraduationCap size={24} />}
                            title="BSc. Computer Engineering"
                            subtitle="Komar University (KUST)"
                            description="Foundation in hardware-software integration and computer science principles."
                            year="2016 - 2020"
                        />

                        <Card
                            icon={<Award size={24} />}
                            title="Top 1st Student"
                            subtitle="Achievement"
                            description="Graduated as the top ranking student in the Computer Engineering department at KUST."
                            year="2020"
                        />
                    </div>

                    {/* Experience Column */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 mb-4">
                            <span className="w-8 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span> Career
                        </h3>

                        <Card
                            icon={<Briefcase size={24} />}
                            title="Software Engineer"
                            subtitle="KingForce Security Company"
                            description="Developing secure internal systems and managing software infrastructure for security operations."
                            year="2023 - Present"
                        />

                        <Card
                            icon={<Briefcase size={24} />}
                            title="ICT Instructor"
                            subtitle="British International School (BIS)"
                            description="Teaching computer science fundamentals and programming concepts to students."
                            year="2021 - 2023"
                        />

                        {/* Decorative Quote Card */}
                        <div className="bg-zinc-900 dark:bg-zinc-950 rounded-2xl p-8 text-white min-h-[220px] flex flex-col justify-center relative overflow-hidden group border border-zinc-800">
                            <div className="relative z-10">
                                <p className="text-lg font-medium italic text-zinc-300 mb-4">"Always ready to face the challenges coming my way and solve them easily."</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-[1px] bg-red-600"></div>
                                    <span className="text-xs font-bold uppercase text-red-500">Zheer Barzan</span>
                                </div>
                            </div>
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-red-600/20 rounded-full blur-2xl group-hover:bg-red-600/30 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;