// Autodromo Nazionale Monza, traced from the circuit map and run clockwise.
// Plain numbers only (no three.js), so the 2D site can draw the map without
// loading the 3D engine. Map coordinates: x to the right, y down; the lap
// starts on the main straight heading west, as on race day.

export const MONZA_SCALE = 1.35;

export const monzaControl: [number, number][] = [
  [585, 322], [470, 322], [360, 322], // main straight
  [318, 322], [302, 318], [294, 306], [280, 302], // T1–T2 Variante del Rettifilo
  [235, 304], [190, 312],
  [158, 312], [138, 294], [128, 262], // T3 Curva Grande
  [124, 210], [122, 170],
  [124, 152], [112, 142], [104, 128], // T4–T5 Variante della Roggia
  [98, 100], [86, 70], [72, 50],
  [78, 36], [100, 28], [135, 22], // T6 Lesmo 1
  [158, 22], [172, 34], // T7 Lesmo 2
  [215, 88], [270, 152], [318, 204], // Serraglio
  [334, 226], [350, 236], [368, 232], [382, 240], [398, 250], // T8–T10 Variante Ascari
  [480, 252], [580, 252], [636, 254], // back straight
  [662, 266], [668, 292], [652, 314], [622, 322], // T11 Parabolica (Curva Alboreto)
];

/** Monza's corners, by the control point they sit on. */
export const corners = [
  { name: "Rettifilo", turn: "T1", at: 4 },
  { name: "Curva Grande", turn: "T3", at: 10 },
  { name: "Roggia", turn: "T4", at: 15 },
  { name: "Lesmo", turn: "T6", at: 21 },
  { name: "Ascari", turn: "T8", at: 30 },
  { name: "Parabolica", turn: "T11", at: 37 },
] as const;

/** The corners that carry a project arch, in lap order. */
export const gateCorners = [corners[0], corners[1], corners[3], corners[4], corners[5]];

/** A closed Catmull–Rom spline through the points, as an SVG path of cubic curves, fitted to a box. */
export function monzaSvgPath(width: number, height: number, pad = 10) {
  const xs = monzaControl.map((p) => p[0]);
  const ys = monzaControl.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX;
  const h = Math.max(...ys) - minY;
  const k = Math.min((width - pad * 2) / w, (height - pad * 2) / h);
  // Centre the track in the box.
  const offX = (width - w * k) / 2;
  const offY = (height - h * k) / 2;
  const pt = (i: number) => {
    const [x, y] = monzaControl[(i + monzaControl.length) % monzaControl.length];
    return [offX + (x - minX) * k, offY + (y - minY) * k] as const;
  };
  let d = `M${pt(0).join(" ")}`;
  for (let i = 0; i < monzaControl.length; i++) {
    const [x0, y0] = pt(i - 1);
    const [x1, y1] = pt(i);
    const [x2, y2] = pt(i + 1);
    const [x3, y3] = pt(i + 2);
    const c1 = [x1 + (x2 - x0) / 6, y1 + (y2 - y0) / 6];
    const c2 = [x2 - (x3 - x1) / 6, y2 - (y3 - y1) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return { d: d + " Z", start: pt(0) };
}
