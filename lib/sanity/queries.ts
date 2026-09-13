import type { PortableTextBlock } from "next-sanity";
import { sanityFetch } from "./live";

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
  const { data } = await sanityFetch({
    query: `*[_type == "category"] | order(title asc) ${CATEGORY_PROJECTION}`,
  });
  return data as CategoryDoc[];
}

export async function getCategory(slug: string): Promise<CategoryDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "category" && slug.current == $slug][0] ${CATEGORY_PROJECTION}`,
    params: { slug },
  });
  return data as CategoryDoc | null;
}

export async function getArticles(): Promise<ArticleSummary[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "article"] | order(datePublished desc) {
      "slug": slug.current, title, excerpt, readingMinutes, isExample,
      mainImage ${IMAGE_PROJECTION},
      category-> ${CATEGORY_PROJECTION}
    }`,
  });
  return data as ArticleSummary[];
}

export async function getArticlesByCategory(categorySlug: string): Promise<ArticleSummary[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "article" && category->slug.current == $categorySlug] | order(datePublished desc) {
      "slug": slug.current, title, excerpt, readingMinutes, isExample,
      mainImage ${IMAGE_PROJECTION},
      category-> ${CATEGORY_PROJECTION}
    }`,
    params: { categorySlug },
  });
  return data as ArticleSummary[];
}

export async function getArticle(slug: string): Promise<ArticleDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "article" && slug.current == $slug][0] {
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
    params: { slug },
  });
  return data as ArticleDoc | null;
}

export async function getExperiences(): Promise<ExperienceSummary[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "experience"] | order(datePublished desc) {
      "slug": slug.current, title, excerpt, tag, readingMinutes, isExample,
      mainImage ${IMAGE_PROJECTION}
    }`,
  });
  return data as ExperienceSummary[];
}

export async function getExperience(slug: string): Promise<ExperienceDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "experience" && slug.current == $slug][0] {
      "slug": slug.current, title, excerpt, tag, readingMinutes, isExample, body,
      datePublished, dateModified,
      mainImage ${IMAGE_PROJECTION},
      "relatedExperiences": relatedExperiences[]-> {
        "slug": slug.current, title, excerpt, tag, readingMinutes, isExample,
        mainImage ${IMAGE_PROJECTION}
      }
    }`,
    params: { slug },
  });
  return data as ExperienceDoc | null;
}

export async function getDestinations(): Promise<DestinationSummary[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "destination"] | order(name asc) {
      "slug": slug.current, name, region, summary, isExample,
      mainImage ${IMAGE_PROJECTION}
    }`,
  });
  return data as DestinationSummary[];
}

export async function getDestination(slug: string): Promise<DestinationDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "destination" && slug.current == $slug][0] {
      "slug": slug.current, name, region, summary, isExample, guide,
      mainImage ${IMAGE_PROJECTION},
      "relatedTrips": relatedTrips[]-> ${TRIP_SUMMARY_PROJECTION}
    }`,
    params: { slug },
  });
  return data as DestinationDoc | null;
}

export async function getJourneys(): Promise<JourneyDoc[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "journey"] | order(date desc) {
      "slug": slug.current, title, excerpt, date, isExample, body,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`,
  });
  return data as JourneyDoc[];
}

export async function getJourney(slug: string): Promise<JourneyDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "journey" && slug.current == $slug][0] {
      "slug": slug.current, title, excerpt, date, isExample, body,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`,
    params: { slug },
  });
  return data as JourneyDoc | null;
}

export async function getJourneyByDestination(destinationSlug: string): Promise<JourneyDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "journey" && destination->slug.current == $destinationSlug][0] {
      "slug": slug.current, title, excerpt, date, isExample, body,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`,
    params: { destinationSlug },
  });
  return data as JourneyDoc | null;
}

export async function getTrips(): Promise<TripSummary[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "trip"] | order(closingDate asc) ${TRIP_SUMMARY_PROJECTION}`,
  });
  return data as TripSummary[];
}

export async function getTrip(slug: string): Promise<TripDoc | null> {
  const { data } = await sanityFetch({
    query: `*[_type == "trip" && slug.current == $slug][0] {
      "slug": slug.current, title, personalNote, dates, durationDays, status, closingDate,
      isExample, description, price, accommodation, itinerary, includes, excludes, faqs,
      mainImage ${IMAGE_PROJECTION},
      ${DESTINATION_REF_PROJECTION}
    }`,
    params: { slug },
  });
  return data as TripDoc | null;
}

export async function getTripsByDestination(destinationSlug: string): Promise<TripSummary[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "trip" && destination->slug.current == $destinationSlug] | order(closingDate asc) ${TRIP_SUMMARY_PROJECTION}`,
    params: { destinationSlug },
  });
  return data as TripSummary[];
}

export interface PageHeaderSettings {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export interface PhotoCaption {
  image?: SanityImageRef;
  caption: string;
}

export interface SiteSettings {
  heroImage?: SanityImageRef;
  sobrePamIntroImage?: SanityImageRef;
  sobrePamIntroImageSecondary?: SanityImageRef;
  sobrePamExperienceImage?: SanityImageRef;

  heroEyebrow?: string;
  heroHeadlineLine1?: string;
  heroHeadlineLine2?: string;
  heroHeadlineLine3?: string;
  heroSubheadline?: string;
  heroCtaPrimaryLabel?: string;
  heroCtaSecondaryLabel?: string;
  heroStatNumber?: string;
  heroStatLabel?: string;

  trajectoryMilestones?: string[];

  storyEyebrow?: string;
  storyHeadline?: string;
  storyBody?: string;
  storyLinkLabel?: string;

  collabEyebrow?: string;
  collabHeadline?: string;
  collabBody?: string;
  collabCtaLabel?: string;

  homeNewsletterHeadline?: string;
  homeNewsletterBody?: string;
  homeNewsletterButtonLabel?: string;

  sobrePamIntroQuote?: string;
  sobrePamIntroBody?: string;
  sobrePamExperienceEyebrow?: string;
  sobrePamExperienceBody1?: string;
  sobrePamExperienceBody2?: string;
  sobrePamMomentsHeading?: string;
  sobrePamMoments?: PhotoCaption[];
  sobrePamExpertiseHeading?: string;
  sobrePamExpertiseItems?: string[];

  viajesGrupalesHeader?: PageHeaderSettings;
  misImprescindiblesHeader?: PageHeaderSettings;
  viajaConmigoHeader?: PageHeaderSettings;
  proyectosHeader?: PageHeaderSettings;
  sobrePamHeader?: PageHeaderSettings;
  trabajaConmigoHeader?: PageHeaderSettings;
  viajesHeader?: PageHeaderSettings;
  destinosHeader?: PageHeaderSettings;
  experienciasHeader?: PageHeaderSettings;
  newsletterHeader?: PageHeaderSettings;
  contactoHeader?: PageHeaderSettings;

  footerTagline?: string;
}

/** El documento "Ajustes del sitio" es un singleton con este id fijo — ver sanity/structure.ts. */
export const SITE_SETTINGS_ID = "siteSettings";

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await sanityFetch({
    query: `*[_type == "siteSettings" && _id == $id][0] {
      heroImage ${IMAGE_PROJECTION},
      sobrePamIntroImage ${IMAGE_PROJECTION},
      sobrePamIntroImageSecondary ${IMAGE_PROJECTION},
      sobrePamExperienceImage ${IMAGE_PROJECTION},

      heroEyebrow, heroHeadlineLine1, heroHeadlineLine2, heroHeadlineLine3, heroSubheadline,
      heroCtaPrimaryLabel, heroCtaSecondaryLabel, heroStatNumber, heroStatLabel,

      trajectoryMilestones,

      storyEyebrow, storyHeadline, storyBody, storyLinkLabel,

      collabEyebrow, collabHeadline, collabBody, collabCtaLabel,

      homeNewsletterHeadline, homeNewsletterBody, homeNewsletterButtonLabel,

      sobrePamIntroQuote, sobrePamIntroBody,
      sobrePamExperienceEyebrow, sobrePamExperienceBody1, sobrePamExperienceBody2,
      sobrePamMomentsHeading,
      "sobrePamMoments": sobrePamMoments[] { "image": image ${IMAGE_PROJECTION}, caption },
      sobrePamExpertiseHeading, sobrePamExpertiseItems,

      viajesGrupalesHeader, misImprescindiblesHeader, viajaConmigoHeader, proyectosHeader,
      sobrePamHeader, trabajaConmigoHeader, viajesHeader, destinosHeader, experienciasHeader,
      newsletterHeader, contactoHeader,

      footerTagline
    }`,
    params: { id: SITE_SETTINGS_ID },
  });
  return (data as SiteSettings | null) ?? {};
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
