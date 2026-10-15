import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Handshake } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { MdiDots } from "@/components/mdi-dots";
import { Reveal } from "@/components/motion/reveal";
import { ProgramaLogo } from "@/components/programa-logo";
import { programaTheme, puntoIcon } from "@/components/programa-theme";
import { mujerDeInfluencia as mdi, programas } from "@/content/site";

export const metadata: Metadata = {
  title: "Mujer de Influencia",
  description: mdi.about,
};

export default function MujerDeInfluenciaPage() {
  return (
    <>
      <section className="container-page pt-10 pb-14 md:pt-16 md:pb-20">
        <nav aria-label="Ruta de navegación" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {[
              { href: "/", label: "Inicio" },
              { href: "/programas", label: "Programas" },
              { href: "/programas/mujer-de-influencia", label: mdi.title },
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
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="relative mx-auto w-full max-w-xs md:col-span-5 md:max-w-sm">
            <Image
              src="/brand/mujer-de-influencia.png"
              alt="Logo de Mujer de Influencia"
              width={1000}
              height={1032}
              priority
              sizes="(min-width: 768px) 384px, 320px"
              className="h-auto w-full"
            />
          </div>
          <div className="md:col-span-7">
            <MdiDots />
            <h1 className="mt-5 text-[2.75rem] text-forest md:text-7xl">{mdi.title}</h1>
            <p className="mt-5 max-w-xl text-xl text-ink md:text-2xl">{mdi.tagline}</p>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Un proyecto de la Fundación Aguapanela Viva para el desarrollo integral de la mujer.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="quienes" className="border-t border-line">
        <div className="container-page grid gap-8 py-16 md:grid-cols-12 md:py-24">
          <h2 id="quienes" className="text-4xl text-forest md:col-span-4 md:text-5xl">
            ¿Quiénes somos?
          </h2>
          <Reveal className="space-y-6 md:col-span-8">
            <p className="font-display text-2xl leading-snug md:text-[2rem]">{mdi.about}</p>
            <p className="text-lg text-muted">{mdi.about2}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cuatro" className="bg-sand">
        <div className="container-page py-16 md:py-24">
          <h2 id="cuatro" className="text-center text-4xl text-forest md:text-5xl">
            Nuestros cuatro programas
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {programas.map((p) => {
              const t = programaTheme[p.slug];
              return (
                <li key={p.slug}>
                  <Link
                    href={`/programas/mujer-de-influencia/${p.slug}`}
                    className={`group flex h-full flex-col rounded-[1.75rem] border ${t.ring} ${t.bg} p-7 transition-transform duration-300 ease-out-soft hover:-translate-y-1`}
                  >
                    <ProgramaLogo slug={p.slug} className="mx-auto size-24" />
                    <h3 className={`mt-6 text-center font-sans text-3xl font-bold tracking-wide uppercase ${t.text}`}>
                      {p.name}
                    </h3>
                    <p className="mt-2 text-center text-lg font-semibold text-ink">{p.lema}</p>
                    <p className="mt-4 text-muted">{p.description}</p>

                    <p className={`mt-6 font-semibold ${t.text}`}>¿Qué trabajamos?</p>
                    <ul className="mt-3 space-y-2">
                      {p.trabajamos.map((w, i) => {
                        const Icon = puntoIcon[p.puntos[i].icon];
                        return (
                          <li key={w} className="flex gap-3">
                            <Icon className={`mt-1 size-4.5 shrink-0 ${t.logoText}`} aria-hidden strokeWidth={2} />
                            {w}
                          </li>
                        );
                      })}
                    </ul>

                    {p.alianza && (
                      <p className="mt-5 flex items-center gap-3 rounded-2xl bg-white/70 p-3 text-sm font-medium">
                        <Handshake className={`size-6 shrink-0 ${t.logoText}`} aria-hidden />
                        Articulación con el Fondo Emprender del SENA
                      </p>
                    )}

                    <p className={`mt-6 font-display text-lg leading-snug italic ${t.text}`}>“{p.frase}”</p>
                    <span
                      className={`mt-auto inline-flex min-h-11 items-center pt-5 font-semibold underline decoration-2 underline-offset-4 ${t.text}`}
                    >
                      Ver {p.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="esencia" className="container-page py-16 text-center md:py-24">
        <h2 id="esencia" className="text-4xl text-forest md:text-5xl">
          Nuestra esencia
        </h2>
        <p className="mt-3 text-xl text-ink">{mdi.esencia}</p>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {programas.map((p) => (
            <li key={p.slug} className="flex flex-col items-center px-4">
              <ProgramaLogo slug={p.slug} className="size-14" />
              <p className={`mt-4 font-sans text-xl font-bold tracking-wide uppercase ${programaTheme[p.slug].text}`}>
                {p.name}
              </p>
              <p className="mt-1 text-muted">{p.esencia}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-12 max-w-2xl text-lg text-muted">{mdi.esencia2}</p>
        <MdiDots className="mt-12" />
        <p className="mt-6 font-display text-3xl text-forest italic md:text-4xl">{mdi.cierre}</p>
      </section>

      <CtaBand
        title="Súmate a Mujer de Influencia."
        text="Si quieres participar, acompañar como voluntaria o aliarte con el programa, escríbenos."
      />
    </>
  );
}
