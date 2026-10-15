import { Anchor, Compass, Crown, Sprout, type LucideIcon } from "lucide-react";
import type { ProgramaSlug } from "@/content/site";

// Clases literales para que Tailwind las detecte.
export const programaTheme: Record<
  ProgramaSlug,
  { icon: LucideIcon; text: string; bg: string; solid: string; ring: string }
> = {
  raices: { icon: Sprout, text: "text-raices", bg: "bg-raices-bg", solid: "bg-raices", ring: "border-raices/25" },
  ancora: { icon: Anchor, text: "text-ancora", bg: "bg-ancora-bg", solid: "bg-ancora", ring: "border-ancora/25" },
  reina: { icon: Crown, text: "text-reina", bg: "bg-reina-bg", solid: "bg-reina", ring: "border-reina/25" },
  visionarias: {
    icon: Compass,
    text: "text-visionarias",
    bg: "bg-visionarias-bg",
    solid: "bg-visionarias",
    ring: "border-visionarias/25",
  },
};
