import type { ProgramaSlug } from "@/content/site";

// Logos de los cuatro programas, redibujados en SVG a partir de la infografía
// oficial de Mujer de Influencia (círculo de color + símbolo blanco).
// Colores muestreados directamente de la imagen.
export const logoColor: Record<ProgramaSlug, string> = {
  raices: "#EC70A2",
  ancora: "#33AAA8",
  reina: "#654972",
  visionarias: "#D1902C",
};

export function ProgramaLogo({
  slug,
  className = "size-14",
  title,
}: {
  slug: ProgramaSlug;
  className?: string;
  title?: string;
}) {
  const color = logoColor[slug];
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="50" cy="50" r="50" fill={color} />
      {slug === "raices" && <Raices color={color} />}
      {slug === "ancora" && <Ancora />}
      {slug === "reina" && <Reina color={color} />}
      {slug === "visionarias" && <Visionarias color={color} />}
    </svg>
  );
}

// Brote de tres hojas con raíces
function Raices({ color }: { color: string }) {
  return (
    <g fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 64 V30" strokeWidth="4.2" fill="none" />
      {/* hoja superior */}
      <path d="M50 34 C40 27 41 15 50 7 C59 15 60 27 50 34 Z" strokeWidth="1" />
      {/* hoja izquierda */}
      <path d="M48 47 C37 50 26 43 23 31 C35 28 46 35 48 47 Z" strokeWidth="1" />
      {/* hoja derecha */}
      <path d="M52 47 C63 50 74 43 77 31 C65 28 54 35 52 47 Z" strokeWidth="1" />
      <g stroke={color} strokeWidth="1.4" fill="none">
        <path d="M50 31 V14" />
        <path d="M46 45 L31 34" />
        <path d="M54 45 L69 34" />
      </g>
      {/* raíces */}
      <g strokeWidth="2.4" fill="none">
        <path d="M50 64 C49 72 50 80 49 88" />
        <path d="M50 66 C44 70 38 72 31 74" />
        <path d="M50 66 C56 70 62 72 69 74" />
        <path d="M49 72 C44 77 40 81 37 87" />
        <path d="M50 72 C55 77 59 81 62 87" />
        <path d="M38 72 C34 75 31 79 27 81" />
        <path d="M62 72 C66 75 69 79 73 81" />
        <path d="M44 78 C42 82 42 85 43 89" />
        <path d="M56 78 C58 82 58 85 57 89" />
      </g>
    </g>
  );
}

// Ancla
function Ancora() {
  return (
    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="17" r="6.5" strokeWidth="5" />
      <path d="M50 24 V84" strokeWidth="8" />
      <path d="M33 34 H67" strokeWidth="7" />
      <path d="M23 60 C26 76 38 84 50 85 C62 84 74 76 77 60" strokeWidth="8" />
      <path d="M15 64 L23 49 L31 64 Z" fill="#fff" strokeWidth="3" />
      <path d="M69 64 L77 49 L85 64 Z" fill="#fff" strokeWidth="3" />
    </g>
  );
}

// Corona de cinco puntas con perlas y aro
function Reina({ color }: { color: string }) {
  return (
    <g fill="#fff">
      <path d="M24 66 L14 38 L30 51 L34 30 L44 47 L50 21 L56 47 L66 30 L70 51 L86 38 L76 66 Z" />
      <circle cx="14" cy="33" r="4.6" />
      <circle cx="34" cy="25" r="4.6" />
      <circle cx="50" cy="15" r="4.8" />
      <circle cx="66" cy="25" r="4.6" />
      <circle cx="86" cy="33" r="4.6" />
      <ellipse cx="50" cy="76" rx="28" ry="7" />
      <ellipse cx="50" cy="75" rx="22" ry="3.2" fill={color} />
    </g>
  );
}

// Rosa de los vientos de ocho puntas
function Visionarias({ color }: { color: string }) {
  const long = 42;
  const short = 25;
  const inner = 10.5;
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    const r = i % 2 === 1 ? inner : i % 4 === 0 ? long : short;
    pts.push(`${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`);
  }
  return (
    <g>
      <polygon points={pts.join(" ")} fill="#fff" />
      <g stroke={color} strokeWidth="1" opacity="0.55">
        <path d="M50 8 V92 M8 50 H92" />
      </g>
    </g>
  );
}
