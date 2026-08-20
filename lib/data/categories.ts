import type { CategoryInfo } from "@/lib/types";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "viaja-mejor",
    label: "Viaja mejor",
    description: "Lo práctico: presupuestos, decisiones, errores y lo que funciona de verdad.",
  },
  {
    slug: "planifica",
    label: "Planifica",
    description: "Visados, documentación, seguros y todo lo que hay que resolver antes de salir.",
  },
  {
    slug: "descubre",
    label: "Descubre",
    description: "Itinerarios, rutas y lugares para descubrir una vez ya estás viajando.",
  },
];

export function getCategory(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
