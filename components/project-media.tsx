import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A project's animated preview. GIFs skip next/image (it can't optimise
 * animation) and load lazily; the tint fills the frame until they arrive.
 */
export function ProjectMedia({
  project,
  className,
  eager = false,
}: {
  project: Project;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor: project.tint }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.media}
        alt={`${project.name} preview`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 size-full object-contain"
      />
    </div>
  );
}
