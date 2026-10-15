import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { nav, programas, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-forest-deep text-forest-soft">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Image
            src="/brand/logo-fundacion-blanco.png"
            alt="Fundación Aguapanela Viva"
            width={1926}
            height={1321}
            className="h-auto w-44"
          />
          <p className="mt-6 max-w-xs text-[0.9375rem]">
            Inclusión, formación, recreación y acompañamiento integral desde el respeto, la dignidad y la
            corresponsabilidad.
          </p>
        </div>

        <FooterCol title="La fundación" className="md:col-span-3">
          {[...nav, { href: "/contacto", label: "Contacto" }].map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Mujer de Influencia" className="md:col-span-2">
          {programas.map((p) => (
            <FooterLink key={p.slug} href={`/programas/mujer-de-influencia/${p.slug}`}>
              {p.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Escríbenos" className="md:col-span-3">
          <li>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex min-h-11 items-center gap-2 text-white hover:text-gold"
            >
              <Mail className="size-4" aria-hidden />
              {site.contact.email}
            </a>
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-6 text-sm">
          © 2026 {site.name}. Entidad sin ánimo de lucro.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="font-sans text-sm font-semibold tracking-normal text-white">{title}</h2>
      <ul className="mt-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-11 items-center text-[0.9375rem] hover:text-white">
        {children}
      </Link>
    </li>
  );
}
