export type ViajesCategory = "viaja-mejor" | "planifica" | "descubre";

export interface CategoryInfo {
  slug: ViajesCategory;
  label: string;
  description: string;
}

export interface Article {
  slug: string;
  category: ViajesCategory;
  title: string;
  excerpt: string;
  datePublished: string;
  dateModified?: string;
  readingMinutes: number;
  isExample?: boolean;
  body: string[];
  relatedSlugs?: string[];
}

export type ExperienceTag = "Cultura" | "Experiencias internacionales" | "Ampliar tu mundo" | "Historias";

export interface Experience {
  slug: string;
  tag: ExperienceTag;
  title: string;
  excerpt: string;
  datePublished: string;
  dateModified?: string;
  readingMinutes: number;
  isExample?: boolean;
  body: string[];
  relatedSlugs?: string[];
}

export interface GuideSection {
  heading: string;
  body: string;
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  summary: string;
  isExample?: boolean;
  guide: GuideSection[];
  relatedTripSlugs: string[];
}

export interface Journey {
  slug: string;
  destinationSlug: string;
  destinationName: string;
  title: string;
  excerpt: string;
  dateISO: string;
  isExample?: boolean;
  body: string[];
}

export type TripStatus = "proximamente" | "plazas-disponibles" | "ultimas-plazas" | "cerrado";

export interface ItineraryDay {
  day: number;
  title: string;
  body: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Trip {
  slug: string;
  destinationSlug: string;
  title: string;
  dates: string;
  durationDays: number;
  price: string;
  status: TripStatus;
  /** ISO date: si faltan menos de 20 días, la etiqueta de estado se muestra en rojo. */
  closingDate?: string;
  isExample?: boolean;
  /** Frase corta en primera persona — perspectiva personal, no copy de agencia. */
  personalNote: string;
  description: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  accommodation: string;
  faqs: Faq[];
}
