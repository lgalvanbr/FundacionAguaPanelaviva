import Image from "next/image";

// Logo de Mujer de Influencia. Se sirve sin recomprimir (unoptimized): el WebP ya
// viene exportado a calidad alta y la compresión por defecto lo degrada.
const variants = {
  horizontal: { src: "/brand/mdi-horizontal.webp", width: 1800, height: 669 },
  vertical: { src: "/brand/mdi-vertical.webp", width: 1200, height: 1239 },
} as const;

export function MdiLogo({
  variant = "horizontal",
  className = "",
  priority = false,
}: {
  variant?: keyof typeof variants;
  className?: string;
  priority?: boolean;
}) {
  const v = variants[variant];
  return (
    <Image
      src={v.src}
      alt="Mujer de Influencia"
      width={v.width}
      height={v.height}
      priority={priority}
      unoptimized
      className={`h-auto ${className}`}
    />
  );
}
