"use client";

import { skills, type Skill } from "@/lib/content";
import { cn } from "@/lib/utils";

// Each skill gets a livery; dark liveries carry white text, light ones black.
const liveries = [
  { body: "#E10600", text: "#fff" },
  { body: "#1E41FF", text: "#fff" },
  { body: "#00A19B", text: "#fff" },
  { body: "#FF8000", text: "#000" },
  { body: "#7A2EE6", text: "#fff" },
  { body: "#F5C400", text: "#000" },
  { body: "#0B0B0F", text: "#fff" },
  { body: "#16A34A", text: "#fff" },
  { body: "#E5E7EB", text: "#000" },
];

// Three lanes, each lapping at its own pace, so cars seem to overtake.
const lanes: { skills: Skill[]; seconds: number }[] = [
  { skills: skills.filter((_, i) => i % 3 === 0), seconds: 26 },
  { skills: skills.filter((_, i) => i % 3 === 1), seconds: 19 },
  { skills: skills.filter((_, i) => i % 3 === 2), seconds: 32 },
];

/** The toolkit as a race: skills are cars streaming across a stretch of track. */
export function ToolkitRace() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ background: "#2B2B33" }}>
      {/* kerbs */}
      <Kerb />
      <div className="relative">
        {/* start / finish line across every lane */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[12%] z-10 w-5 opacity-90"
          style={{ backgroundImage: "repeating-conic-gradient(#fff 0 25%, #111 0 50%)", backgroundSize: "10px 10px" }}
        />
        {lanes.map((lane, i) => (
          <Lane key={i} index={i} {...lane} last={i === lanes.length - 1} />
        ))}
      </div>
      <Kerb />
    </div>
  );
}

function Kerb() {
  return (
    <div
      aria-hidden="true"
      className="h-3"
      style={{ backgroundImage: "repeating-linear-gradient(90deg, #E10600 0 28px, #fff 28px 56px)" }}
    />
  );
}

function Lane({ skills, seconds, index, last }: { skills: Skill[]; seconds: number; index: number; last: boolean }) {
  // Two copies back to back make the loop seamless; the second is hidden from screen readers.
  const cars = [...skills, ...skills];
  return (
    <div className={cn("group relative py-5", !last && "border-b-2 border-dashed border-white/35")}>
      <ul
        className="flex w-max gap-16 pr-16 [animation:race-lane_var(--lap)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ "--lap": `${seconds}s`, animationDelay: `-${index * 3}s` } as React.CSSProperties}
      >
        {cars.map((skill, i) => (
          <li key={`${skill.name}-${i}`} aria-hidden={i >= skills.length || undefined} className="flex shrink-0 flex-col items-center gap-1.5">
            <Car skill={skill} livery={liveries[(skills.indexOf(skill) * 3 + index) % liveries.length]} />
            <span className="rounded-sm bg-black/60 px-2 py-0.5 text-xs font-black tracking-wide text-white italic">
              {skill.name.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A top-down open-wheel car, nose to the right, with the skill's logo on the engine cover. */
function Car({ skill, livery }: { skill: Skill; livery: (typeof liveries)[number] }) {
  return (
    <div className="relative">
      {/* speed lines trailing behind */}
      <span aria-hidden="true" className="absolute top-1/2 right-full mr-1 flex -translate-y-1/2 flex-col gap-2">
        {[28, 44, 22].map((w, i) => (
          <span key={i} className="block h-0.5 rounded-full bg-gradient-to-l from-white/50 to-transparent" style={{ width: w }} />
        ))}
      </span>
      <svg width="168" height="60" viewBox="0 0 200 72" role="img" aria-label={skill.name} className="drop-shadow-[0_6px_6px_rgba(0,0,0,0.45)]">
        {/* rear wing */}
        <rect x="3" y="9" width="15" height="54" rx="3" fill="#111" />
        <rect x="6" y="12" width="9" height="48" rx="2" fill={livery.body} />
        {/* rear tyres */}
        <rect x="22" y="1" width="32" height="17" rx="6" fill="#111" />
        <rect x="22" y="54" width="32" height="17" rx="6" fill="#111" />
        {/* floor and sidepods */}
        <rect x="30" y="24" width="124" height="24" rx="10" fill="#1a1a1a" />
        <rect x="58" y="15" width="64" height="42" rx="16" fill={livery.body} />
        {/* engine cover and tub */}
        <rect x="32" y="27" width="120" height="18" rx="9" fill={livery.body} />
        {/* nose */}
        <path d="M148 29 L186 33 Q192 36 186 39 L148 43 Z" fill={livery.body} />
        {/* front tyres */}
        <rect x="138" y="2" width="27" height="15" rx="5" fill="#111" />
        <rect x="138" y="55" width="27" height="15" rx="5" fill="#111" />
        {/* front wing */}
        <rect x="183" y="8" width="13" height="56" rx="3" fill="#111" />
        <rect x="186" y="11" width="7" height="50" rx="2" fill={livery.body} />
        {/* cockpit and halo */}
        <ellipse cx="124" cy="36" rx="13" ry="7.5" fill="#111" />
        <path d="M112 30 Q124 22 136 36 Q124 50 112 42" fill="none" stroke="#111" strokeWidth="3" />
        {/* racing stripe */}
        <rect x="40" y="34.5" width="70" height="3" rx="1.5" fill={livery.text} opacity="0.35" />
        {/* logo roundel on the engine cover */}
        <circle cx="84" cy="36" r="15" fill="#fff" stroke="#111" strokeWidth="2" />
        <image href={skill.icon} x="73" y="25" width="22" height="22" />
      </svg>
    </div>
  );
}
