import {
  Brain,
  ChartNoAxesColumnIncreasing,
  Flower2,
  Heart,
  HeartHandshake,
  Leaf,
  Lightbulb,
  MessageCircle,
  Shield,
  Target,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ProgramaSlug, PuntoIcon } from "@/content/site";

// Clases literales para que Tailwind las detecte.
export const programaTheme: Record<
  ProgramaSlug,
  { text: string; bg: string; solid: string; ring: string; logoText: string }
> = {
  raices: { text: "text-raices", bg: "bg-raices-bg", solid: "bg-raices", ring: "border-raices/30", logoText: "text-raices-logo" },
  ancora: { text: "text-ancora", bg: "bg-ancora-bg", solid: "bg-ancora", ring: "border-ancora/30", logoText: "text-ancora-logo" },
  reina: { text: "text-reina", bg: "bg-reina-bg", solid: "bg-reina", ring: "border-reina/30", logoText: "text-reina-logo" },
  visionarias: {
    text: "text-visionarias",
    bg: "bg-visionarias-bg",
    solid: "bg-visionarias",
    ring: "border-visionarias/30",
    logoText: "text-visionarias-logo",
  },
};

// Íconos de las viñetas, como en la infografía
export const puntoIcon: Record<PuntoIcon, LucideIcon> = {
  leaf: Leaf,
  heart: Heart,
  user: User,
  lotus: Flower2,
  brain: Brain,
  shield: Shield,
  users: Users,
  target: Target,
  hands: HeartHandshake,
  bulb: Lightbulb,
  chat: MessageCircle,
  chart: ChartNoAxesColumnIncreasing,
};
