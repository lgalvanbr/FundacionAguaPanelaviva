import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60dvh] flex-col items-start justify-center py-24">
      <p className="font-display text-2xl text-gold-ink">404</p>
      <h1 className="mt-3 text-5xl text-forest md:text-7xl">Esta página no existe.</h1>
      <p className="mt-5 max-w-lg text-lg text-muted">Puede que el enlace haya cambiado. Volvamos al inicio.</p>
      <ButtonLink href="/" className="mt-8">
        Ir al inicio
      </ButtonLink>
    </section>
  );
}
