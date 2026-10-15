// Los cuatro puntos de color de la infografía de Mujer de Influencia.
export function MdiDots({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex gap-2 ${className}`}>
      {["#e0186a", "#1a9bb0", "#6b2d8c", "#f07a1e"].map((c) => (
        <span key={c} className="size-2.5 rounded-full" style={{ backgroundColor: c }} />
      ))}
    </span>
  );
}
