import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos para participar, donar, ser voluntario o crear una alianza.",
};

export default function ContactoPage() {
  return (
    <>
      <PageIntro
        title="Hablemos"
        lead="Si quieres participar en un programa, apoyar a la fundación o proponer una alianza, escríbenos. Te responderemos pronto."
        crumbs={[{ href: "/contacto", label: "Contacto" }]}
      />
      <section className="container-page pb-24">
        <ul className="grid gap-4 md:grid-cols-2">
          <li>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex h-full items-start gap-5 rounded-3xl border border-line bg-white/60 p-7 transition-colors hover:border-forest/30 hover:bg-white md:p-9"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                <Mail className="size-6" aria-hidden strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-muted">Correo</span>
                <span className="mt-1 block font-display text-2xl break-all text-forest">{site.contact.email}</span>
              </span>
            </a>
          </li>
          <li className="flex items-start gap-5 rounded-3xl border border-line p-7 md:p-9">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
              <MapPin className="size-6" aria-hidden strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-muted">Dónde estamos</span>
              <span className="mt-1 block font-display text-2xl text-forest">{site.contact.city}</span>
            </span>
          </li>
        </ul>
      </section>
    </>
  );
}
