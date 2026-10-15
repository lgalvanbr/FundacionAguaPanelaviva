import type { MetadataRoute } from "next";
import { programas, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/nosotros",
    "/a-quien-acompanamos",
    "/programas",
    "/programas/mujer-de-influencia",
    ...programas.map((p) => `/programas/mujer-de-influencia/${p.slug}`),
    "/involucrate",
    "/contacto",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
