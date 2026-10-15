"use client";

import Image from "next/image";
import { m, useReducedMotion, useTransform, type MotionValue, type TargetAndTransition } from "motion/react";

// Composición del logo de la fundación en el hero:
// 1. Círculo de fondo + dos arcos finos (dorado y verde) que se dibujan girando.
// 2. El isotipo en sus cuatro piezas, que emergen desde el fondo en secuencia.
// 3. El nombre oficial ("FUNDACIÓN @GUAPANELA VIVA") bajo el isotipo.
// Ya formado, el ave (ala + acento dorado) flota suavemente y los arcos giran muy lento.
// Al hacer scroll, cada capa del isotipo se desplaza a distinta velocidad (profundidad).

type CapaDef = { src: string; from: TargetAndTransition; depth: number };

const base: CapaDef[] = [
  { src: "/brand/capas/1-pierna.png", from: { x: -40, y: 30, rotate: -6 }, depth: 8 },
  { src: "/brand/capas/2-curva.png", from: { x: 30, y: -30, rotate: 5 }, depth: 16 },
];
const ave: CapaDef[] = [
  { src: "/brand/capas/3-ala.png", from: { x: -20, y: 50, rotate: 8 }, depth: 26 },
  { src: "/brand/capas/4-dorado.png", from: { x: 0, y: 20, rotate: -18 }, depth: 36 },
];

const BASE_DELAY = 0.35;
const STAGGER = 0.2;
const ASSEMBLED = BASE_DELAY + STAGGER * 4 + 0.4; // cuando el isotipo ya está formado
const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroMark({ progress }: { progress: MotionValue<number> }) {
  const reduce = !!useReducedMotion();
  const textY = useTransform(progress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1100px]">
      <m.div
        aria-hidden
        className="absolute inset-0 rounded-full bg-sand"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduce
            ? { duration: 0.3 }
            : { scale: { type: "spring", stiffness: 90, damping: 16, delay: 0.1 }, opacity: { duration: 0.5, delay: 0.1 } }
        }
      />

      <Arco radius={49.4} stroke="var(--color-gold)" width={0.55} arc={0.62} startRotate={-160} spin={1} reduce={reduce} delay={0.25} />
      <Arco radius={46.6} stroke="var(--color-forest)" width={0.3} arc={0.38} startRotate={120} spin={-1} reduce={reduce} delay={0.4} />

      {/* Isotipo */}
      <div className="absolute inset-x-[17%] top-[15%] [transform-style:preserve-3d]">
        <div className="relative aspect-[1000/703] w-full [transform-style:preserve-3d]">
          {base.map((c, i) => (
            <Capa key={c.src} capa={c} index={i} progress={progress} reduce={reduce} />
          ))}
          {/* El ave flota cuando el logo ya está formado */}
          <m.div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{ originX: "45%", originY: "72%" }}
            animate={reduce ? undefined : { y: ["0%", "-2.2%", "0%"], rotate: [0, -2.5, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: ASSEMBLED + 0.4 }}
          >
            {ave.map((c, i) => (
              <Capa key={c.src} capa={c} index={i + base.length} progress={progress} reduce={reduce} />
            ))}
          </m.div>
        </div>
      </div>

      {/* Nombre oficial */}
      <m.div style={{ y: textY }} className="absolute inset-x-[21%] top-[67%]">
        <m.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduce
              ? { duration: 0.4, delay: 0.3 }
              : {
                  y: { type: "spring", stiffness: 140, damping: 20, delay: ASSEMBLED - 0.15 },
                  opacity: { duration: 0.6, ease: EASE, delay: ASSEMBLED - 0.15 },
                }
          }
          className="relative aspect-[1200/243] w-full"
        >
          <Image
            src="/brand/capas/5-texto.webp"
            alt="Fundación Aguapanela Viva"
            fill
            unoptimized
            priority
            className="object-contain"
          />
        </m.div>
      </m.div>
    </div>
  );
}

// Arco fino alrededor del círculo: entra girando y luego rota muy lento.
function Arco({
  radius,
  stroke,
  width,
  arc,
  startRotate,
  spin,
  reduce,
  delay,
}: {
  radius: number;
  stroke: string;
  width: number;
  arc: number;
  startRotate: number;
  spin: 1 | -1;
  reduce: boolean;
  delay: number;
}) {
  const c = 2 * Math.PI * radius;
  return (
    <m.div
      aria-hidden
      className="absolute inset-0"
      initial={{ opacity: 0, rotate: reduce ? 0 : startRotate }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={
        reduce
          ? { duration: 0.4 }
          : { rotate: { type: "spring", stiffness: 40, damping: 14, delay }, opacity: { duration: 0.8, delay } }
      }
    >
      <m.svg
        viewBox="0 0 100 100"
        className="size-full overflow-visible"
        animate={reduce ? undefined : { rotate: 360 * spin }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity, delay: delay + 1.5 }}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={`${c * arc} ${c}`}
        />
      </m.svg>
    </m.div>
  );
}

function Capa({
  capa,
  index,
  progress,
  reduce,
}: {
  capa: CapaDef;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Parallax por capa: las piezas "más cercanas" se mueven más.
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : capa.depth]);
  const delay = BASE_DELAY + index * STAGGER;
  const isLast = index === 3;

  return (
    <m.div style={{ y }} className="absolute inset-0">
      <m.div
        className="absolute inset-0"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.35, z: -700, ...capa.from }}
        animate={{ opacity: 1, scale: 1, z: 0, x: 0, y: 0, rotate: 0 }}
        transition={
          reduce
            ? { duration: 0.4, delay: index * 0.08 }
            : {
                default: isLast
                  ? { type: "spring", stiffness: 260, damping: 13, delay }
                  : { type: "spring", stiffness: 110, damping: 17, mass: 1.1, delay },
                opacity: { duration: 0.45, ease: EASE, delay },
              }
        }
      >
        <Image src={capa.src} alt="" fill priority sizes="(min-width: 1024px) 300px, 60vw" className="object-contain" />
      </m.div>
    </m.div>
  );
}
