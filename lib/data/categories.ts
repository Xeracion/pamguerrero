import type { CategoryInfo } from "@/lib/types";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "viajar-mejor",
    label: "Viajar mejor",
    description: "Lo práctico: presupuestos, decisiones, errores y lo que funciona de verdad.",
  },
  {
    slug: "experiencias-internacionales",
    label: "Experiencias internacionales",
    description: "Becas, trabajo, voluntariado y otras puertas de entrada a vivir fuera.",
  },
  {
    slug: "cultura",
    label: "Cultura",
    description: "Lo que se aprende comiendo, escuchando y observando de cerca.",
  },
  {
    slug: "ampliar-tu-mundo",
    label: "Ampliar tu mundo",
    description: "La filosofía detrás de todo esto, aplicada a decisiones concretas.",
  },
  {
    slug: "historias",
    label: "Historias",
    description: "Relatos de personas — incluida yo misma — que se atrevieron primero.",
  },
];

export function getCategory(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
