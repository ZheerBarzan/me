"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiInstagram, SiWhatsapp } from "react-icons/si";
import { FluidHoverHighlight } from "@/components/fluid-hover-highlight";
import { useFluidHover, useRegisterFluidHoverItem } from "@/hooks/use-fluid-hover";
import { profile } from "@/lib/content";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

export const socialLinks = [
  { label: "GitHub", href: profile.socials.github, icon: SiGithub },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: FaLinkedin },
  { label: "Instagram", href: profile.socials.instagram, icon: SiInstagram },
  { label: "WhatsApp", href: profile.socials.whatsapp, icon: SiWhatsapp },
] as const;

/** Social links as one list with a single gliding highlight. */
export function SocialLinks({ axis = "x", className }: { axis?: "x" | "y"; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const hover = useFluidHover(ref, { axis });
  return (
    <ul
      ref={ref}
      {...hover.handlers}
      className={cn("relative flex", axis === "x" ? "flex-wrap gap-1" : "flex-col", className)}
    >
      <FluidHoverHighlight hover={hover} className="rounded-lg" />
      {socialLinks.map((link, i) => (
        <SocialItem key={link.label} index={i} registerItem={hover.registerItem} {...link} />
      ))}
    </ul>
  );
}

function SocialItem({
  index,
  registerItem,
  label,
  href,
  icon: Icon,
}: (typeof socialLinks)[number] & {
  index: number;
  registerItem: (index: number, element: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  useRegisterFluidHoverItem(registerItem, index, ref);
  return (
    <li ref={ref} className="relative">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(typeClass("body"), "relative z-10 flex h-9 items-center gap-2 px-3")}
      >
        <Icon className="text-muted-foreground size-4" aria-hidden="true" />
        {label}
        <ArrowUpRight className="text-muted-foreground size-3.5" aria-hidden="true" />
      </a>
    </li>
  );
}
