"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Maximize2, QrCode, X } from "lucide-react";
import { springGentle, springSnappy } from "@/components/motion/springs";

// Tarjeta de donación con QR. El QR actual es de PRUEBA: al escanearlo muestra un
// mensaje y no recibe dinero. Reemplazar `svg` por el QR oficial de la fundación.
export function DonarQR({ svg }: { svg: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  // true solo en el navegador ya hidratado (el portal no existe en el servidor)
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="rounded-3xl bg-paper p-6 text-ink shadow-[0_20px_60px_-30px_rgb(0_0_0/0.5)] md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gold-ink">Dona con Bancolombia</p>
          <p className="mt-1 font-display text-2xl text-forest">Escanea y aporta</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-full bg-forest/8 text-forest">
          <QrCode className="size-5" aria-hidden />
        </span>
      </div>

      <m.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: reduce ? 1 : 1.02 }}
        whileTap={{ scale: reduce ? 1 : 0.98 }}
        transition={springSnappy}
        aria-label="Ampliar código QR de donación"
        className="group mx-auto mt-6 block w-full max-w-[15rem] rounded-2xl border border-line bg-white p-3"
      >
        <span className="block aspect-square w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        <span className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-forest">
          <Maximize2 className="size-3.5" aria-hidden />
          Toca para ampliar
        </span>
      </m.button>

      <ol className="mt-6 space-y-2 text-[0.9375rem] text-muted">
        <li>1. Abre la app Bancolombia y elige «Pagar con QR».</li>
        <li>2. Escanea el código y escribe el valor de tu aporte.</li>
        <li>3. Escríbenos para enviarte tu certificado de donación.</li>
      </ol>

      <p className="mt-6 rounded-xl bg-sand px-4 py-3 text-sm text-muted">
        <strong className="font-semibold text-ink">Código de ejemplo.</strong> Este QR es de prueba y todavía no recibe
        donaciones; pronto lo reemplazaremos por el QR oficial de la fundación.
      </p>

      {isClient &&
        createPortal(
      <AnimatePresence>
        {open && (
          <m.div
            key="qr-modal"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-deep/70 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            onClick={() => setOpen(false)}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Código QR de donación ampliado"
              className="relative w-full max-w-sm rounded-3xl bg-paper p-6 text-center"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.92, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: reduce ? { duration: 0.15 } : springGentle }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96, transition: { duration: 0.12 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full text-forest hover:bg-sand"
              >
                <X className="size-5" aria-hidden />
              </button>
              <p className="font-display text-2xl text-forest">Escanea para donar</p>
              <p className="mt-1 text-sm text-muted">Desde la app Bancolombia, con otro celular</p>
              <div
                className="mx-auto mt-5 aspect-square w-full max-w-[18rem] rounded-2xl border border-line bg-white p-3"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
              <p className="mt-4 text-sm text-muted">Código de ejemplo: aún no recibe donaciones.</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

const noop = () => () => {};
