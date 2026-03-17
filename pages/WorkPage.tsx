import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "../components/Work";
import projectsData from "../data/projects.json";

/**
 * Work Page Component
 *
 * Displays a comprehensive list of all projects fetched from a JSON file.
 * Features a "Back to Home" button and a responsive grid layout.
 */
const WorkPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors mb-8 group font-medium"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </Link>

          <div className="flex flex-col gap-4">
            <span className="text-red-600 font-bold tracking-wider uppercase text-xs">
              All Projects
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
              Full Repository<span className="text-red-600">.</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg mt-4">
              A complete collection of my open source projects, experiments, and
              applications.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              description={project.description}
              tags={project.tags}
              image={project.image}
              link={project.link}
              github_link={project.github_link}
              platforms={project.platforms}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
