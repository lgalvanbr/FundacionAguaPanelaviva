"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useReducedMotion, useScroll } from "motion/react";
import { ButtonLink } from "@/components/button-link";
import { MdiAnimado } from "@/components/mdi-animado";
import { springGentle } from "@/components/motion/springs";
import { HeroMark } from "./hero-mark";

export function HomeHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // El h1 no se anima: es el contenido principal (LCP) y debe pintarse de inmediato.
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0.2 } : { ...springGentle, delay },
  });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="container-page grid items-center gap-10 pt-8 pb-16 md:pt-14 md:pb-24 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <h1 className="text-[2.75rem] text-forest sm:text-6xl lg:text-[5.25rem]">
            Acompañar con dignidad. Abrir caminos de inclusión.
          </h1>
          <m.p {...enter(0.1)} className="mt-7 max-w-xl text-lg text-muted md:text-xl">
            Somos una entidad sin ánimo de lucro que promueve la inclusión, la formación, la recreación y el
            acompañamiento integral de líderes, niñez con discapacidad, adultos mayores y víctimas del conflicto
            en Colombia.
          </m.p>
          <m.div {...enter(0.2)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/nosotros">Conoce la fundación</ButtonLink>
            <ButtonLink href="/programas" variant="outline">
              Ver programas
            </ButtonLink>
          </m.div>
        </div>

        <div className="relative lg:col-span-5">
          <HeroMark progress={scrollYProgress} />

          <m.div
            {...enter(2)}
            className="relative z-10 mx-auto -mt-6 w-60 sm:-mt-10 lg:absolute lg:-bottom-20 lg:-left-14 lg:mt-0 lg:w-56"
          >
            <Link
              href="/programas/mujer-de-influencia"
              aria-label="Programa destacado: Mujer de Influencia"
              className="group block rounded-xl border border-line bg-paper/95 px-4 pt-3 pb-3.5 shadow-[0_10px_30px_-18px_rgb(4_72_51/0.35)] backdrop-blur-sm transition-colors hover:border-raices/40"
            >
              <span className="text-[0.8125rem] font-semibold text-raices">Programa destacado</span>
              <MdiAnimado delay={2.1} className="mt-2" />
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  );
}
