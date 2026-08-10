export type ExploreCategory =
  | "viajar-mejor"
  | "experiencias-internacionales"
  | "cultura"
  | "ampliar-tu-mundo"
  | "historias";

export interface CategoryInfo {
  slug: ExploreCategory;
  label: string;
  description: string;
}

export interface Article {
  slug: string;
  category: ExploreCategory;
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

export type TripStatus = "proximo" | "agotado" | "lista-espera" | "pasado";

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
  isExample?: boolean;
  description: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  accommodation: string;
  faqs: Faq[];
}
