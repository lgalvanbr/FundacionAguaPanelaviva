"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { mujerDeInfluencia, programas } from "@/content/site";
import { ButtonLink } from "@/components/button-link";
import { programaTheme } from "@/components/programa-theme";
import { springSnappy } from "@/components/motion/springs";

export function ProgramasScroll() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <section aria-labelledby="mdi-title" className="bg-sand">
      <div ref={ref} className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="font-medium text-raices">Nuestro programa insignia</p>
            <h2 id="mdi-title" className="mt-3 text-5xl text-forest md:text-6xl">
              {mujerDeInfluencia.title}
            </h2>
            <p className="mt-6 text-lg text-muted">{mujerDeInfluencia.about}</p>
            <p className="mt-4 text-lg text-muted">{mujerDeInfluencia.esencia}</p>

            <div className="mt-8 hidden items-stretch gap-4 lg:flex" aria-hidden>
              <div className="relative w-0.5 overflow-hidden rounded-full bg-line">
                <m.div style={{ scaleY: reduce ? 1 : progress }} className="absolute inset-0 origin-top bg-forest" />
              </div>
              <ol className="space-y-2 text-[0.9375rem] text-muted">
                {programas.map((p) => (
                  <li key={p.slug}>
                    <span className="tabular-nums">{p.n}</span> · {p.name} — {p.esencia}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-9">
              <ButtonLink href="/programas/mujer-de-influencia">Conocer el programa completo</ButtonLink>
            </div>
          </div>
        </div>

        <ul className="space-y-5 lg:col-span-7 lg:space-y-8">
          {programas.map((p, i) => {
            const t = programaTheme[p.slug];
            const Icon = t.icon;
            return (
              <m.li
                key={p.slug}
                initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 160, damping: 22, delay: i === 0 ? 0 : 0.05 }}
              >
                <m.div whileHover={{ y: reduce ? 0 : -4 }} transition={springSnappy}>
                  <Link
                    href={`/programas/mujer-de-influencia/${p.slug}`}
                    className={`block rounded-[1.75rem] ${t.bg} p-7 md:p-10 lg:min-h-[22rem]`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className={`flex size-14 items-center justify-center rounded-full ${t.solid} text-white`}>
                        <Icon className="size-7" aria-hidden strokeWidth={1.75} />
                      </span>
                      <span className={`font-display text-2xl tabular-nums ${t.text}`}>{p.n}</span>
                    </div>
                    <h3 className={`mt-8 text-4xl md:text-5xl ${t.text}`}>{p.name}</h3>
                    <p className="mt-3 text-xl font-medium text-ink">{p.lema}</p>
                    <p className="mt-4 text-muted">{p.description}</p>
                    <span className={`mt-6 inline-flex min-h-11 items-center font-semibold underline decoration-2 underline-offset-4 ${t.text}`}>
                      Conocer {p.name}
                    </span>
                  </Link>
                </m.div>
              </m.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
