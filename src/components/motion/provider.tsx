"use client";

import { LazyMotion, MotionConfig } from "motion/react";

// Las features de animación se cargan después del primer render para no
// bloquear la carga inicial. reducedMotion="user" desactiva transforms
// cuando el sistema pide movimiento reducido.
const loadFeatures = () => import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
