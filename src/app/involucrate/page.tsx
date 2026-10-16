import type { Metadata } from "next";
import { HandCoins, Handshake, HeartHandshake, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { DonarQR } from "@/components/donar-qr";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/content/site";
import { qrSvg } from "@/lib/qr";

export const metadata: Metadata = {
  title: "Involúcrate",
  description: "Dona, sé voluntario o crea una alianza con la Fundación Aguapanela Viva.",
};

const formas: {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  detalle: string[];
  cta: string;
  asunto: string;
}[] = [
  {
    id: "donar",
    icon: HandCoins,
    title: "Dona",
    text: "Tu aporte sostiene procesos de formación, recreación y acompañamiento integral en las comunidades.",
    detalle: [
      "Donaciones únicas o mensuales",
      "Donaciones en especie para actividades y encuentros",
      "Por QR desde la app Bancolombia, o escríbenos para recibir los datos de la cuenta",
      "Te enviamos tu certificado de donación",
    ],
    cta: "Quiero donar",
    asunto: "Quiero donar",
  },
  {
    id: "voluntariado",
    icon: HeartHandshake,
    title: "Sé voluntario",
    text: "Comparte tu tiempo y tus saberes: acompañamiento, talleres, recreación, comunicación o apoyo profesional.",
    detalle: [
      "Acompañamiento en actividades con las comunidades",
      "Talleres desde tu profesión u oficio",
      "Apoyo en comunicación, logística y gestión",
    ],
    cta: "Quiero ser voluntario",
    asunto: "Voluntariado",
  },
  {
    id: "aliados",
    icon: Handshake,
    title: "Haz alianza",
    text: "Articulamos alianzas sostenibles con entidades públicas, privadas y de cooperación para multiplicar el impacto.",
    detalle: [
      "Empresas con programas de responsabilidad social",
      "Entidades públicas y de cooperación internacional",
      "Instituciones educativas y organizaciones sociales",
    ],
    cta: "Proponer una alianza",
    asunto: "Propuesta de alianza",
  },
];

// QR de PRUEBA: al escanearlo muestra este mensaje. No recibe dinero.
// Reemplazar por el contenido del QR oficial de Bancolombia de la fundación.
const donacionQr = qrSvg(
  // Sin tildes: algunos lectores de QR de celular no decodifican bien UTF-8.
  "QR de prueba - Fundacion Aguapanela Viva. Este codigo aun no recibe donaciones. Escribenos a " +
    site.contact.email,
);

function Detalle({ f, dark = false }: { f: (typeof formas)[number]; dark?: boolean }) {
  return (
    <>
      <ul className={`mt-8 divide-y ${dark ? "divide-white/15" : "divide-line"}`}>
        {f.detalle.map((d) => (
          <li key={d} className="py-4 text-lg">
            {d}
          </li>
        ))}
      </ul>
      <ButtonLink
        href={`mailto:${site.contact.email}?subject=${encodeURIComponent(f.asunto)}`}
        variant={dark ? "light" : "primary"}
        className="mt-8"
      >
        {f.cta}
      </ButtonLink>
    </>
  );
}

export default function InvolucratePage() {
  return (
    <>
      <PageIntro
        title="Involúcrate"
        lead="Hay muchas formas de servir una taza más. Elige la tuya."
        crumbs={[{ href: "/involucrate", label: "Involúcrate" }]}
      />

      <div className="border-t border-line">
        {formas.map((f, i) => {
          const Icon = f.icon;
          return (
            <section
              key={f.id}
              id={f.id}
              aria-labelledby={`${f.id}-title`}
              className={`scroll-mt-24 ${i === 0 ? "bg-forest text-white" : i === 1 ? "bg-sand" : ""}`}
            >
              <Reveal className="container-page grid gap-10 py-16 md:grid-cols-12 md:py-24">
                <div className="md:col-span-6">
                  <span
                    className={`flex size-14 items-center justify-center rounded-full ${
                      i === 0 ? "bg-gold text-forest-deep" : "bg-forest text-white"
                    }`}
                  >
                    <Icon className="size-7" aria-hidden strokeWidth={1.75} />
                  </span>
                  <h2 id={`${f.id}-title`} className={`mt-7 text-5xl md:text-6xl ${i === 0 ? "" : "text-forest"}`}>
                    {f.title}
                  </h2>
                  <p className={`mt-5 max-w-lg text-lg ${i === 0 ? "text-forest-soft" : "text-muted"}`}>{f.text}</p>
                  {i === 0 && <Detalle f={f} dark />}
                </div>
                <div className="md:col-span-6 md:pt-20">
                  {i === 0 ? <DonarQR svg={donacionQr} /> : <Detalle f={f} />}
                </div>
              </Reveal>
            </section>
          );
        })}
      </div>
    </>
  );
}
