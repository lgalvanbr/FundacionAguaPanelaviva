"use client";

import { m, useReducedMotion } from "motion/react";
import { springGentle } from "./springs";

// Revelado al entrar en pantalla. Se usa con moderación: solo en bloques
// que introducen una idea nueva, no en cada tarjeta.
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const reduce = useReducedMotion();
  const Comp = as === "section" ? m.section : as === "li" ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={reduce ? { duration: 0.2 } : { ...springGentle, delay }}
    >
      {children}
    </Comp>
  );
}
