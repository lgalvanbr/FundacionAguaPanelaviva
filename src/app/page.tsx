import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { HomeHero } from "@/components/home/hero";
import { ProgramasScroll } from "@/components/home/programas-scroll";
import { VisionBand } from "@/components/home/vision-band";
import { Reveal } from "@/components/motion/reveal";
import { poblacionIcon } from "@/components/poblacion-icons";
import { pilares, poblaciones } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Qué hacemos: tres verbos de la misión */}
      <section aria-labelledby="que-hacemos" className="border-t border-line">
        <div className="container-page py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <h2 id="que-hacemos" className="text-4xl text-forest md:text-5xl">
              Programas construidos con respeto, dignidad y corresponsabilidad.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {pilares.map((p, i) => (
              <li key={p.title} className="border-t-2 border-forest pt-6">
                <span className="font-display text-lg text-gold-ink tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-3xl text-forest">{p.title}</h3>
                <p className="mt-3 text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* A quién acompañamos */}
      <section aria-labelledby="poblaciones" className="container-page pb-20 md:pb-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-xl">
            <h2 id="poblaciones" className="text-4xl text-forest md:text-5xl">
              A quién acompañamos
            </h2>
            <p className="mt-4 text-lg text-muted">
              Cuatro poblaciones, un mismo compromiso: oportunidades reales de participación social, económica y
              comunitaria.
            </p>
          </Reveal>
          <Link
            href="/a-quien-acompanamos"
            className="inline-flex min-h-11 items-center font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 hover:decoration-forest"
          >
            Ver en detalle
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {poblaciones.map((p) => {
            const Icon = poblacionIcon[p.id];
            return (
              <li key={p.id}>
                <Link
                  href={`/a-quien-acompanamos#${p.id}`}
                  className="group flex h-full items-start gap-5 rounded-3xl border border-line bg-white/60 p-6 transition-colors hover:border-forest/30 hover:bg-white md:p-8"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest/8 text-forest transition-transform duration-300 ease-out-soft group-hover:scale-110">
                    <Icon className="size-6" aria-hidden strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block font-display text-2xl text-forest">{p.title}</span>
                    <span className="mt-1 block text-muted">{p.short}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <ProgramasScroll />
      <VisionBand />
      <CtaBand />
    </>
  );
}
