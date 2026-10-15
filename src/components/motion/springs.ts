import type { Transition } from "motion/react";

// Presets del skill framer-motion (references/springs.md)
export const springSnappy: Transition = { type: "spring", stiffness: 450, damping: 28 };
export const springGentle: Transition = { type: "spring", stiffness: 220, damping: 24, mass: 0.8 };
export const springCinematic: Transition = { type: "spring", stiffness: 120, damping: 18, mass: 1.2 };
export const springLayout: Transition = { type: "spring", stiffness: 380, damping: 30 };
