import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Handshake } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { programaTheme, puntoIcon } from "@/components/programa-theme";
import { getPrograma, programas } from "@/content/site";

export function generateStaticParams() {
  return programas.map((p) => ({ programa: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/programas/mujer-de-influencia/[programa]">): Promise<Metadata> {
  const p = getPrograma((await params).programa);
  if (!p) return {};
  return { title: `${p.name} — Mujer de Influencia`, description: `${p.lema} ${p.description}` };
}

export default async function ProgramaPage({ params }: PageProps<"/programas/mujer-de-influencia/[programa]">) {
  const p = getPrograma((await params).programa);
  if (!p) notFound();
  const t = programaTheme[p.slug];
  const next = programas[(programas.indexOf(p) + 1) % programas.length];

  return (
    <>
      <section className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="font-display text-2xl leading-snug md:text-[2rem]">{p.description}</p>
        </div>
        <Reveal className="md:col-span-5">
          <div className="rounded-[1.75rem] border border-line bg-white/70 p-7 md:p-9">
            <h2 className={`text-3xl ${t.text}`}>¿Qué trabajamos?</h2>
            <ul className="mt-6 space-y-4">
              {p.trabajamos.map((w, i) => {
                const PuntoIcon = puntoIcon[p.puntos[i].icon];
                return (
                  <li key={w} className="flex gap-3 text-lg">
                    <PuntoIcon className={`mt-1 size-5.5 shrink-0 ${t.logoText}`} aria-hidden strokeWidth={2} />
                    {w}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </section>

      {p.alianza && (
        <section className="container-page pb-8">
          <div className="flex flex-col gap-5 rounded-[1.75rem] bg-sand p-7 md:flex-row md:items-center md:p-9">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-forest text-white">
              <Handshake className="size-7" aria-hidden strokeWidth={1.75} />
            </span>
            <div>
              <h2 className="text-2xl text-forest md:text-3xl">Alianza estratégica con el SENA</h2>
              <p className="mt-2 text-muted">{p.alianza}</p>
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <blockquote className={`max-w-4xl font-display text-3xl leading-tight italic md:text-5xl ${t.text}`}>
            “{p.frase}”
          </blockquote>
        </Reveal>
      </section>

      <section className="border-t border-line">
        <Link
          href={`/programas/mujer-de-influencia/${next.slug}`}
          className="container-page group flex min-h-32 items-center justify-between gap-6 py-10"
        >
          <span>
            <span className="block text-muted">Siguiente programa</span>
            <span className={`mt-1 block font-display text-4xl md:text-6xl ${programaTheme[next.slug].text}`}>
              {next.name}
            </span>
          </span>
          <span className="hidden max-w-xs text-right text-muted md:block">{next.lema}</span>
        </Link>
      </section>

      <CtaBand
        title={`¿Quieres ser parte de ${p.name}?`}
        text="Escríbenos para conocer las próximas convocatorias, participar o apoyar el programa."
      />
    </>
  );
}
