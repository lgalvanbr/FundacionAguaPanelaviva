"use client";

import Link from "next/link";
import { MdiLogo } from "@/components/mdi-logo";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { mujerDeInfluencia, programas } from "@/content/site";
import { ButtonLink } from "@/components/button-link";
import { ProgramaLogo } from "@/components/programa-logo";
import { programaTheme, puntoIcon } from "@/components/programa-theme";
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
          <div className="lg:sticky lg:top-28">
            <p className="font-medium text-forest">Nuestro programa insignia</p>
            <h2 id="mdi-title" className="mt-4">
              <MdiLogo variant="horizontal" className="w-full max-w-sm" />
            </h2>
            <p className="mt-4 text-xl text-ink">{mujerDeInfluencia.tagline}</p>
            <p className="mt-4 text-lg text-muted">{mujerDeInfluencia.about}</p>

            <div className="mt-8 hidden items-stretch gap-4 lg:flex" aria-hidden>
              <div className="relative w-0.5 overflow-hidden rounded-full bg-line">
                <m.div style={{ scaleY: reduce ? 1 : progress }} className="absolute inset-0 origin-top bg-forest" />
              </div>
              <ol className="space-y-3">
                {programas.map((p) => (
                  <li key={p.slug} className="flex items-center gap-3">
                    <ProgramaLogo slug={p.slug} className="size-7" />
                    <span className={`font-semibold ${programaTheme[p.slug].text}`}>{p.name}</span>
                    <span className="text-[0.9375rem] text-muted">{p.esencia}</span>
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
          {programas.map((p) => {
            const t = programaTheme[p.slug];
            return (
              <m.li
                key={p.slug}
                initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={reduce ? { duration: 0.2 } : { type: "spring", stiffness: 160, damping: 22 }}
              >
                <m.div whileHover={{ y: reduce ? 0 : -4 }} transition={springSnappy}>
                  <Link
                    href={`/programas/mujer-de-influencia/${p.slug}`}
                    className={`block rounded-[1.75rem] border ${t.ring} ${t.bg} p-7 md:p-10`}
                  >
                    <div className="flex items-center gap-5">
                      <ProgramaLogo slug={p.slug} className="size-16 shrink-0 md:size-20" />
                      <div>
                        <h3 className={`font-sans text-3xl font-bold tracking-wide uppercase md:text-4xl ${t.text}`}>
                          {p.name}
                        </h3>
                        <p className={`mt-1 text-lg font-medium ${t.text}`}>{p.lema}</p>
                      </div>
                    </div>
                    <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {p.puntos.map((pt) => {
                        const Icon = puntoIcon[pt.icon];
                        return (
                          <li key={pt.label} className="flex items-center gap-3 text-ink">
                            <Icon className={`size-5 shrink-0 ${t.logoText}`} aria-hidden strokeWidth={2} />
                            {pt.label}
                          </li>
                        );
                      })}
                    </ul>
                    <span
                      className={`mt-7 inline-flex min-h-11 items-center font-semibold underline decoration-2 underline-offset-4 ${t.text}`}
                    >
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
