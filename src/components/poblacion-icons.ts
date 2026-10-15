import { Accessibility, HeartHandshake, House, Users, type LucideIcon } from "lucide-react";
import type { PoblacionId } from "@/content/site";

export const poblacionIcon: Record<PoblacionId, LucideIcon> = {
  lideres: Users,
  "ninez-discapacidad": Accessibility,
  "adultos-mayores": HeartHandshake,
  victimas: House,
};
