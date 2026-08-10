import type { Trip } from "@/lib/types";

/**
 * Contenido de ejemplo (isExample: true): ilustra la plantilla de viaje
 * grupal antes de cargar itinerarios, precios y disponibilidad reales.
 */
export const TRIPS: Trip[] = [
  {
    slug: "egipto-marzo-2027",
    destinationSlug: "egipto",
    title: "Egipto — viaje grupal",
    dates: "[INSERTAR FECHAS REALES]",
    durationDays: 10,
    price: "[INSERTAR PRECIO REAL]",
    status: "proximo",
    isExample: true,
    description:
      "Un recorrido grupal pensado para conocer el país más allá de la ruta turística estándar, con acompañamiento de Pam durante todo el viaje.",
    itinerary: [
      { day: 1, title: "Llegada y bienvenida", body: "[INSERTAR DETALLE REAL DEL DÍA 1]" },
      { day: 2, title: "[INSERTAR TÍTULO REAL]", body: "[INSERTAR DETALLE REAL DEL DÍA 2]" },
      { day: 3, title: "[INSERTAR TÍTULO REAL]", body: "[INSERTAR DETALLE REAL DEL DÍA 3]" },
    ],
    includes: [
      "Alojamiento durante todo el recorrido",
      "Traslados internos indicados en el itinerario",
      "Acompañamiento de Pam durante el viaje",
      "[INSERTAR LISTA COMPLETA Y VERIFICADA]",
    ],
    excludes: [
      "Vuelos internacionales de ida y vuelta",
      "Seguro de viaje",
      "Gastos personales",
      "[INSERTAR LISTA COMPLETA Y VERIFICADA]",
    ],
    accommodation: "[INSERTAR DETALLE REAL DE ALOJAMIENTO]",
    faqs: [
      {
        question: "¿Necesito experiencia previa viajando en grupo?",
        answer: "No. El viaje está pensado para personas que viajan en grupo por primera vez.",
      },
      {
        question: "¿Cómo funciona la lista de espera si el viaje se agota?",
        answer:
          "Puedes anotarte en la lista de espera y te avisamos si se libera un cupo o se abre una fecha adicional.",
      },
      {
        question: "[INSERTAR PREGUNTA REAL FRECUENTE]",
        answer: "[INSERTAR RESPUESTA VERIFICADA]",
      },
    ],
  },
];

export function getTrip(slug: string): Trip | undefined {
  return TRIPS.find((t) => t.slug === slug);
}

export function getTripsByDestination(destinationSlug: string): Trip[] {
  return TRIPS.filter((t) => t.destinationSlug === destinationSlug);
}

export const STATUS_LABEL: Record<Trip["status"], string> = {
  proximo: "Próximo viaje",
  agotado: "Agotado",
  "lista-espera": "Lista de espera",
  pasado: "Viaje pasado",
};
