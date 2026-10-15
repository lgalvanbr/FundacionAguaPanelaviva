"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { inView, m, useInView, useReducedMotion, type TargetAndTransition, type Transition } from "motion/react";

// Logo horizontal de Mujer de Influencia separado en capas (mismo lienzo 1800×669):
// aro, mujer, corazón, loto y textos. Secuencia: el aro se dibuja girando, el loto se
// abre, la mujer emerge desde la flor, el corazón aparece y late, y entra el texto.
// Después la mujer "respira" suavemente mientras el logo está en pantalla.

const SRC = "/brand/mdi-capas/";
// Geometría en % del lienzo (medida sobre el original)
const CIRCLE = { originX: "19.16%", originY: "49.95%" };
const HEART = { originX: "17.2%", originY: "22.2%" };
const LOTUS_BASE = { originX: "19.16%", originY: "99%" };
const NECK = { originX: "22%", originY: "80%" };
// La mujer se recorta al interior del aro mientras sube
const CLIP = "ellipse(18.6% 50% at 19.16% 49.95%)";
const EASE = [0.16, 1, 0.3, 1] as const;

function Capa({ name, priority }: { name: string; priority: boolean }) {
  return (
    <Image
      src={`${SRC}${name}.webp`}
      alt=""
      fill
      unoptimized
      priority={priority}
      className="pointer-events-none object-contain select-none"
    />
  );
}

export function MdiAnimado({
  className = "",
  delay = 0,
  priority = false,
}: {
  className?: string;
  delay?: number;
  priority?: boolean;
}) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // `delay` solo aplica si el logo es visible al cargar (para encadenarse con el resto
  // de la entrada). Si se llega con scroll, la espera ya transcurrida se descuenta.
  const [startDelay, setStartDelay] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mountedAt = performance.now();
    const stop = inView(
      el,
      () => {
        setStartDelay(Math.max(0, delay - (performance.now() - mountedAt) / 1000));
        stop();
      },
      { margin: "0px 0px -10% 0px" },
    );
    return stop;
  }, [delay]);
  const started = startDelay !== null;
  const d0 = startDelay ?? 0;
  // Las animaciones continuas solo corren mientras el logo es visible
  const visible = useInView(ref);
  const loop = started && visible && !reduce;

  // Props de entrada para una capa: estado oculto → visible, con resorte para el
  // movimiento y un fundido corto para la opacidad.
  const enter = (hidden: TargetAndTransition, at: number, spring: Transition) => {
    const from = reduce ? { opacity: 0 } : { opacity: 0, ...hidden };
    const to = Object.fromEntries(Object.keys(from).map((k) => [k, k === "opacity" ? 1 : neutral(k)]));
    return {
      initial: from,
      animate: started ? to : from,
      transition: reduce
        ? { duration: 0.4, delay: d0 + at * 0.3 }
        : { ...spring, delay: d0 + at, opacity: { duration: 0.5, delay: d0 + at, ease: EASE } },
    };
  };

  return (
    <div ref={ref} role="img" aria-label="Mujer de Influencia" className={`relative aspect-[1800/669] w-full ${className}`}>
      {/* Aro: gira y se cierra alrededor */}
      <m.div
        className="absolute inset-0"
        style={CIRCLE}
        {...enter({ rotate: -140, scale: 0.8 }, 0, { type: "spring", stiffness: 55, damping: 14 })}
      >
        <Capa name="aro" priority={priority} />
      </m.div>

      {/* Mujer + corazón: emergen desde la flor, recortados al interior del aro */}
      <div className="absolute inset-0" style={{ clipPath: CLIP }}>
        <m.div
          className="absolute inset-0"
          {...enter({ y: "22%" }, 0.45, { type: "spring", stiffness: 70, damping: 15, mass: 1.1 })}
        >
          {/* Respiración: leve subida y balanceo de la cabeza desde el cuello */}
          <m.div
            className="absolute inset-0"
            style={NECK}
            animate={loop ? { y: ["0%", "-1.4%", "0%"], rotate: [0, -1.2, 0] } : { y: "0%", rotate: 0 }}
            transition={loop ? { duration: 6, ease: "easeInOut", repeat: Infinity, delay: d0 + 1.8 } : { duration: 0.6 }}
          >
            <Capa name="mujer" priority={priority} />

            {/* Corazón: aparece con rebote y luego late */}
            <m.div
              className="absolute inset-0"
              style={HEART}
              {...enter({ scale: 0 }, 1.05, { type: "spring", stiffness: 320, damping: 11 })}
            >
              <m.div
                className="absolute inset-0"
                style={HEART}
                animate={loop ? { scale: [1, 1.16, 1, 1.09, 1] } : { scale: 1 }}
                transition={
                  loop
                    ? {
                        duration: 1.3,
                        times: [0, 0.14, 0.3, 0.44, 1],
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        delay: d0 + 1.9,
                      }
                    : { duration: 0.3 }
                }
              >
                <Capa name="corazon" priority={priority} />
              </m.div>
            </m.div>
          </m.div>
        </m.div>
      </div>

      {/* Loto: se abre desde su base (encima de la mujer, como en el logo) */}
      <m.div
        className="absolute inset-0"
        style={LOTUS_BASE}
        {...enter({ scaleY: 0.1, scaleX: 0.55 }, 0.2, { type: "spring", stiffness: 110, damping: 12 })}
      >
        <Capa name="loto" priority={priority} />
      </m.div>

      {/* Textos */}
      {(["texto-mujer", "texto-influencia"] as const).map((name, i) => (
        <m.div
          key={name}
          className="absolute inset-0"
          {...enter({ x: "-4%" }, 0.75 + i * 0.15, { type: "spring", stiffness: 140, damping: 20 })}
        >
          <Capa name={name} priority={priority} />
        </m.div>
      ))}
    </div>
  );
}

// Valor de reposo de cada propiedad de transformación
function neutral(key: string) {
  if (key.startsWith("scale")) return 1;
  if (key === "x" || key === "y") return "0%";
  return 0;
}
