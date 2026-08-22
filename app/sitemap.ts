import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRouteInputs: Array<Omit<MetadataRoute.Sitemap[number], "lastModified">> = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/viaja-conmigo`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/viajes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/viajes/destinos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/experiencias`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/viajes-grupales`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/sobre-pam`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/trabaja-conmigo`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/mis-imprescindibles`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/proyectos`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/proyectos/caminando`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/newsletter`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "yearly", priority: 0.4 },
  ];
  const staticRoutes: MetadataRoute.Sitemap = staticRouteInputs.map((entry) => ({
    ...entry,
    lastModified: new Date(),
  }));

  const [categories, articles, experiences, destinations, journeys, trips] = await Promise.all([
    sanityClient.fetch<{ slug: string }[]>(`*[_type == "category"]{ "slug": slug.current }`),
    sanityClient.fetch<{ slug: string; category: string; date: string }[]>(
      `*[_type == "article"]{ "slug": slug.current, "category": category->slug.current, "date": coalesce(dateModified, datePublished) }`
    ),
    sanityClient.fetch<{ slug: string; date: string }[]>(
      `*[_type == "experience"]{ "slug": slug.current, "date": coalesce(dateModified, datePublished) }`
    ),
    sanityClient.fetch<{ slug: string }[]>(`*[_type == "destination"]{ "slug": slug.current }`),
    sanityClient.fetch<{ slug: string; date: string }[]>(
      `*[_type == "journey"]{ "slug": slug.current, date }`
    ),
    sanityClient.fetch<{ slug: string }[]>(`*[_type == "trip"]{ "slug": slug.current }`),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/viajes/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/viajes/${a.category}/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((e) => ({
    url: `${SITE_URL}/experiencias/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${SITE_URL}/viajes/destinos/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const journeyRoutes: MetadataRoute.Sitemap = journeys.map((j) => ({
    url: `${SITE_URL}/viaja-conmigo/${j.slug}`,
    lastModified: new Date(j.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tripRoutes: MetadataRoute.Sitemap = trips.map((t) => ({
    url: `${SITE_URL}/viajes-grupales/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...experienceRoutes,
    ...destinationRoutes,
    ...journeyRoutes,
    ...tripRoutes,
  ];
}
