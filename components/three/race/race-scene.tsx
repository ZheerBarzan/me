"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { commands, controls, hud, pose } from "./store";
import {
  SAMPLES,
  TRACK_WIDTH,
  gateColor,
  gateLabel,
  gates,
  nearestSample,
  nearestSampleGlobal,
  points,
  tangents,
} from "./track";

const FONT = "/fonts/ArchivoBlack-Regular.ttf";
const GRASS = "#8BD17C";
const ASPHALT = "#3A3A44";

// Arcade handling, in world units per second.
const CAR = {
  accel: 30,
  brake: 60,
  maxOnTrack: 76,
  maxOffTrack: 20,
  reverse: 12,
  drag: 0.6,
  grassDrag: 3,
  turn: 2.1,
};
const KMH = 5.2; // display scale

/** `paused` stops rendering (e.g. while the section is off screen). */
export default function RaceScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas shadows flat dpr={[1, 1.75]} frameloop={paused ? "never" : "always"} camera={{ position: [0, 6, -12], fov: 60, near: 0.5, far: 600 }}>
      <color attach="background" args={["#BFE3FF"]} />
      <fog attach="fog" args={["#BFE3FF", 110, 320]} />
      <hemisphereLight args={["#ffffff", GRASS, 2.2]} />
      <Ground />
      <Track />
      <StartLine />
      {gates.map((g, i) => (
        <GateArch key={i} index={i} />
      ))}
      <Scenery />
      <Car />
    </Canvas>
  );
}

function Ground() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[450, -0.02, 220]} receiveShadow>
      <planeGeometry args={[1600, 1600]} />
      <meshStandardMaterial color={GRASS} />
    </mesh>
  );
}

/** A flat ribbon along the centreline, plus red/white kerbs on both edges. */
function Track() {
  const { road, kerbs } = useMemo(() => {
    const side = (i: number) => new THREE.Vector3(-tangents[i].z, 0, tangents[i].x).normalize();
    const ribbon = (inner: number, outer: number, colored: boolean) => {
      const pos: number[] = [];
      const col: number[] = [];
      const red = new THREE.Color("#E53935");
      const white = new THREE.Color("#FFFFFF");
      for (let i = 0; i < SAMPLES; i++) {
        const j = (i + 1) % SAMPLES;
        const a = points[i];
        const b = points[j];
        const na = side(i);
        const nb = side(j);
        const quad = (o1: number, o2: number) => {
          const a1 = a.clone().addScaledVector(na, o1);
          const a2 = a.clone().addScaledVector(na, o2);
          const b1 = b.clone().addScaledVector(nb, o1);
          const b2 = b.clone().addScaledVector(nb, o2);
          for (const v of [a1, b1, a2, a2, b1, b2]) pos.push(v.x, 0.01, v.z);
          if (colored) {
            const c = Math.floor(i / 3) % 2 ? red : white;
            for (let k = 0; k < 6; k++) col.push(c.r, c.g, c.b);
          }
        };
        quad(inner, outer);
        if (colored) quad(-outer, -inner);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      if (colored) g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      g.computeVertexNormals();
      return g;
    };
    return {
      road: ribbon(-TRACK_WIDTH / 2, TRACK_WIDTH / 2, false),
      kerbs: ribbon(TRACK_WIDTH / 2, TRACK_WIDTH / 2 + 1.3, true),
    };
  }, []);

  return (
    <group>
      <mesh geometry={road} receiveShadow>
        <meshStandardMaterial color={ASPHALT} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={kerbs} position-y={0.01} receiveShadow>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function StartLine() {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 16;
    const ctx = c.getContext("2d")!;
    for (let x = 0; x < 16; x++)
      for (let y = 0; y < 2; y++) {
        ctx.fillStyle = (x + y) % 2 ? "#111" : "#fff";
        ctx.fillRect(x * 8, y * 8, 8, 8);
      }
    const t = new THREE.CanvasTexture(c);
    t.magFilter = THREE.NearestFilter;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const p = points[0];
  const angle = Math.atan2(tangents[0].x, tangents[0].z);
  return (
    <group position={[p.x, 0.03, p.z]} rotation-y={angle}>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[TRACK_WIDTH, 2]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* gantry */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (TRACK_WIDTH / 2 + 1.5), 3.5, 0]} castShadow>
          <boxGeometry args={[0.6, 7, 0.6]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      <mesh position={[0, 7, 0]} castShadow>
        <boxGeometry args={[TRACK_WIDTH + 3.6, 1.2, 0.6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <Text font={FONT} fontSize={0.8} color="#ffffff" position={[0, 7, 0.32]} rotation-y={Math.PI}>
        MONZA
      </Text>
      <Text font={FONT} fontSize={0.8} color="#ffffff" position={[0, 7, -0.32]}>
        MONZA
      </Text>
    </group>
  );
}

/** An arch over the track for each portfolio item. Turns gold once collected. */
function GateArch({ index }: { index: number }) {
  const gate = gates[index];
  const p = points[gate.sample];
  const t = tangents[gate.sample];
  const angle = Math.atan2(t.x, t.z);
  const banner = useRef<THREE.MeshStandardMaterial>(null);
  const color = gateColor(gate);
  const label = gateLabel(gate);

  useEffect(
    () =>
      hud.subscribe(() => {
        if (banner.current) banner.current.color.set(hud.get().collected.includes(index) ? "#FFD23F" : color);
      }),
    [index, color]
  );

  return (
    <group position={[p.x, 0, p.z]} rotation-y={angle}>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (TRACK_WIDTH / 2 + 1), 2.6, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 5.2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      <mesh position={[0, 5.4, 0]} castShadow>
        <boxGeometry args={[TRACK_WIDTH + 2.6, 1.4, 0.3]} />
        <meshStandardMaterial ref={banner} color={color} />
      </mesh>
      <Text font={FONT} fontSize={0.7} color="#ffffff" position={[0, 5.4, -0.2]} rotation-y={Math.PI} maxWidth={TRACK_WIDTH + 2} anchorX="center" anchorY="middle">
        {label}
      </Text>
      <Text font={FONT} fontSize={0.7} color="#ffffff" position={[0, 5.4, 0.2]} maxWidth={TRACK_WIDTH + 2} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

/** Trees and grandstands placed off the racing line, deterministically. */
function Scenery() {
  const trees = useMemo(() => {
    const out: { x: number; z: number; s: number }[] = [];
    // Cheap deterministic noise, so the layout is the same on every visit.
    let n = 0;
    const rand = () => {
      const v = Math.sin(++n * 12.9898) * 43758.5453;
      return v - Math.floor(v);
    };
    while (out.length < 300) {
      const x = -120 + rand() * 1140;
      const z = -160 + rand() * 760;
      const { distance } = nearestSampleGlobal(x, z);
      if (distance > TRACK_WIDTH + 6) out.push({ x, z, s: 0.8 + rand() * 1.2 });
    }
    return out;
  }, []);
  const stands = useMemo(() => {
    const i = 30;
    const p = points[i];
    const n = new THREE.Vector3(-tangents[i].z, 0, tangents[i].x).normalize();
    return { pos: p.clone().addScaledVector(n, -(TRACK_WIDTH / 2 + 9)), angle: Math.atan2(tangents[i].x, tangents[i].z) };
  }, []);

  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]} scale={t.s}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.3, 1.6, 6]} />
            <meshStandardMaterial color="#8D6E63" />
          </mesh>
          <mesh position={[0, 2.6, 0]} castShadow>
            <coneGeometry args={[1.4, 3, 6]} />
            <meshStandardMaterial color={i % 3 ? "#2E9E5B" : "#13C4A3"} flatShading />
          </mesh>
        </group>
      ))}
      <group position={stands.pos} rotation-y={stands.angle}>
        {[0, 1, 2, 3].map((row) => (
          <mesh key={row} position={[0, 0.6 + row * 1.1, -row * 1.4]} castShadow receiveShadow>
            <boxGeometry args={[40, 1.2, 1.4]} />
            <meshStandardMaterial color={["#FF6B5B", "#2D5BFF", "#FFC93C", "#ffffff"][row]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** The car: arcade physics, chase camera, gate detection and lap timing. */
function Car() {
  const car = useRef<THREE.Group>(null);
  const frontLeft = useRef<THREE.Group>(null);
  const frontRight = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Mesh[]>([]);
  const light = useRef<THREE.DirectionalLight>(null);

  const sim = useRef({
    pos: points[0].clone().addScaledVector(tangents[0], -6),
    heading: Math.atan2(tangents[0].x, tangents[0].z),
    speed: 0,
    steer: 0,
    sample: 0,
    lapStart: 0,
    passedHalf: false,
    lastHud: 0,
    activeUntil: 0,
    camPos: new THREE.Vector3(),
    camLook: new THREE.Vector3(),
    fresh: true,
  });

  useFrame(({ camera, clock }, rawDt) => {
    const s = sim.current;
    const dt = Math.min(rawDt, 1 / 30);
    const now = clock.elapsedTime;
    const { started } = hud.get();

    if (commands.reset) {
      commands.reset = false;
      const { index } = nearestSampleGlobal(s.pos.x, s.pos.z);
      s.pos.copy(points[index]);
      s.heading = Math.atan2(tangents[index].x, tangents[index].z);
      s.speed = 0;
      s.sample = index;
    }

    // --- input → speed and heading
    const throttle = started && controls.up ? 1 : 0;
    const brake = started && controls.down ? 1 : 0;
    const steerInput = started ? (controls.left ? 1 : 0) - (controls.right ? 1 : 0) : 0;
    s.steer = THREE.MathUtils.damp(s.steer, steerInput, 10, dt);

    const near = nearestSample(s.pos.x, s.pos.z, s.sample);
    s.sample = near.index;
    const offTrack = near.distance > TRACK_WIDTH / 2 + 1.3;
    const max = offTrack ? CAR.maxOffTrack : CAR.maxOnTrack;

    if (throttle) s.speed += CAR.accel * dt;
    if (brake) s.speed -= (s.speed > 0 ? CAR.brake : CAR.accel * 0.5) * dt;
    s.speed -= s.speed * (offTrack ? CAR.grassDrag : CAR.drag) * dt;
    s.speed = THREE.MathUtils.clamp(s.speed, -CAR.reverse, max + (s.speed > max ? (s.speed - max) * 0.9 : 0));
    if (s.speed > max) s.speed = THREE.MathUtils.damp(s.speed, max, 3, dt);

    const grip = THREE.MathUtils.clamp(Math.abs(s.speed) / 18, 0, 1);
    s.heading += s.steer * CAR.turn * grip * Math.sign(s.speed || 1) * dt;
    const forward = new THREE.Vector3(Math.sin(s.heading), 0, Math.cos(s.heading));
    s.pos.addScaledVector(forward, s.speed * dt);

    // soft wall far from the track so nobody gets lost
    if (near.distance > TRACK_WIDTH + 40) s.pos.lerp(points[near.index], 2 * dt);

    // --- apply to the model
    const g = car.current!;
    g.position.copy(s.pos);
    g.rotation.y = s.heading;
    const steerAngle = s.steer * 0.45;
    frontLeft.current!.rotation.y = steerAngle;
    frontRight.current!.rotation.y = steerAngle;
    for (const w of wheels.current) w.rotation.x += (s.speed * dt) / 0.45;

    // --- chase camera
    const desired = s.pos.clone().addScaledVector(forward, -9.5).add(new THREE.Vector3(0, 4.2, 0));
    const look = s.pos.clone().addScaledVector(forward, 5).add(new THREE.Vector3(0, 1.2, 0));
    if (s.fresh) {
      s.camPos.copy(desired);
      s.camLook.copy(look);
      s.fresh = false;
    }
    s.camPos.lerp(desired, 1 - Math.exp(-5 * dt));
    s.camLook.lerp(look, 1 - Math.exp(-8 * dt));
    camera.position.copy(s.camPos);
    camera.lookAt(s.camLook);
    if (light.current) {
      light.current.position.set(s.pos.x + 20, 40, s.pos.z + 10);
      light.current.target.position.copy(s.pos);
      light.current.target.updateMatrixWorld();
    }

    pose.x = s.pos.x;
    pose.z = s.pos.z;
    pose.heading = s.heading;

    if (!started) return;

    // --- gates
    const state = hud.get();
    let { collected, active } = state;
    gates.forEach((gate, i) => {
      const gp = points[gate.sample];
      if ((gp.x - s.pos.x) ** 2 + (gp.z - s.pos.z) ** 2 < (TRACK_WIDTH * 0.75) ** 2 && active !== i) {
        active = i;
        s.activeUntil = now + 6;
        if (!collected.includes(i)) collected = [...collected, i];
      }
    });
    if (active !== null && now > s.activeUntil) active = null;

    // --- laps: count a lap when crossing the line after passing halfway
    let { lap, best } = state;
    if (s.sample > SAMPLES * 0.45 && s.sample < SAMPLES * 0.55) s.passedHalf = true;
    if (s.passedHalf && s.sample < 20) {
      const time = now - s.lapStart;
      best = best === null ? time : Math.min(best, time);
      lap += 1;
      s.lapStart = now;
      s.passedHalf = false;
    }
    if (s.lapStart === 0) s.lapStart = now;

    // Publish to the HUD ~12 times a second, or at once when something happens.
    const changed = collected !== state.collected || active !== state.active || lap !== state.lap || offTrack !== state.offTrack;
    if (changed || now - s.lastHud > 0.08) {
      s.lastHud = now;
      hud.set({ speed: Math.round(Math.abs(s.speed) * KMH), lapTime: now - s.lapStart, collected, active, lap, best, offTrack });
    }
  });

  const wheel = (key: string, pos: [number, number, number]) => (
    <mesh
      key={key}
      ref={(m) => {
        if (m && !wheels.current.includes(m)) wheels.current.push(m);
      }}
      position={pos}
      rotation-z={Math.PI / 2}
      castShadow
    >
      <cylinderGeometry args={[0.45, 0.45, 0.5, 14]} />
      <meshStandardMaterial color="#151515" />
    </mesh>
  );

  return (
    <>
      <directionalLight
        ref={light}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <group ref={car}>
        {/* chassis */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[1.1, 0.45, 3.6]} />
          <meshStandardMaterial color="#FF1E1E" />
        </mesh>
        {/* sidepods */}
        <mesh position={[0, 0.4, -0.2]} castShadow>
          <boxGeometry args={[1.9, 0.4, 1.6]} />
          <meshStandardMaterial color="#FF1E1E" />
        </mesh>
        {/* nose */}
        <mesh position={[0, 0.35, 2.3]} castShadow>
          <boxGeometry args={[0.5, 0.3, 1.4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* front wing */}
        <mesh position={[0, 0.18, 2.95]} castShadow>
          <boxGeometry args={[2.6, 0.08, 0.5]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* cockpit + halo */}
        <mesh position={[0, 0.78, 0.1]}>
          <boxGeometry args={[0.6, 0.25, 0.9]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 1.0, 0.35]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.32, 0.05, 6, 12, Math.PI]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* engine cover + rear wing */}
        <mesh position={[0, 0.75, -1.2]} castShadow>
          <boxGeometry args={[0.6, 0.5, 1.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {[-0.5, 0.5].map((x) => (
          <mesh key={x} position={[x, 0.95, -1.9]}>
            <boxGeometry args={[0.06, 0.7, 0.3]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
        <mesh position={[0, 1.3, -1.95]} castShadow>
          <boxGeometry args={[2, 0.08, 0.5]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <Text font={FONT} fontSize={0.35} color="#111" position={[0, 0.51, 2.3]} rotation-x={-Math.PI / 2}>
          01
        </Text>
        {/* wheels: fronts steer */}
        <group ref={frontLeft} position={[1.05, 0.45, 1.6]}>
          {wheel("fl", [0, 0, 0])}
        </group>
        <group ref={frontRight} position={[-1.05, 0.45, 1.6]}>
          {wheel("fr", [0, 0, 0])}
        </group>
        {wheel("rl", [1.1, 0.45, -1.4])}
        {wheel("rr", [-1.1, 0.45, -1.4])}
      </group>
    </>
  );
}
