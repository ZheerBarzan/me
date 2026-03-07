import React from "react";
import { ArrowUpRight, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import projects from "../data/projects.json";
/**
 * Interface for Project Props
 * Defines the structure for project data passed to the ProjectCard component.
 */
export interface ProjectProps {
  name: string;
  description: string;
  tags: string[];
  image: string;
}

/**
 * ProjectCard Component
 *
 * Displays a single project with an image, description, tags, and links.
 * Features hover effects for the image and "View Project" button.
 */
export const ProjectCard: React.FC<ProjectProps> = ({
  name,
  description,
  tags,
  image,
  link,
  github_link,
}) => (
  <div className="group relative w-full bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-900 hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-500 flex flex-col">
    {/* Image Container with Hover Overlay */}
    <div className="h-[280px] overflow-hidden relative bg-zinc-100 dark:bg-zinc-800">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        >
          View Project
        </a>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-8 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {name}
        </h3>
        {/* Github Link */}
        <a
          href={github_link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 rounded-full hover:bg-red-600 hover:text-white transition-all hover:rotate-12"
        >
          <Github size={18} />
        </a>
      </div>

      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Tags List */}
      <div className="mt-auto flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs font-semibold px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-md text-zinc-600 dark:text-zinc-300 group-hover:border-red-100 dark:group-hover:border-red-900 group-hover:text-red-600 dark:group-hover:text-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Work Component
 *
 * Displays a grid of selected projects (portfolio).
 */
const Work: React.FC = () => {
  return (
    <section className="w-full bg-white dark:bg-zinc-950 py-32 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-red-600 font-bold tracking-wider uppercase text-xs mb-3 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
              My Projects<span className="text-red-600">.</span>
            </h2>
          </div>
          {/* View All Button */}
          <Link
            to="/work"
            className="mt-6 md:mt-0 text-sm font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-8 py-4 rounded-full hover:border-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 group"
          >
            View all repositories{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* limit projects to 4 */}
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              description={project.description}
              tags={project.tags}
              image={project.image}
              link={project.link}
              github_link={project.github_link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
