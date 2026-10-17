"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, LogOut, RotateCcw } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";
import { SceneBoundary } from "@/components/three/canvas-shell";
import { commands, controls, hud, pose, useHud } from "@/components/three/race/store";
import { gateColor, gateLabel, gates, minimapPath, points, type Gate } from "@/components/three/race/track";
import { platformLabel, projectLinks, projects } from "@/lib/content";
import { cn } from "@/lib/utils";
import { f } from "./theme";

const RaceScene = dynamic(() => import("@/components/three/race/race-scene"), {
  ssr: false,
  loading: () => <div className="flex size-full items-center justify-center text-2xl font-black text-white italic">LOADING MONZA…</div>,
});

const keyMap: Record<string, keyof typeof controls> = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

function formatTime(t: number | null) {
  if (t === null) return "--:--.---";
  const m = Math.floor(t / 60);
  return `${m}:${(t - m * 60).toFixed(3).padStart(6, "0")}`;
}

const stopDriving = () => {
  Object.keys(controls).forEach((k) => (controls[k as keyof typeof controls] = false));
  hud.set({ started: false });
};

/** The projects, as a drivable lap of Monza, with a plain list underneath. */
export function RaceGame() {
  const box = useRef<HTMLDivElement>(null);
  const near = useInView(box, { margin: "300px 0px 300px 0px" });
  const visible = useInView(box, { amount: 0.3 });
  // Mount the 3D scene the first time the section comes near, then keep it.
  const [mounted, setMounted] = useState(false);
  if (near && !mounted) setMounted(true);
  const started = useHud((s) => s.started);

  // Keys drive only while the engine is on; then arrows stop scrolling the page.
  useEffect(() => {
    const set = (e: KeyboardEvent, down: boolean) => {
      if (!hud.get().started) return;
      const key = keyMap[e.code];
      if (key) {
        controls[key] = down;
        e.preventDefault();
      }
      if (down && e.code === "KeyR") commands.reset = true;
      if (down && e.code === "Escape") stopDriving();
    };
    const onDown = (e: KeyboardEvent) => set(e, true);
    const onUp = (e: KeyboardEvent) => set(e, false);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      stopDriving();
      hud.set({ collected: [], active: null, lap: 1, best: null });
    };
  }, []);

  // Leaving the section parks the car.
  useEffect(() => {
    if (!visible && hud.get().started) stopDriving();
  }, [visible]);

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={box}
        className="relative h-[min(82dvh,760px)] min-h-[520px] overflow-hidden rounded-2xl border bg-[#BFE3FF] text-white shadow-xl select-none"
        style={{ borderColor: f.line }}
      >
        <div className="absolute inset-0">
          {mounted && (
            <SceneBoundary fallback={<p className="p-10 text-black">The game needs WebGL. The project list below has everything.</p>}>
              <RaceScene paused={!near} />
            </SceneBoundary>
          )}
        </div>
        <TopBar />
        <Minimap />
        <GateCard />
        <Speedo />
        <TouchControls />
        <AnimatePresence>{!started && <StartScreen />}</AnimatePresence>
      </div>
      <ProjectList />
    </div>
  );
}

function StartScreen() {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-black/55 p-6 text-center backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <p className="w-fit -skew-x-12 px-3 py-1 text-sm font-black" style={{ background: f.red }}>
        <span className="inline-block skew-x-12">MONZA · {gates.length} PROJECTS ON THE LAP</span>
      </p>
      <h3 className="text-[clamp(36px,6vw,80px)] leading-[0.85] font-black italic">TAKE IT FOR A LAP</h3>
      <p className="max-w-md text-base opacity-85">
        Each arch is a project, placed at one of Monza&apos;s corners. Drive under it to open it.
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm opacity-80">
        <span className="text-right font-bold">W / ↑</span> <span className="text-left">Throttle</span>
        <span className="text-right font-bold">S / ↓</span> <span className="text-left">Brake · reverse</span>
        <span className="text-right font-bold">A D / ← →</span> <span className="text-left">Steer</span>
        <span className="text-right font-bold">R · Esc</span> <span className="text-left">Back on track · exit</span>
      </div>
      <button type="button" onClick={() => hud.set({ started: true })} className="-skew-x-12 px-10 py-4 text-2xl font-black italic" style={{ background: f.red }}>
        <span className="inline-block skew-x-12">START ENGINE</span>
      </button>
      <a href="#project-list" className="text-sm underline opacity-75">
        Rather just read? See the list
      </a>
    </motion.div>
  );
}

function TopBar() {
  const lap = useHud((s) => s.lap);
  const lapTime = useHud((s) => s.lapTime);
  const best = useHud((s) => s.best);
  const collected = useHud((s) => s.collected);
  const started = useHud((s) => s.started);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-start justify-between gap-2 p-3">
      <div className="flex overflow-hidden rounded-lg bg-black/75 backdrop-blur">
        <div className="px-3 py-2" style={{ background: f.red }}>
          <p className="text-[10px] font-bold opacity-80">LAP</p>
          <p className="text-xl leading-none font-black italic tabular-nums">{lap}</p>
        </div>
        <div className="px-3 py-2">
          <p className="text-[10px] font-bold opacity-60">TIME</p>
          <p className="font-mono text-lg leading-none tabular-nums">{formatTime(lapTime)}</p>
        </div>
        <div className="hidden px-3 py-2 sm:block">
          <p className="text-[10px] font-bold text-[#C084FC]">BEST</p>
          <p className="font-mono text-lg leading-none tabular-nums">{formatTime(best)}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="rounded-lg bg-black/75 px-3 py-2 backdrop-blur">
          <p className="text-[10px] font-bold opacity-60">PROJECTS FOUND</p>
          <div className="mt-1 flex gap-1">
            {gates.map((g, i) => (
              <motion.span
                key={i}
                className="block h-3 w-4 rounded-sm"
                animate={{ backgroundColor: collected.includes(i) ? gateColor(g) : "#ffffff22", scale: collected.includes(i) ? [1.6, 1] : 1 }}
                title={gateLabel(g)}
              />
            ))}
          </div>
          <p className="mt-1 text-xs font-bold tabular-nums">
            {collected.length}/{gates.length}
          </p>
        </div>
        {started && (
          <button type="button" onClick={stopDriving} className="pointer-events-auto flex items-center gap-1 rounded-lg bg-black/75 px-3 py-2 text-xs font-bold backdrop-blur">
            <LogOut className="size-3.5" /> EXIT
          </button>
        )}
      </div>
    </div>
  );
}

function Speedo() {
  const speed = useHud((s) => s.speed);
  const offTrack = useHud((s) => s.offTrack);
  return (
    <div className="pointer-events-none absolute bottom-24 left-1/2 z-20 -translate-x-1/2 text-center md:bottom-6">
      <p className="text-6xl leading-none font-black italic tabular-nums [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">{speed}</p>
      <p className="text-xs font-bold opacity-80">KM/H</p>
      <AnimatePresence>
        {offTrack && (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 rounded bg-[#FACC15] px-2 py-0.5 text-xs font-black text-black">
            TRACK LIMITS
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const MINI_W = 190;
const MINI_H = 100;
const mini = minimapPath(MINI_W, MINI_H);

/** The track from above with the car's live position. */
function Minimap() {
  const dot = useRef<SVGGElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const [x, y] = mini.project(pose.x, pose.z);
      dot.current?.setAttribute("transform", `translate(${x} ${y}) rotate(${(-pose.heading * 180) / Math.PI + 180})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="pointer-events-none absolute right-3 bottom-24 z-20 hidden rounded-xl bg-black/60 p-2 backdrop-blur sm:block md:bottom-3">
      <svg width={MINI_W} height={MINI_H} viewBox={`0 0 ${MINI_W} ${MINI_H}`}>
        <path d={mini.d} fill="none" stroke="#ffffff55" strokeWidth="6" strokeLinejoin="round" />
        <path d={mini.d} fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" />
        {gates.map((g, i) => {
          const [x, y] = mini.project(points[g.sample].x, points[g.sample].z);
          return <circle key={i} cx={x} cy={y} r={3} fill={gateColor(g)} stroke="#fff" strokeWidth="1" />;
        })}
        <g ref={dot}>
          <path d="M0 -6 L4 4 L-4 4 Z" fill={f.red} stroke="#fff" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

/** The card for the project you just drove under. */
function GateCard() {
  const active = useHud((s) => s.active);
  const gate = active === null ? null : gates[active];
  return (
    <div className="pointer-events-none absolute top-24 left-3 z-20 w-[min(340px,calc(100%-24px))]">
      <AnimatePresence mode="wait">
        {gate && (
          <motion.article
            key={active}
            initial={{ x: -60, opacity: 0, skewX: -8 }}
            animate={{ x: 0, opacity: 1, skewX: 0 }}
            exit={{ x: -40, opacity: 0, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="pointer-events-auto overflow-hidden rounded-xl bg-black/85 backdrop-blur"
          >
            <div className="flex items-center justify-between px-3 py-1.5 text-xs font-black" style={{ background: gateColor(gate) }}>
              <span>{gateLabel(gate)}</span>
              <span className="opacity-80">{gate.corner.toUpperCase()}</span>
            </div>
            <CardBody gate={gate} />
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}

function CardBody({ gate }: { gate: Gate }) {
  const p = gate.project;
  const links = projectLinks(p);
  return (
    <div className="flex flex-col">
      <ProjectMedia project={p} eager className="aspect-[16/9] w-full" />
      <div className="flex flex-col gap-2 p-4">
        <p className="text-2xl font-black italic">{p.name}</p>
        <p className="text-sm opacity-80">{p.summary}</p>
        <p className="text-xs opacity-60">{p.stack.join(" · ")}</p>
        <div className="flex flex-wrap gap-2">
          <a href={`/work/${p.slug}`} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-bold" style={{ background: f.red }}>
            Details <ArrowUpRight className="size-3" />
          </a>
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded border border-white/30 px-2 py-1 text-xs font-bold">
              {l.label} <ArrowUpRight className="size-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/** On-screen pedals and steering for touch screens. */
function TouchControls() {
  const started = useHud((s) => s.started);
  if (!started) return null;
  const hold = (key: keyof typeof controls) => ({
    onPointerDown: (e: React.PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      controls[key] = true;
    },
    onPointerUp: () => (controls[key] = false),
    onPointerCancel: () => (controls[key] = false),
  });
  const btn = "flex size-16 items-center justify-center rounded-2xl bg-black/50 backdrop-blur active:bg-black/80 touch-none";
  return (
    <div className="absolute inset-x-0 bottom-3 z-20 flex justify-between px-3 [@media(hover:hover)_and_(pointer:fine)]:hidden">
      <div className="flex gap-3">
        <button type="button" aria-label="Steer left" className={btn} {...hold("left")}>
          <ArrowLeft className="size-7" />
        </button>
        <button type="button" aria-label="Steer right" className={btn} {...hold("right")}>
          <ArrowRight className="size-7" />
        </button>
      </div>
      <div className="flex gap-3">
        <button type="button" aria-label="Back on track" className={cn(btn, "size-12 self-end")} onClick={() => (commands.reset = true)}>
          <RotateCcw className="size-5" />
        </button>
        <button type="button" aria-label="Brake" className={btn} {...hold("down")}>
          <ArrowDown className="size-7" />
        </button>
        <button type="button" aria-label="Throttle" className={cn(btn, "bg-[#E10600]/80")} {...hold("up")}>
          <ArrowUp className="size-7" />
        </button>
      </div>
    </div>
  );
}

/** Every project as a plain list, for readers who'd rather not drive. */
function ProjectList() {
  return (
    <div id="project-list" className="scroll-mt-16">
      <p className="mb-4 text-sm font-bold tracking-widest" style={{ color: f.red }}>
        PIT WALL · ALL PROJECTS
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a href={`/work/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-lg" style={{ borderColor: f.line }}>
              <ProjectMedia project={p} className="aspect-[4/3] w-full" />
              <div className="flex flex-1 flex-col gap-1 p-3">
                <span className="text-xs font-bold opacity-50">
                  {gates[i]?.corner.toUpperCase()} · {p.platforms.map((x) => platformLabel[x]).join(" / ")}
                </span>
                <span className="text-lg leading-tight font-black italic group-hover:underline">{p.name}</span>
                <span className="text-sm opacity-70">{p.summary}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
