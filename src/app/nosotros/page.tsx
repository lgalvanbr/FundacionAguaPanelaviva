import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/page-intro";
import { mision, valores, vision } from "@/content/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Misión, visión y principios de la Fundación Aguapanela Viva.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageIntro
        title="Una fundación que se sienta a la mesa con las comunidades."
        lead="Como una aguapanela compartida, creemos en lo cercano, lo cálido y lo que se construye entre todos."
        crumbs={[{ href: "/nosotros", label: "Nosotros" }]}
      />

      <section id="mision" aria-labelledby="mision-title" className="scroll-mt-24 border-t border-line">
        <div className="container-page grid gap-8 py-16 md:grid-cols-12 md:py-24">
          <h2 id="mision-title" className="text-4xl text-forest md:col-span-4 md:text-5xl">
            Misión
          </h2>
          <Reveal className="md:col-span-8">
            <p className="font-display text-2xl leading-snug text-ink md:text-[2rem]">{mision}</p>
          </Reveal>
        </div>
      </section>

      <section id="vision" aria-labelledby="vision-title" className="scroll-mt-24 bg-forest text-white">
        <div className="container-page relative grid gap-8 overflow-hidden py-16 md:grid-cols-12 md:py-24">
          <Image
            src="/brand/isotipo-negativo.png"
            alt=""
            width={669}
            height={470}
            className="pointer-events-none absolute -top-10 -right-24 w-80 opacity-10 md:w-[30rem]"
          />
          <div className="relative md:col-span-4">
            <h2 id="vision-title" className="text-4xl md:text-5xl">
              Visión
            </h2>
            <p className="mt-3 font-display text-6xl text-gold md:text-8xl">2030</p>
          </div>
          <Reveal className="relative md:col-span-8">
            <p className="font-display text-2xl leading-snug md:text-[2rem]">{vision}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="principios" className="container-page py-16 md:py-24">
        <h2 id="principios" className="max-w-xl text-4xl text-forest md:text-5xl">
          Cómo trabajamos
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {valores.map((v) => (
            <li key={v.title} className="border-t-2 border-gold pt-6">
              <h3 className="text-3xl text-forest">{v.title}</h3>
              <p className="mt-3 text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
