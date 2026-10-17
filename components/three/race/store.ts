"use client";

import { useSyncExternalStore } from "react";

// Shared between the 3D scene (which drives) and the DOM HUD (which shows).
// Controls are a plain mutable object read every frame; HUD state is a tiny
// external store so React only re-renders the HUD when something changes.

export const controls = { up: false, down: false, left: false, right: false };

export interface HudState {
  started: boolean;
  speed: number; // km/h for display
  lap: number;
  lapTime: number; // seconds into the current lap
  best: number | null;
  offTrack: boolean;
  collected: number[]; // gate indexes passed at least once
  active: number | null; // gate whose card is showing
}

let state: HudState = {
  started: false,
  speed: 0,
  lap: 1,
  lapTime: 0,
  best: null,
  offTrack: false,
  collected: [],
  active: null,
};
const listeners = new Set<() => void>();

export const hud = {
  get: () => state,
  set(patch: Partial<HudState>) {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export function useHud<T>(select: (s: HudState) => T): T {
  return useSyncExternalStore(
    hud.subscribe,
    () => select(hud.get()),
    () => select(hud.get())
  );
}

/** Car pose for the minimap, written every frame without notifying React. */
export const pose = { x: 0, z: 0, heading: 0 };

/** Asks the scene to put the car back on track. */
export const commands = { reset: false };
