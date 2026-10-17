"use client";

import type { ReactNode } from "react";
import { FluidProvider } from "@/lib/fluid-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // Reduced-motion handling (MotionConfig) for every animation on the site.
    <FluidProvider>{children}</FluidProvider>
  );
}
