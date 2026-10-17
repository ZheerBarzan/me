import type { Skill } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SkillIcon({ skill, className }: { skill: Skill; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={skill.icon}
      alt=""
      aria-hidden="true"
      className={cn("size-5 object-contain", skill.mono && "dark:invert", className)}
    />
  );
}
