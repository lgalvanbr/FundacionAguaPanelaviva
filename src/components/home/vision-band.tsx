"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ButtonLink } from "@/components/button-link";

export function VisionBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-14%"]);

  return (
    <section ref={ref} aria-labelledby="vision-title" className="overflow-hidden py-20 md:py-28">
      <m.p
        style={{ x }}
        aria-hidden
        className="font-display text-[34vw] leading-[0.8] font-semibold tracking-tight whitespace-nowrap text-sand select-none md:text-[22vw]"
      >
        2030 · 2030
      </m.p>
      <div className="container-page -mt-[12vw] md:-mt-[9vw]">
        <div className="relative max-w-3xl">
          <h2 id="vision-title" className="text-4xl text-forest md:text-6xl">
            Hacia 2030: inclusión social con alcance regional, nacional e internacional.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Queremos ser reconocidos como una entidad líder en procesos de inclusión social, articulando alianzas
            sostenibles con entidades públicas, privadas y de cooperación.
          </p>
          <div className="mt-8">
            <ButtonLink href="/nosotros#vision" variant="outline">
              Leer nuestra visión
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
