import type { Journey } from "@/lib/types";

/**
 * Contenido de ejemplo (isExample: true): ilustra la plantilla de Viaja
 * Conmigo — narrativa personal en primera persona — antes de cargar
 * relatos reales.
 */
export const JOURNEYS: Journey[] = [
  {
    slug: "egipto",
    destinationSlug: "egipto",
    destinationName: "Egipto",
    title: "Así fue mi viaje por Egipto",
    excerpt:
      "Lo que planeaba ver en fotos terminó siendo, sobre todo, gente. Esto es lo que me llevo.",
    dateISO: "2025-10-12",
    isExample: true,
    body: [
      "Llegué a Egipto con la lista de sitios que todo el mundo lleva. Me fui con una lista completamente distinta: la de las personas que conocí por el camino.",
      "[INSERTAR RELATO REAL Y FOTOGRAFÍAS DEL VIAJE DE PAM POR EGIPTO]",
      "No fue un viaje sin fricciones — hubo momentos de cansancio, de calor, de no entender bien cómo moverme. Eso también es parte de lo que quiero contar aquí: no una versión perfecta, la real.",
    ],
  },
];

export function getJourney(slug: string): Journey | undefined {
  return JOURNEYS.find((j) => j.slug === slug);
}

export function getJourneyByDestination(destinationSlug: string): Journey | undefined {
  return JOURNEYS.find((j) => j.destinationSlug === destinationSlug);
}
