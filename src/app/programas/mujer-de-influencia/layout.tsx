// Toda la sección de Mujer de Influencia usa su propia paleta (ver .theme-mdi en globals.css).
export default function MujerDeInfluenciaLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-mdi bg-paper text-ink">{children}</div>;
}
