import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { programaTheme } from "@/components/programa-theme";
import { mujerDeInfluencia, programas } from "@/content/site";

export const metadata: Metadata = {
  title: "Programas",
  description: "Programas de la Fundación Aguapanela Viva, entre ellos Mujer de Influencia.",
};

export default function ProgramasPage() {
  return (
    <>
      <PageIntro
        title="Programas"
        lead="Procesos de formación, recreación y acompañamiento integral diseñados junto con cada comunidad."
        crumbs={[{ href: "/programas", label: "Programas" }]}
      />

      <section className="container-page pb-8">
        <Link
          href="/programas/mujer-de-influencia"
          className="group grid gap-10 rounded-[2rem] bg-sand p-7 transition-colors hover:bg-[#efe7d7] md:grid-cols-12 md:p-12"
        >
          <div className="md:col-span-6">
            <p className="font-medium text-raices">Desarrollo integral de la mujer</p>
            <h2 className="mt-3 text-5xl text-forest md:text-6xl">{mujerDeInfluencia.title}</h2>
            <p className="mt-5 text-lg text-muted">{mujerDeInfluencia.tagline}</p>
            <span className="mt-8 inline-flex min-h-12 items-center rounded-full bg-forest px-6 font-semibold text-white transition-colors group-hover:bg-forest-deep">
              Conocer el programa
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-3 self-center md:col-span-6">
            {programas.map((p) => {
              const t = programaTheme[p.slug];
              const Icon = t.icon;
              return (
                <li key={p.slug} className={`rounded-2xl ${t.bg} p-5`}>
                  <Icon className={`size-6 ${t.text}`} aria-hidden strokeWidth={1.75} />
                  <p className={`mt-4 font-display text-2xl ${t.text}`}>{p.name}</p>
                  <p className="mt-1 text-sm text-muted">{p.esencia}</p>
                </li>
              );
            })}
          </ul>
        </Link>
        <p className="mt-8 max-w-2xl text-muted">
          Estamos documentando los demás programas de la fundación para niñez con discapacidad, adultos mayores y
          víctimas del conflicto. Muy pronto estarán aquí.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
