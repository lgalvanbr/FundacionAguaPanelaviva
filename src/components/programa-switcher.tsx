"use client";

import Link from "next/link";
import { m } from "motion/react";
import { programas, type ProgramaSlug } from "@/content/site";
import { programaTheme } from "@/components/programa-theme";
import { springLayout } from "@/components/motion/springs";

// Selector entre los cuatro programas; la pastilla activa se desliza con layoutId.
export function ProgramaSwitcher({ current }: { current: ProgramaSlug }) {
  return (
    <nav aria-label="Programas de Mujer de Influencia" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <ul className="inline-flex gap-1 rounded-full border border-line bg-white/70 p-1">
        {programas.map((p) => {
          const active = p.slug === current;
          const t = programaTheme[p.slug];
          return (
            <li key={p.slug}>
              <Link
                href={`/programas/mujer-de-influencia/${p.slug}`}
                aria-current={active ? "page" : undefined}
                scroll={false}
                className={`relative flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors md:px-5 ${
                  active ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                {active && (
                  <m.span
                    layoutId="programa-pill"
                    className={`absolute inset-0 rounded-full ${t.solid}`}
                    transition={springLayout}
                  />
                )}
                <span className="relative">{p.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
