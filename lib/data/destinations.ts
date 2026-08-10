import type { Destination } from "@/lib/types";

/**
 * Contenido de ejemplo (isExample: true): ilustra la plantilla de
 * Destination Hub antes de cargar guías reales escritas por Pam.
 */
export const DESTINATIONS: Destination[] = [
  {
    slug: "egipto",
    name: "Egipto",
    region: "Norte de África",
    summary:
      "Un país que suele visitarse por sus monumentos y termina recordándose por su gente.",
    isExample: true,
    guide: [
      {
        heading: "Cultura",
        body: "[INSERTAR OBSERVACIONES REALES DE PAM SOBRE CULTURA LOCAL, BASADAS EN SU EXPERIENCIA]",
      },
      {
        heading: "Gastronomía",
        body: "[INSERTAR RECOMENDACIONES REALES DE COMIDA PROBADA POR PAM]",
      },
      {
        heading: "Transporte",
        body: "[INSERTAR CONSEJOS REALES SOBRE CÓMO MOVERSE DENTRO DEL PAÍS]",
      },
      {
        heading: "Presupuesto",
        body: "[INSERTAR RANGO DE PRESUPUESTO REAL Y VERIFICADO]",
      },
      {
        heading: "Errores que no repetiría",
        body: "[INSERTAR APRENDIZAJES REALES DE VIAJES ANTERIORES DE PAM EN ESTE DESTINO]",
      },
    ],
    relatedTripSlugs: ["egipto-marzo-2027"],
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}
