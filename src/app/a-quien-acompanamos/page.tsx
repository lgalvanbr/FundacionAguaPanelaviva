import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/page-intro";
import { poblacionIcon } from "@/components/poblacion-icons";
import { poblaciones } from "@/content/site";

export const metadata: Metadata = {
  title: "A quién acompañamos",
  description:
    "Líderes, niñez con discapacidad, adultos mayores y víctimas del conflicto y del desplazamiento: las poblaciones que acompaña la Fundación Aguapanela Viva.",
};

export default function PoblacionesPage() {
  return (
    <>
      <PageIntro
        title="A quién acompañamos"
        lead="Trabajamos para restablecer derechos, fortalecer capacidades y generar oportunidades reales de participación social, económica y comunitaria."
        crumbs={[{ href: "/a-quien-acompanamos", label: "A quién acompañamos" }]}
      />

      <div className="border-t border-line">
        {poblaciones.map((p, i) => {
          const Icon = poblacionIcon[p.id];
          return (
            <section
              key={p.id}
              id={p.id}
              aria-labelledby={`${p.id}-title`}
              className={`scroll-mt-24 border-b border-line ${i % 2 === 1 ? "bg-sand" : ""}`}
            >
              <Reveal className="container-page grid gap-6 py-14 md:grid-cols-12 md:gap-8 md:py-20">
                <div className="md:col-span-1">
                  <span className="flex size-14 items-center justify-center rounded-full bg-forest text-white">
                    <Icon className="size-7" aria-hidden strokeWidth={1.75} />
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h2 id={`${p.id}-title`} className="text-3xl text-forest md:text-5xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-lg font-medium text-gold-ink">{p.short}</p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-lg text-muted">{p.text}</p>
                  {p.id === "lideres" && (
                    <Link
                      href="/programas/mujer-de-influencia"
                      className="mt-5 inline-flex min-h-11 items-center font-semibold text-raices underline decoration-2 underline-offset-4"
                    >
                      Conocer Mujer de Influencia
                    </Link>
                  )}
                </div>
              </Reveal>
            </section>
          );
        })}
      </div>

      <CtaBand />
    </>
  );
}
