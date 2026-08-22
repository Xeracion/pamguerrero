import type { PortableTextBlock } from "next-sanity";
import { sanityClient } from "./client";

export interface SanityImageRef {
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
}

export interface CategoryDoc {
  slug: string;
  label: string;
  description: string;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryDoc;
  mainImage?: SanityImageRef;
  readingMinutes: number;
  isExample?: boolean;
}

export interface ArticleDoc extends ArticleSummary {
  body: PortableTextBlock[];
  datePublished: string;
  dateModified?: string;
  relatedArticles?: ArticleSummary[];
}

export type ExperienceTag = "Cultura" | "Experiencias internacionales" | "Ampliar tu mundo" | "Historias";

export interface ExperienceSummary {
  slug: string;
  title: string;
  excerpt: string;
  tag: ExperienceTag;
  mainImage?: SanityImageRef;
  readingMinutes: number;
  isExample?: boolean;
}

export interface ExperienceDoc extends ExperienceSummary {
  body: PortableTextBlock[];
  datePublished: string;
  dateModified?: string;
  relatedExperiences?: ExperienceSummary[];
}

export interface GuideSection {
  heading: string;
  body: string;
}

export interface DestinationSummary {
  slug: string;
  name: string;
  region: string;
  summary: string;
  mainImage?: SanityImageRef;
  isExample?: boolean;
}

export interface DestinationDoc extends DestinationSummary {
  guide: GuideSection[];
  relatedTrips: TripSummary[];
}

export interface JourneyDoc {
  slug: string;
  title: string;
  excerpt: string;
  mainImage?: SanityImageRef;
  body: PortableTextBlock[];
  date: string;
  isExample?: boolean;
  destination: { slug: string; name: string };
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

export interface TripSummary {
  slug: string;
  title: string;
  personalNote: string;
  dates: string;
  durationDays: number;
  status: TripStatus;
  closingDate?: string;
  mainImage?: SanityImageRef;
  isExample?: boolean;
}

export interface TripDoc extends TripSummary {
  description: string;
  price: string;
  accommodation?: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  faqs: Faq[];
  destination: { slug: string; name: string };
}

const CATEGORY_PROJECTION = `{ "slug": slug.current, "label": title, description }`;
const IMAGE_PROJECTION = `{ asset, alt }`;
const TRIP_SUMMARY_PROJECTION = `{
  "slug": slug.current,
  title,
  personalNote,
  dates,
  durationDays,
  status,
  closingDate,
  mainImage ${IMAGE_PROJECTION},
  isExample
}`;
const DESTINATION_REF_PROJECTION = `destination->{ "slug": slug.current, name }`;

export async function getCategories(): Promise<CategoryDoc[]> {
  return sanityClient.fetch(`*[_type == "category"] | order(title asc) ${CATEGORY_PROJECTION}`);
}

export async function getCategory(slug: string): Promise<CategoryDoc | null> {
  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0] ${CATEGORY_PROJECTION}`,
    { slug }
  );
}

export async function getArticles(): Promise<ArticleSummary[]> {
  return sanityClient.fetch(
    `*[_type == "article"] | order(datePublished desc) {
      "slug": slug.current, title, excerpt, readingMinutes, isExample,
      mainImage ${IMAGE_PROJECTION},
      category-> ${CATEGORY_PROJECTION}
    }`
  );
}

export async function getArticlesByCategory(categorySlug: string): Promise<ArticleSummary[]> {
  return sanityClient.fetch(
    `*[_type == "article" && category->slug.current == $categorySlug] | order(datePublished desc) {
      "slug": slug.current, title, excerpt, readingMinutes, isExample,
      mainImage ${IMAGE_PROJECTION},
      category-> ${CATEGORY_PROJECTION}
    }`,
    { categorySlug }
  );
}

export async function getArticle(slug: string): Promise<ArticleDoc | null> {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      "slug": slug.current, title, excerpt, readingMinutes, isExample, body,
      datePublished, dateModified,
      mainImage ${IMAGE_PROJECTION},
      category-> ${CATEGORY_PROJECTION},
      "relatedArticles": relatedArticles[]-> {
        "slug": slug.current, title, excerpt, readingMinutes, isExample,
        mainImage ${IMAGE_PROJECTION},
        category-> ${CATEGORY_PROJECTION}
      }
    }`,
    { slug }
  );
}

export async function getExperiences(): Promise<ExperienceSummary[]> {
  return sanityClient.fetch(
    `*[_type == "experience"] | order(datePublished desc) {
      "slug": slug.current, title, excerpt, tag, readingMinutes, isExample,
      mainImage ${IMAGE_PROJECTION}
    }`
  );
}

export async function getExperience(slug: string): Promise<ExperienceDoc | null> {
  return sanityClient.fetch(
    `*[_type == "experience" && slug.current == $slug][0] {
      "slug": slug.current, title, excerpt, tag, readingMinutes, isExample, body,
      datePublished, dateModified,
      mainImage ${IMAGE_PROJECTION},
      "relatedExperiences": relatedExperiences[]-> {
        "slug": slug.current, title, excerpt, tag, readingMinutes, isExample,
        mainImage ${IMAGE_PROJECTION}
      }
    }`,
    { slug }
  );
}

export async function getDestinations(): Promise<DestinationSummary[]> {
  return sanityClient.fetch(
    `*[_type == "destination"] | order(name asc) {
      "slug": slug.current, name, region, summary, isExample,
      mainImage ${IMAGE_PROJECTION}
    }`
  );
}

export async function getDestination(slug: string): Promise<DestinationDoc | null> {
  return sanityClient.fetch(
    `*[_type == "destination" && slug.current == $slug][0] {
      "slug": slug.current, name, region, summary, isExample, guide,
      mainImage ${IMAGE_PROJECTION},
      "relatedTrips": relatedTrips[]-> ${TRIP_SUMMARY_PROJECTION}
    }`,
    { slug }
  );
}

export async function getJourneys(): Promise<JourneyDoc[]> {
  return sanityClient.fetch(
    `*[_type == "journey"] | order(date desc) {
      "slug": slug.current, title, excerpt, date, isExample, body,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`
  );
}

export async function getJourney(slug: string): Promise<JourneyDoc | null> {
  return sanityClient.fetch(
    `*[_type == "journey" && slug.current == $slug][0] {
      "slug": slug.current, title, excerpt, date, isExample, body,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`,
    { slug }
  );
}

export async function getJourneyByDestination(destinationSlug: string): Promise<JourneyDoc | null> {
  return sanityClient.fetch(
    `*[_type == "journey" && destination->slug.current == $destinationSlug][0] {
      "slug": slug.current, title, excerpt, date, isExample, body,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`,
    { destinationSlug }
  );
}

export async function getTrips(): Promise<TripSummary[]> {
  return sanityClient.fetch(`*[_type == "trip"] | order(closingDate asc) ${TRIP_SUMMARY_PROJECTION}`);
}

export async function getTrip(slug: string): Promise<TripDoc | null> {
  return sanityClient.fetch(
    `*[_type == "trip" && slug.current == $slug][0] {
      "slug": slug.current, title, personalNote, dates, durationDays, status, closingDate,
      isExample, description, price, accommodation, itinerary, includes, excludes, faqs,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`,
    { slug }
  );
}

export async function getTripsByDestination(destinationSlug: string): Promise<TripSummary[]> {
  return sanityClient.fetch(
    `*[_type == "trip" && destination->slug.current == $destinationSlug] | order(closingDate asc) ${TRIP_SUMMARY_PROJECTION}`,
    { destinationSlug }
  );
}

const URGENCY_DAYS = 20;

export function isClosingSoon(trip: Pick<TripSummary, "closingDate" | "status">): boolean {
  if (!trip.closingDate || trip.status === "cerrado") return false;
  const daysLeft = Math.ceil(
    (new Date(trip.closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return daysLeft >= 0 && daysLeft < URGENCY_DAYS;
}

export const STATUS_LABEL: Record<TripStatus, string> = {
  proximamente: "Próximamente",
  "plazas-disponibles": "Plazas disponibles",
  "ultimas-plazas": "Últimas plazas",
  cerrado: "Cerrado",
};
