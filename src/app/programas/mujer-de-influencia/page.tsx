import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/page-intro";
import { programaTheme } from "@/components/programa-theme";
import { mujerDeInfluencia as mdi, programas } from "@/content/site";

export const metadata: Metadata = {
  title: "Mujer de Influencia",
  description: mdi.about,
};

export default function MujerDeInfluenciaPage() {
  return (
    <>
      <PageIntro
        title={mdi.title}
        lead={mdi.tagline}
        crumbs={[
          { href: "/programas", label: "Programas" },
          { href: "/programas/mujer-de-influencia", label: mdi.title },
        ]}
      />

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
          <h2 id="cuatro" className="text-4xl text-forest md:text-5xl">
            Nuestros cuatro programas
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {programas.map((p) => {
              const t = programaTheme[p.slug];
              const Icon = t.icon;
              return (
                <li key={p.slug}>
                  <Link
                    href={`/programas/mujer-de-influencia/${p.slug}`}
                    className={`group flex h-full flex-col rounded-[1.75rem] ${t.bg} p-7 transition-transform duration-300 ease-out-soft hover:-translate-y-1 md:p-9`}
                  >
                    <span className={`flex size-14 items-center justify-center rounded-full ${t.solid} text-white`}>
                      <Icon className="size-7" aria-hidden strokeWidth={1.75} />
                    </span>
                    <h3 className={`mt-7 text-4xl ${t.text}`}>{p.name}</h3>
                    <p className="mt-2 text-lg font-medium">{p.lema}</p>
                    <ul className="mt-5 space-y-1.5 text-muted">
                      {p.trabajamos.map((w) => (
                        <li key={w} className="flex gap-3">
                          <span className={`mt-2.5 size-1.5 shrink-0 rounded-full ${t.solid}`} aria-hidden />
                          {w}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={`mt-auto inline-flex min-h-11 items-center pt-6 font-semibold underline decoration-2 underline-offset-4 ${t.text}`}
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

      <section aria-labelledby="esencia" className="container-page py-16 md:py-24">
        <h2 id="esencia" className="max-w-3xl text-4xl text-forest md:text-5xl">
          {mdi.esencia}
        </h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programas.map((p) => {
            const t = programaTheme[p.slug];
            return (
              <li key={p.slug} className={`border-t-2 pt-5 ${t.ring}`}>
                <p className={`font-display text-2xl ${t.text}`}>{p.name}</p>
                <p className="mt-1 text-muted">{p.esencia}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-12 max-w-2xl text-lg text-muted">{mdi.esencia2}</p>
        <p className="mt-10 font-display text-3xl text-forest italic md:text-4xl">“{mdi.cierre}”</p>
      </section>

      <CtaBand
        title="Súmate a Mujer de Influencia."
        text="Si quieres participar, acompañar como voluntaria o aliarte con el programa, escríbenos."
      />
    </>
  );
}
