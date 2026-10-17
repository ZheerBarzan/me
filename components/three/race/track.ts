import * as THREE from "three";
import { projects, type Project } from "@/lib/content";
import { gateCorners, MONZA_SCALE, monzaControl } from "./monza";

export const TRACK_WIDTH = 12;
export const SAMPLES = 1800;

export const curve = new THREE.CatmullRomCurve3(
  monzaControl.map(([x, y]) => new THREE.Vector3(x * MONZA_SCALE, 0, y * MONZA_SCALE)),
  true,
  "centripetal"
);

/** Evenly spaced centreline points and their tangents. */
export const points = curve.getSpacedPoints(SAMPLES).slice(0, SAMPLES);
export const tangents = points.map((_, i) => curve.getTangentAt(i / SAMPLES));

/** Index of the centreline sample nearest to (x, z), searched around `hint`. */
export function nearestSample(x: number, z: number, hint: number, window = 40) {
  let best = hint;
  let bestD = Infinity;
  for (let k = -window; k <= window; k++) {
    const i = (hint + k + SAMPLES) % SAMPLES;
    const p = points[i];
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return { index: best, distance: Math.sqrt(bestD) };
}

/** Full search, for resets and the first frame. */
export function nearestSampleGlobal(x: number, z: number) {
  return nearestSample(x, z, 0, SAMPLES / 2);
}

/** One arch per project, each at a named corner of the lap. */
export interface Gate {
  project: Project;
  corner: string;
  sample: number;
}

export const gates: Gate[] = projects.map((project, i) => {
  const corner = gateCorners[i % gateCorners.length];
  const [x, y] = monzaControl[corner.at];
  return {
    project,
    corner: corner.name,
    sample: nearestSampleGlobal(x * MONZA_SCALE, y * MONZA_SCALE).index,
  };
});

export function gateLabel(g: Gate) {
  return g.project.name.toUpperCase();
}

const gateColors = ["#E10600", "#2D5BFF", "#13C4A3", "#A855F7", "#FFB400"];
export function gateColor(g: Gate) {
  return gateColors[projects.indexOf(g.project) % gateColors.length];
}

/** Track outline in 2D for the minimap, as an SVG path fitted to the box. */
export function minimapPath(width: number, height: number, pad = 8) {
  const xs = points.map((p) => p.x);
  const zs = points.map((p) => p.z);
  const minX = Math.min(...xs);
  const minZ = Math.min(...zs);
  const w = Math.max(...xs) - minX;
  const h = Math.max(...zs) - minZ;
  const scale = Math.min((width - pad * 2) / w, (height - pad * 2) / h);
  const offX = (width - w * scale) / 2;
  const offY = (height - h * scale) / 2;
  const project = (x: number, z: number) => [offX + (x - minX) * scale, offY + (z - minZ) * scale] as const;
  const d =
    points
      .filter((_, i) => i % 4 === 0)
      .map((p, i) => {
        const [px, py] = project(p.x, p.z);
        return `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`;
      })
      .join(" ") + " Z";
  return { d, project };
}
