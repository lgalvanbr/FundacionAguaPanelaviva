"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import features from "./features";

// Las features se cargan de forma síncrona: si se difieren, las animaciones que
// arrancan antes de que terminen de cargar (p. ej. un useInView que se dispara en
// el primer render) se pierden. reducedMotion="user" desactiva transforms cuando el
// sistema pide movimiento reducido.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
