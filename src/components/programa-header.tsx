"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { getPrograma, programas } from "@/content/site";
import { ProgramaLogo } from "@/components/programa-logo";
import { programaTheme } from "@/components/programa-theme";
import { ProgramaSwitcher } from "@/components/programa-switcher";
import { springGentle } from "@/components/motion/springs";

// Vive en un layout persistente: al cambiar de programa no se remonta, así el
// fondo hace fundido, el título cambia con transición y la pastilla se desliza.
export function ProgramaHeader() {
  const reduce = useReducedMotion();
  const slug = usePathname().split("/").pop() ?? "";
  const p = getPrograma(slug);
  if (!p) return null;

  return (
    <div className="relative isolate">
      {programas.map((q) => (
        <m.div
          key={q.slug}
          aria-hidden
          className={`absolute inset-0 -z-10 ${programaTheme[q.slug].bg}`}
          initial={false}
          animate={{ opacity: q.slug === p.slug ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      <section className="container-page pt-10 pb-14 md:pt-16 md:pb-20">
        <nav aria-label="Ruta de navegación" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {[
              { href: "/", label: "Inicio" },
              { href: "/programas", label: "Programas" },
              { href: "/programas/mujer-de-influencia", label: "Mujer de Influencia" },
            ].map((c, i) => (
              <li key={c.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-4" aria-hidden />}
                <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-forest">
                  {c.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={p.slug}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0, transition: reduce ? { duration: 0.15 } : springGentle }}
            exit={{ opacity: 0, y: reduce ? 0 : -10, transition: { duration: 0.15 } }}
          >
            <div className="flex items-center gap-5 md:gap-8">
              <ProgramaLogo slug={p.slug} className="size-16 shrink-0 md:size-32" title={`Logo de ${p.name}`} />
              <div>
                <h1
                  className={`font-sans text-[2rem] font-bold tracking-wide uppercase sm:text-5xl md:text-7xl ${programaTheme[p.slug].text}`}
                >
                  {p.name}
                </h1>
                <p className={`mt-2 max-w-2xl text-lg font-medium md:text-2xl ${programaTheme[p.slug].text}`}>{p.lema}</p>
              </div>
            </div>
          </m.div>
        </AnimatePresence>

        <div className="mt-10">
          <ProgramaSwitcher current={p.slug} />
        </div>
      </section>
    </div>
  );
}
