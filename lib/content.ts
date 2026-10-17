// Everything the site says about Zheer lives here, typed, so every design
// reads the same facts. Edit this file to update the site.

export type Platform = "web" | "ios" | "android" | "windows" | "mac";

export interface Project {
  slug: string;
  name: string;
  /** One line, shown in lists. */
  summary: string;
  /** A short paragraph for the case study page. */
  description: string;
  stack: string[];
  platforms: Platform[];
  /** Animated preview in /public. */
  media: string;
  /** Background the preview was captured on, used behind it while it loads. */
  tint: string;
  year?: string;
  links: {
    live?: string;
    github?: string;
    appStore?: string;
    playStore?: string;
    microsoftStore?: string;
  };
}

export interface TimelineEntry {
  kind: "education" | "career" | "award";
  title: string;
  place: string;
  placeShort: string;
  period: string;
  /** Year the entry ends (or "now"), used to order the journey. */
  sortYear: number;
  description: string;
}

export interface Skill {
  name: string;
  icon: string;
  /** Monochrome glyphs need inverting on dark backgrounds. */
  mono?: boolean;
}

export const profile = {
  name: "Zheer Barzan",
  firstName: "Zheer",
  role: "Software Engineer",
  location: "Sulaymaniyah, Kurdistan",
  timeZone: "Asia/Baghdad",
  headline: "I turn complex problems into calm, fast software.",
  bio: "Software engineer with an MSc in Software Engineering, graduated first in my department twice. I build cross-platform apps in Flutter and Swift, web tools in Nuxt, and keep real infrastructure running day to day.",
  email: "zheerbarzan85@outlook.com",
  cv: "/images/personal/zheer_barzan_CV.pdf",
  portrait: "/images/personal/IMG_1495.JPG",
  avatar: "/images/personal/IMG_0098.JPG",
  quote: "Don't limit your challenges, challenge your limits.",
  socials: {
    github: "https://github.com/ZheerBarzan",
    linkedin: "https://www.linkedin.com/in/zheer-barzan-80aba5207/",
    instagram: "https://www.instagram.com/zheer_barzan/",
    whatsapp: "https://wa.me/9647700355333",
  },
} as const;

export const education: TimelineEntry[] = [
  {
    kind: "education",
    title: "MSc Software Engineering",
    place: "University of Kurdistan Hewlêr",
    placeShort: "UKH",
    period: "2023 – 2025",
    sortYear: 2025,
    description:
      "Advanced software architecture and distributed systems.",
  },
  {
    kind: "education",
    title: "BSc Computer Engineering",
    place: "Komar University of Science and Technology",
    placeShort: "KUST",
    period: "2018 – 2022",
    sortYear: 2022,
    description: "Graduated with honors in Computer Engineering.",
  },
];

export const achievements: TimelineEntry[] = [
  {
    kind: "award",
    title: "Ranked 1st in Software Engineering",
    place: "University of Kurdistan Hewlêr",
    placeShort: "UKH",
    period: "2025",
    sortYear: 2025,
    description:
      "Graduated as the top-ranking student of the MSc Software Engineering cohort.",
  },
  {
    kind: "award",
    title: "Ranked 1st in Computer Engineering",
    place: "Komar University of Science and Technology",
    placeShort: "KUST",
    period: "2022",
    sortYear: 2022,
    description:
      "Graduated as the top-ranking student of the Computer Engineering department.",
  },
];

export const career: TimelineEntry[] = [
  {
    kind: "career",
    title: "IT Support Supervisor",
    place: "American University of Iraq, Sulaimani",
    placeShort: "AUIS",
    period: "2025 – Now",
    sortYear: 2026,
    description:
      "Leading the IT support team, running campus infrastructure, and supporting students and faculty.",
  },
  {
    kind: "career",
    title: "Software Engineer",
    place: "KingForce Security Company",
    placeShort: "KingForce",
    period: "2024 – 2025",
    sortYear: 2025,
    description:
      "Built secure internal systems and managed the software infrastructure behind security operations.",
  },
  {
    kind: "career",
    title: "ICT Instructor",
    place: "British International School",
    placeShort: "BIS",
    period: "2022 – 2023",
    sortYear: 2023,
    description:
      "Taught computer science fundamentals and programming concepts.",
  },
];

/** Education, career and awards in one list, newest first. */
export const journey: TimelineEntry[] = [...career, ...education, ...achievements].sort(
  (a, b) => b.sortYear - a.sortYear || order(a) - order(b)
);

function order(entry: TimelineEntry) {
  return { career: 0, award: 1, education: 2 }[entry.kind];
}

export const projects: Project[] = [
  {
    slug: "qr-codism",
    name: "QR-Codism",
    summary: "A QR code generator and scanner with a neumorphic interface.",
    description:
      "Generate QR codes for links and Wi-Fi networks, export them as images, and scan codes straight from the camera, all wrapped in a soft neumorphic interface that works on any screen.",
    stack: ["Nuxt", "Vue", "Tailwind CSS"],
    platforms: ["web"],
    media: "/images/Projects/qrcodism.gif",
    tint: "#2093f1",
    links: {
      live: "https://qr-codism.zheerbarzan.dev/",
      github: "https://github.com/ZheerBarzan/QRcodism",
    },
  },
  {
    slug: "project-medusa",
    name: "Project Medusa",
    summary: "A photogrammetry and LiDAR 3D object scanner for iPhone.",
    description:
      "Capture real objects as 3D models with photogrammetry and the iPhone's LiDAR sensor, then browse and preview the scans with RealityKit.",
    stack: ["Swift", "SwiftUI", "Core Data", "RealityKit"],
    platforms: ["ios"],
    media: "/images/Projects/project_Medusa.gif",
    tint: "#f24235",
    // TODO(zheer): real App Store link (the old one was a placeholder).
    links: {},
  },
  {
    slug: "auis-flowchart",
    name: "AUIS Flowchart",
    summary: "An interactive degree flowchart for AUIS students.",
    description:
      "Plan a degree semester by semester: every course laid out on one board, so it's clear what's done and what's left.",
    stack: ["Nuxt", "Tailwind CSS"],
    platforms: ["web"],
    media: "/images/Projects/AUIS_Flowchart.gif",
    tint: "#2595f1",
    links: {
      live: "https://auis-flowchart.zheerbarzan.dev/",
    },
  },
  {
    slug: "habitology",
    name: "Habitology",
    summary: "A habit tracker with a GitHub-style contribution heatmap.",
    description:
      "Track daily habits and watch streaks fill a GitHub-style heatmap. Everything is stored on device, so it's fast and private.",
    stack: ["Flutter", "Dart", "Local storage"],
    platforms: ["ios", "android"],
    media: "/images/Projects/habitology.gif",
    tint: "#ffe05a",
    // TODO(zheer): real App Store / Play Store links (the old ones were placeholders).
    links: {},
  },
  {
    slug: "flagology",
    name: "Flagology",
    summary: "A flag guessing game to test your geography.",
    description:
      "How many of the world's flags do you know? A quick, replayable quiz game built once in Flutter and shipped to web and mobile.",
    stack: ["Flutter", "Dart"],
    platforms: ["web", "ios", "android"],
    media: "/images/Projects/flagology.gif",
    tint: "#81da5b",
    // TODO(zheer): real App Store / Play Store links (the old ones were placeholders).
    links: {
      live: "https://flagology.zheerbarzan.dev/",
    },
  },
];

export const skills: Skill[] = [
  { name: "Flutter", icon: "/icons/flutter.svg" },
  { name: "Dart", icon: "/icons/dart.svg" },
  { name: "Swift", icon: "/icons/swift.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "Appwrite", icon: "/icons/appwrite.svg" },
  { name: "Nuxt", icon: "/icons/nuxtjs.svg" },
  { name: "Vue", icon: "/icons/vuejs.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "Django", icon: "/icons/django.svg", mono: true },
  { name: "C++", icon: "/icons/cplusplus.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Git", icon: "/icons/git.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "Photoshop", icon: "/icons/photoshop.svg" },
  { name: "Blender", icon: "/icons/blender.svg" },
  { name: "Unreal Engine", icon: "/icons/unrealengine.svg", mono: true },
];

export const platformLabel: Record<Platform, string> = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  windows: "Windows",
  mac: "macOS",
};

/** The external links a project actually has, in display order. */
export function projectLinks(project: Project) {
  const { live, github, appStore, playStore, microsoftStore } = project.links;
  return [
    live && { label: "Visit site", href: live },
    appStore && { label: "App Store", href: appStore },
    playStore && { label: "Google Play", href: playStore },
    microsoftStore && { label: "Microsoft Store", href: microsoftStore },
    github && { label: "Source on GitHub", href: github },
  ].filter(Boolean) as { label: string; href: string }[];
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
