import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Titillium_Web } from "next/font/google";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";
import { f } from "@/components/site/theme";
import { gateCorners } from "@/components/three/race/monza";
import { getProject, platformLabel, projectLinks, projects } from "@/lib/content";
import { cn } from "@/lib/utils";

const titillium = Titillium_Web({ subsets: ["latin"], weight: ["400", "700", "900"], style: ["normal", "italic"], display: "swap" });

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

// Reading `params` suspends; the boundary keeps navigation instant (every
// slug is still prerendered via generateStaticParams).
export default function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const links = projectLinks(project);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  // Same corner the project's arch sits at in the game.
  const corner = gateCorners[index % gateCorners.length].name;

  return (
    <main className={cn(titillium.className, "min-h-dvh")} style={{ background: f.bg, color: f.ink }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 md:py-16">
        <Link href="/#garage" className="inline-flex w-fit items-center gap-2 font-bold opacity-60 transition-opacity hover:opacity-100">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to the garage
        </Link>

        <header className="flex flex-col gap-4">
          <span className="w-fit -skew-x-12 px-3 py-1 text-sm font-black text-white" style={{ background: f.red }}>
            <span className="inline-block skew-x-12">
              GARAGE {String(index + 1).padStart(2, "0")} · {corner.toUpperCase()}
            </span>
          </span>
          <h1 className="text-[clamp(44px,9vw,112px)] leading-[0.85] font-black tracking-[-0.02em] italic">{project.name}</h1>
          <p className="max-w-2xl text-xl opacity-70">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {project.platforms.map((p) => (
              <span key={p} className="rounded border px-2 py-0.5 text-sm font-bold" style={{ borderColor: f.line }}>
                {platformLabel[p]}
              </span>
            ))}
          </div>
        </header>

        <ProjectMedia project={project} eager className="aspect-square w-full overflow-hidden rounded-2xl shadow-xl md:aspect-[16/9]" />

        <section className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <p className="text-xl leading-relaxed opacity-80">{project.description}</p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold tracking-widest" style={{ color: f.red }}>
                CAR SETUP
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded px-2 py-1 text-sm font-bold" style={{ background: f.panel }}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            {links.length > 0 && (
              <div className="flex flex-col items-start gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex -skew-x-12 items-center gap-2 px-4 py-2 font-black text-white"
                    style={{ background: f.ink }}
                  >
                    <span className="inline-flex skew-x-12 items-center gap-2">
                      {link.label} <ArrowUpRight className="size-4" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <Link href={`/work/${next.slug}`} className="group flex items-end justify-between gap-4 border-t pt-8" style={{ borderColor: f.line }}>
          <span className="flex flex-col gap-1">
            <span className="text-sm font-bold tracking-widest opacity-50">NEXT IN THE GARAGE</span>
            <span className="text-[clamp(28px,5vw,56px)] leading-none font-black italic">{next.name}</span>
          </span>
          <ArrowUpRight className="size-8 shrink-0 transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
