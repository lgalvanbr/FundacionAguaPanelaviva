"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { springGentle, springLayout, springSnappy } from "@/components/motion/springs";

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-h-11 items-center gap-3"
          aria-label="Fundación Aguapanela Viva, inicio"
        >
          <Image src="/brand/isotipo-sm.png" alt="" width={669} height={470} className="h-8 w-auto md:h-9" priority />
          <span className="leading-none">
            <span className="block text-[0.6875rem] font-medium tracking-[0.28em] text-forest">FUNDACIÓN</span>
            <span className="block text-[1.0625rem] font-bold tracking-[0.06em] text-forest">AGUAPANELA VIVA</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-11 items-center px-4 text-[0.9375rem] font-medium transition-colors ${
                      active ? "text-forest" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-gold"
                        transition={springLayout}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={springSnappy} className="hidden sm:block">
            <Link
              href="/involucrate#donar"
              className="flex min-h-11 items-center rounded-full bg-forest px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-forest-deep"
            >
              Apoya la fundación
            </Link>
          </m.div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex size-11 items-center justify-center rounded-full text-forest hover:bg-sand lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movil"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-x-0 top-16 bottom-0 bg-paper lg:hidden"
          >
            <m.nav
              aria-label="Menú móvil"
              className="container-page flex h-full flex-col pt-6 pb-10"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } }}
            >
              <ul className="flex flex-col">
                {[{ href: "/", label: "Inicio" }, ...nav, { href: "/contacto", label: "Contacto" }].map((item) => (
                  <m.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: reduce ? 0 : 16 },
                      show: { opacity: 1, y: 0, transition: springGentle },
                    }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex min-h-16 items-center font-display text-3xl text-forest"
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <Link
                href="/involucrate#donar"
                onClick={() => setOpen(false)}
                className="mt-auto flex min-h-13 items-center justify-center rounded-full bg-forest px-6 text-lg font-semibold text-white"
              >
                Apoya la fundación
              </Link>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
