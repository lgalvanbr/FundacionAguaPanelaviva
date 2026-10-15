import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Encabezado de páginas internas: migas de pan + título + bajada.
export function PageIntro({
  title,
  lead,
  crumbs = [],
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container-page pt-10 pb-14 md:pt-16 md:pb-20">
      <nav aria-label="Ruta de navegación" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center hover:text-forest">
              Inicio
            </Link>
          </li>
          {crumbs.map((c) => (
            <li key={c.href} className="flex items-center gap-1">
              <ChevronRight className="size-4" aria-hidden />
              <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-forest">
                {c.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="max-w-4xl text-[2.75rem] text-forest md:text-7xl">{title}</h1>
      {lead && <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{lead}</p>}
      {children}
    </section>
  );
}
