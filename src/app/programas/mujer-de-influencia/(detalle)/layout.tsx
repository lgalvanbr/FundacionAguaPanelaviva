import { ProgramaHeader } from "@/components/programa-header";

export default function ProgramaDetalleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgramaHeader />
      {children}
    </>
  );
}
