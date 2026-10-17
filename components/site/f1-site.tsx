"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Titillium_Web } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ChevronDown, Copy, Download } from "lucide-react";
import { socialLinks } from "@/components/social-links";
import { monzaSvgPath } from "@/components/three/race/monza";
import { journey, profile, skills, type TimelineEntry } from "@/lib/content";
import { cn } from "@/lib/utils";
import { RaceGame } from "./race-game";
import { ToolkitRace } from "./toolkit-race";
import { f, snap } from "./theme";

const titillium = Titillium_Web({ subsets: ["latin"], weight: ["400", "600", "700", "900"], style: ["normal", "italic"], display: "swap" });

const sections = [
  { id: "standings", label: "Standings" },
  { id: "setup", label: "Setup" },
  { id: "garage", label: "Garage" },
  { id: "radio", label: "Radio" },
];

/**
 * The site as a race weekend, in white. Lights out to start; telemetry
 * reads your scroll; a car laps Monza on the map as you read. The projects
 * section is a drivable game.
 */
export function F1Site() {
  const [ready, setReady] = useState(false);
  return (
    <div className={cn(titillium.className, "relative min-h-dvh overflow-x-clip")} style={{ background: f.bg, color: f.ink }}>
      <StartLights onLightsOut={() => setReady(true)} />
      <Telemetry />
      <TrackMap />
      <main>
        <Hero ready={ready} />
        <Standings />
        <Setup />
        <section id="garage" className="scroll-mt-12 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle kicker="THE GARAGE" title="Projects" />
            <p className="mt-4 max-w-2xl text-lg opacity-70">
              Take the car out on Monza. Every arch on the lap is one of my projects: drive under it to open it.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-6xl px-4">
            <RaceGame />
          </div>
        </section>
        <TeamRadio />
        <Chequered />
      </main>
    </div>
  );
}

/** Five red lights, one by one, then lights out. */
function StartLights({ onLightsOut }: { onLightsOut: () => void }) {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduce || gone) {
      onLightsOut();
      return;
    }
    if (out) {
      const t = setTimeout(() => setGone(true), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => (lit < 5 ? setLit(lit + 1) : setOut(true)), lit < 5 ? 450 : 500 + ((lit * 97) % 500));
    return () => clearTimeout(t);
  }, [lit, out, reduce, gone, onLightsOut]);

  return (
    <AnimatePresence>
      {!gone && !reduce && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-10"
          style={{ background: f.bg }}
          exit={{ y: "-100%", transition: { duration: 0.5, ease: [0.7, 0, 0.3, 1] } }}
        >
          <div className="flex gap-3 rounded-xl p-4" style={{ background: f.ink }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 rounded-lg bg-[#1b1b1b] p-2">
                {[0, 1].map((row) => (
                  <motion.span
                    key={row}
                    className="block size-10 rounded-full md:size-14"
                    animate={{
                      backgroundColor: !out && i < lit ? f.red : "#2a0a0a",
                      boxShadow: !out && i < lit ? `0 0 28px ${f.red}` : "0 0 0 transparent",
                    }}
                    transition={{ duration: 0.08 }}
                  />
                ))}
              </div>
            ))}
          </div>
          <motion.p className="text-4xl font-black tracking-tight italic" animate={{ opacity: out ? 1 : 0.35, scale: out ? 1.08 : 1 }}>
            {out ? "LIGHTS OUT AND AWAY WE GO" : "GET READY…"}
          </motion.p>
          <button type="button" onClick={() => setGone(true)} className="text-sm underline opacity-50">
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A dashboard strip with section links; speed and revs follow your scroll. */
function Telemetry() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const speed = useSpring(useTransform(velocity, (v) => Math.min(340, Math.abs(v) / 9)), { stiffness: 120, damping: 20 });
  const rpm = useTransform(speed, [0, 340], [0.06, 1]);
  const [kmh, setKmh] = useState(0);
  useMotionValueEvent(speed, "change", (v) => setKmh(Math.round(v)));
  const gear = kmh < 5 ? "N" : String(Math.min(8, 1 + Math.floor(kmh / 45)));
  const drs = kmh > 220;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/85 backdrop-blur" style={{ borderColor: f.line }}>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-sm md:gap-5">
        <a href="#top" className="-skew-x-12 px-2 py-0.5 font-black text-white" style={{ background: f.red }}>
          <span className="inline-block skew-x-12">ZB</span>
        </a>
        <nav aria-label="Sections" className="hidden gap-4 font-bold md:flex">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="opacity-60 transition-opacity hover:opacity-100">
              {s.label.toUpperCase()}
            </a>
          ))}
        </nav>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full" style={{ background: f.panel }}>
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left"
            style={{ scaleX: rpm, background: `linear-gradient(90deg, ${f.green}, ${f.yellow} 60%, ${f.red} 85%, ${f.purple})` }}
          />
        </div>
        <span className="w-16 text-right font-bold tabular-nums md:w-20">{kmh} km/h</span>
        <span className="w-5 text-center text-lg font-black tabular-nums">{gear}</span>
        <span className="rounded px-2 py-0.5 text-xs font-black transition-colors" style={{ background: drs ? f.green : f.panel, color: drs ? "#000" : "#999" }}>
          DRS
        </span>
      </div>
    </header>
  );
}

const MAP_W = 220;
const MAP_H = 110;
const monza = monzaSvgPath(MAP_W, MAP_H, 10);

/** The whole visit is one lap of Monza: the car goes round as you scroll. */
function TrackMap() {
  const path = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const x = useMotionValue(monza.start[0]);
  const y = useMotionValue(monza.start[1]);
  useMotionValueEvent(progress, "change", (p) => {
    const el = path.current;
    if (!el) return;
    const pt = el.getPointAtLength(p * el.getTotalLength());
    x.set(pt.x);
    y.set(pt.y);
  });

  // Step aside while the garage (with the game's own map) is on screen.
  const [garageInView, setGarageInView] = useState(false);
  useEffect(() => {
    const garage = document.getElementById("garage");
    if (!garage) return;
    const io = new IntersectionObserver(([entry]) => setGarageInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(garage);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed right-4 bottom-6 z-40 hidden w-60 rounded-xl border bg-white/90 p-3 shadow-lg backdrop-blur lg:block"
      style={{ borderColor: f.line }}
      animate={{ opacity: garageInView ? 0 : 1, y: garageInView ? 16 : 0 }}
      transition={snap}
    >
      <div className="mb-1 flex justify-between text-[11px] font-bold opacity-60">
        <span>MONZA</span>
        <span>LAP 1/1</span>
      </div>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full">
        <path d={monza.d} fill="none" stroke={f.panel} strokeWidth="7" strokeLinejoin="round" />
        <motion.path ref={path} d={monza.d} fill="none" stroke={f.red} strokeWidth="2.5" strokeLinejoin="round" style={{ pathLength: progress }} />
        <motion.circle r="4.5" fill="#fff" stroke={f.red} strokeWidth="2.5" style={{ cx: x, cy: y }} />
      </svg>
    </motion.div>
  );
}

function SpeedLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-px"
          style={{ top: `${8 + i * 6.5}%`, width: `${20 + ((i * 37) % 40)}%`, background: `linear-gradient(90deg, transparent, ${i % 3 ? "#00000018" : f.red + "66"})` }}
          initial={{ x: "120vw" }}
          animate={{ x: "-60vw" }}
          transition={{ duration: 0.9 + ((i * 13) % 10) / 10, repeat: Infinity, ease: "linear", delay: (i * 0.17) % 1.2 }}
        />
      ))}
    </div>
  );
}

function Hero({ ready }: { ready: boolean }) {
  const show = ready ? "show" : "hidden";
  return (
    <section id="top" className="relative mx-auto grid min-h-dvh max-w-6xl items-center gap-10 px-4 pt-20 pb-10 md:grid-cols-[1.3fr_1fr]">
      <SpeedLines />
      <div className="relative flex flex-col gap-6">
        <motion.span
          initial={{ x: -60, opacity: 0 }}
          animate={ready ? { x: 0, opacity: 1 } : undefined}
          transition={snap}
          className="w-fit -skew-x-12 px-3 py-1 text-sm font-black text-white"
          style={{ background: f.red }}
        >
          <span className="inline-block skew-x-12">DRIVER #01 · {profile.location.toUpperCase()}</span>
        </motion.span>
        <h1 className="text-[clamp(56px,11vw,150px)] leading-[0.82] font-black tracking-[-0.03em] italic">
          {["ZHEER", "BARZAN"].map((w, i) => (
            <motion.span
              key={w}
              className="block"
              variants={{ hidden: { x: "-110%", skewX: -20 }, show: { x: "0%", skewX: 0 } }}
              initial="hidden"
              animate={show}
              transition={{ ...snap, delay: 0.1 + i * 0.12 }}
            >
              {w}
              {i === 1 && <span style={{ color: f.red }}>.</span>}
            </motion.span>
          ))}
        </h1>
        <p className="max-w-lg text-lg opacity-75">{profile.bio}</p>
        <div className="flex flex-wrap gap-3">
          <a href={profile.cv} download="Zheer_Barzan_CV.pdf" className="inline-flex -skew-x-12 items-center gap-2 px-6 py-3 font-black text-white" style={{ background: f.red }}>
            <span className="inline-flex skew-x-12 items-center gap-2">
              <Download className="size-4" /> DOWNLOAD CV
            </span>
          </a>
          <a href="#garage" className="inline-flex -skew-x-12 items-center gap-2 border-2 px-6 py-3 font-black" style={{ borderColor: f.ink }}>
            <span className="inline-flex skew-x-12 items-center gap-2">DRIVE TO MY PROJECTS →</span>
          </a>
        </div>
      </div>

      {/* Driver card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: `linear-gradient(160deg, ${f.red}, #8a0000 70%)` }}
        initial={{ rotateY: -30, opacity: 0, x: 80 }}
        animate={ready ? { rotateY: 0, opacity: 1, x: 0 } : undefined}
        transition={{ ...snap, delay: 0.3 }}
        whileHover={{ rotate: -1.5, scale: 1.02 }}
      >
        <span className="absolute -top-6 -left-2 text-[180px] leading-none font-black text-white italic opacity-20">01</span>
        <div className="relative aspect-[4/5]">
          <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover mix-blend-luminosity" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
          <div>
            <p className="text-sm font-bold opacity-80">{profile.role.toUpperCase()}</p>
            <p className="text-3xl font-black italic">ZHEER BARZAN</p>
          </div>
          <span className="rounded px-2 py-1 text-sm font-black" style={{ background: f.purple }}>
            P1 ×2
          </span>
        </div>
      </motion.div>
    </section>
  );
}

const teamColor = { career: f.red, education: "#2563EB", award: f.purple } as const;

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-bold tracking-widest" style={{ color: f.red }}>
        {kicker}
      </span>
      <motion.h2
        className="text-[clamp(40px,7vw,88px)] leading-none font-black italic"
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={snap}
      >
        {title}
      </motion.h2>
    </div>
  );
}

/** Two timing towers, education and career. Click a row for the full story. */
function Standings() {
  const education = journey.filter((e) => e.kind !== "career");
  const career = journey.filter((e) => e.kind === "career");
  return (
    <section id="standings" className="mx-auto max-w-6xl scroll-mt-12 px-4 py-24">
      <SectionTitle kicker="SESSION RESULTS" title="Standings" />
      <p className="mt-4 text-lg opacity-70">Tap a row to see the details.</p>
      <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
        <TimingTower title="Education" subtitle="Degrees and awards" color={teamColor.education} entries={education} />
        <TimingTower title="Career" subtitle="Roles, most recent first" color={teamColor.career} entries={career} />
      </div>
      <p className="mt-4 flex gap-4 text-xs opacity-60">
        <Legend color={f.red} label="Career" /> <Legend color="#2563EB" label="Education" /> <Legend color={f.purple} label="Award · ranked 1st" />
      </p>
    </section>
  );
}

/** A TV-style timing tower whose rows open to show their description. */
function TimingTower({
  title,
  subtitle,
  color,
  entries,
}: {
  title: string;
  subtitle: string;
  color: string;
  entries: TimelineEntry[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm" style={{ borderColor: f.line }}>
      <div className="flex items-baseline justify-between px-4 py-3 text-white" style={{ background: f.ink }}>
        <h3 className="flex items-center gap-2 text-xl font-black italic">
          <span className="h-5 w-1.5 rounded" style={{ background: color }} />
          {title.toUpperCase()}
        </h3>
        <span className="text-xs font-bold opacity-60">{subtitle.toUpperCase()}</span>
      </div>
      <ol>
        {entries.map((e, i) => {
          const isOpen = open === i;
          const panel = `${id}-${i}`;
          return (
            <motion.li
              key={e.title + e.period}
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ ...snap, delay: i * 0.06 }}
              className="border-b last:border-0"
              style={{ borderColor: f.line }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "grid w-full grid-cols-[40px_6px_1fr_auto] items-center gap-3 px-3 py-3 text-left transition-colors",
                  isOpen ? "bg-black/[0.04]" : "hover:bg-black/[0.03]"
                )}
              >
                <span className="text-center text-lg font-black tabular-nums italic">P{i + 1}</span>
                <span className="h-8 w-1.5 rounded" style={{ background: teamColor[e.kind] }} />
                <span className="min-w-0">
                  <span className="block truncate font-bold">{e.title}</span>
                  <span className="block truncate text-sm opacity-60">{e.place}</span>
                </span>
                <span className="flex items-center gap-2">
                  {e.kind === "award" && (
                    <span className="rounded px-1.5 py-0.5 text-[11px] font-black text-white" style={{ background: f.purple }}>
                      FASTEST
                    </span>
                  )}
                  <span className="hidden font-mono text-sm tabular-nums opacity-70 sm:inline">{e.period}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={snap} className="opacity-50">
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </motion.span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panel}
                    role="region"
                    aria-label={`${e.title} details`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.15 } }}
                    transition={snap}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 border-l-4 py-3 pr-4 pl-[60px]" style={{ borderColor: teamColor[e.kind], background: f.panel }}>
                      <p className="font-mono text-xs font-bold opacity-60">
                        {e.period} · {e.place}
                      </p>
                      <p className="leading-relaxed">{e.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ background: color }} /> {label}
    </span>
  );
}

/** Skills as a field of race cars streaming across the track. */
function Setup() {
  return (
    <section id="setup" className="scroll-mt-12 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle kicker="ON THE GRID" title="Toolkit" />
        <p className="mt-4 text-lg opacity-70">
          {skills.length} tools on the grid. Hover a lane to hold it.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-4">
        <ToolkitRace />
      </div>
    </section>
  );
}

/** Contact as a team radio message. */
function TeamRadio() {
  const [copied, setCopied] = useState(false);
  return (
    <section id="radio" className="mx-auto max-w-3xl scroll-mt-12 px-4 py-24">
      <SectionTitle kicker="TEAM RADIO" title="Box, box." />
      <div className="mt-10 overflow-hidden rounded-xl border bg-white shadow-sm" style={{ borderColor: f.line }}>
        <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: f.line }}>
          <span className="rounded px-2 py-0.5 text-xs font-black text-white" style={{ background: f.red }}>
            RADIO
          </span>
          <span className="font-bold">ZHEER · ENGINEER</span>
          <div className="ml-auto flex h-6 items-end gap-0.5" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full"
                style={{ background: f.green }}
                animate={{ height: ["20%", `${30 + ((i * 41) % 70)}%`, "20%"] }}
                transition={{ duration: 0.6 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5 text-lg">
          {[
            "Copy, we can see you on the site. Looking good out there.",
            "If you've got a project or a role in mind, box this lap.",
            `Email is ${profile.email}. Over.`,
          ].map((line, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.6 }}>
              <span className="mr-2 font-black italic" style={{ color: f.red }}>
                ▸
              </span>
              {line}
            </motion.p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 border-t p-4" style={{ borderColor: f.line }}>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(profile.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="inline-flex items-center gap-2 rounded px-4 py-2 font-black"
            style={{ background: copied ? f.green : f.red, color: copied ? "#000" : "#fff" }}
          >
            <Copy className="size-4" /> {copied ? "COPIED" : "COPY EMAIL"}
          </button>
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border px-4 py-2 font-bold hover:bg-black/[0.03]" style={{ borderColor: f.line }}>
              <s.icon className="size-4" /> {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A waving chequered flag to end the lap. */
function Chequered() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 pt-16 pb-24">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, c) => (
          <motion.div key={c} className="flex flex-col" animate={{ y: [0, -8, 0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: c * 0.08 }}>
            {Array.from({ length: 6 }).map((_, r) => (
              <span key={r} className="block size-5 md:size-7" style={{ background: (r + c) % 2 ? "#fff" : "#000" }} />
            ))}
          </motion.div>
        ))}
      </div>
      <p className="text-2xl font-black italic">CHEQUERED FLAG · THANKS FOR VISITING</p>
      <p className="text-sm opacity-50">
        © {profile.name} · “{profile.quote}”
      </p>
    </section>
  );
}
