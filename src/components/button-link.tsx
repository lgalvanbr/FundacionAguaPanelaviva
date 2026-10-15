"use client";

import Link from "next/link";
import { m } from "motion/react";
import { springSnappy } from "@/components/motion/springs";

const MotionLink = m.create(Link);

const styles = {
  primary: "bg-forest text-white hover:bg-forest-deep",
  light: "bg-paper text-forest hover:bg-white",
  outline: "border border-forest/25 text-forest hover:border-forest hover:bg-forest/5",
  outlineLight: "border border-white/40 text-white hover:border-white hover:bg-white/10",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <MotionLink
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </MotionLink>
  );
}
