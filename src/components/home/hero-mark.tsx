"use client";

import Image from "next/image";
import { m, useReducedMotion, useTransform, type MotionValue, type TargetAndTransition } from "motion/react";

// El isotipo separado en sus cuatro piezas (mismo lienzo, alineadas). Cada pieza
// emerge desde el fondo (translateZ negativo + escala) en secuencia, hasta formar
// el logo. Después, al hacer scroll, cada capa se desplaza a distinta velocidad.
const capas: {
  src: string;
  from: TargetAndTransition;
  depth: number;
}[] = [
  { src: "/brand/capas/1-pierna.png", from: { x: -40, y: 30, rotate: -6 }, depth: 30 },
  { src: "/brand/capas/2-curva.png", from: { x: 30, y: -30, rotate: 5 }, depth: 60 },
  { src: "/brand/capas/3-ala.png", from: { x: -20, y: 50, rotate: 8 }, depth: 95 },
  { src: "/brand/capas/4-dorado.png", from: { x: 0, y: 20, rotate: -18 }, depth: 140 },
];

const BASE_DELAY = 0.35;
const STAGGER = 0.2;

export function HeroMark({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();

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

      <div className="absolute inset-[14%] flex items-center [transform-style:preserve-3d]">
        <div className="relative aspect-[1000/703] w-full [transform-style:preserve-3d]">
          {capas.map((c, i) => (
            <Capa key={c.src} capa={c} index={i} progress={progress} reduce={!!reduce} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Capa({
  capa,
  index,
  progress,
  reduce,
}: {
  capa: (typeof capas)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Parallax por capa: las piezas "más cercanas" se mueven más.
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : capa.depth]);
  const delay = BASE_DELAY + index * STAGGER;
  const isLast = index === capas.length - 1;

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
                opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay },
              }
        }
      >
        <Image
          src={capa.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 360px, 70vw"
          className="object-contain"
        />
      </m.div>
    </m.div>
  );
}
