# zheerbarzan.dev

Portfolio of Zheer Barzan, built with Next.js 16 (App Router, Cache Components),
[Motion](https://motion.dev) and [Fluid Functionalism](https://www.fluidfunctionalism.com).

```bash
pnpm install
pnpm dev
```

- Content (projects, education, career, awards, skills): `lib/content.ts`
- The site is a race weekend: `components/site/f1-site.tsx` (2D, white) with
  the projects section as a drivable lap of a Monza-style circuit
  (`components/site/race-game.tsx`, 3D scene in `components/three/race/`).
- Circuit layout and corner names: `components/three/race/monza.ts`.
- Colors: `components/site/theme.ts`.
- The previous Vite site is preserved at the `legacy-vite` tag; screenshots of
  it are in `docs/legacy/`.
