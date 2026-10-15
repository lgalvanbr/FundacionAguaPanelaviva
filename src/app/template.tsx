"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { springGentle } from "@/components/motion/springs";

// En la primera carga no se anima (el contenido se pinta de inmediato desde el
// HTML del servidor). En navegaciones posteriores, la página entra suavemente.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [animateIn] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <m.div
      initial={animateIn ? { opacity: 0, y: reduce ? 0 : 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0.15 } : springGentle}
    >
      {children}
    </m.div>
  );
}
