import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Dribbble } from 'lucide-react';

const SocialButton: React.FC<{ icon: React.ReactNode; label: string; href: string }> = ({ icon, label, href }) => (
    <a href={href} className="flex items-center justify-between w-full p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:bg-white dark:hover:bg-zinc-900 hover:border-red-600 dark:hover:border-red-600 transition-all group">
        <div className="flex items-center gap-5">
            <div className="text-zinc-500 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{icon}</div>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{label}</span>
        </div>
        <ArrowUpRight className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
    </a>
)

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white pt-32 pb-12 px-6 md:px-12 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
                    <div className="lg:col-span-7">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9] text-zinc-900 dark:text-white">
                            Let's <br /> <span className="text-red-600">Connect.</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg text-xl mb-16 font-light">
                            I'm always interested in hearing about new projects and opportunities. Drop a line and let's create something exceptional.
                        </p>

                        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 inline-flex flex-col sm:flex-row items-center gap-8 hover:border-red-200 dark:hover:border-red-900/50 transition-colors">
                            <div className="relative">
                                <img src="https://picsum.photos/seed/zheerprofile/200/200" className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-zinc-800" alt="Zheer" />
                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-red-600 rounded-full border-4 border-zinc-50 dark:border-zinc-900"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl text-zinc-900 dark:text-white">Zheer Barzan</h3>
                                <p className="text-red-600 dark:text-red-500 text-sm font-medium uppercase tracking-wider">Senior Software Engineer</p>
                            </div>
                            <div className="h-px w-full sm:w-px sm:h-16 bg-zinc-200 dark:bg-zinc-800"></div>
                            <a href="mailto:hello@zheer.dev" className="text-2xl font-bold text-zinc-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors">
                                hello@zheer.dev
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            <h3 className="text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">Socials</h3>
                        </div>
                        <SocialButton icon={<Linkedin size={22} />} label="LinkedIn" href="#" />
                        <SocialButton icon={<Github size={22} />} label="GitHub" href="#" />
                        <SocialButton icon={<MessageCircle size={22} />} label="WhatsApp" href="#" />
                        <SocialButton icon={<Dribbble size={22} />} label="Behance" href="#" />
                    </div>
                </div>

                <div className="pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="bg-zinc-900 dark:bg-white text-white dark:text-black w-6 h-6 flex items-center justify-center rounded text-xs font-bold">Z</span>
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-medium">
                            © 2025 Zheer Barzan.
                        </p>
                    </div>

                    <div className="flex gap-8 text-sm font-semibold text-zinc-500 dark:text-zinc-500">
                        <a href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;