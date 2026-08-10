import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/data/categories";
import { ARTICLES } from "@/lib/data/articles";
import { DESTINATIONS } from "@/lib/data/destinations";
import { TRIPS } from "@/lib/data/trips";

const SITE_URL = "https://www.pamguerrero.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRouteInputs: Array<Omit<MetadataRoute.Sitemap[number], "lastModified">> = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/sobre-pam`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/viajes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/explora`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/explora/destinos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/proyectos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/proyectos/caminando`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/colabora`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/newsletter`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "yearly", priority: 0.4 },
  ];
  const staticRoutes: MetadataRoute.Sitemap = staticRouteInputs.map((entry) => ({
    ...entry,
    lastModified: new Date(),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/explora/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}/explora/${a.category}/${a.slug}`,
    lastModified: new Date(a.dateModified ?? a.datePublished),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = DESTINATIONS.map((d) => ({
    url: `${SITE_URL}/explora/destinos/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tripRoutes: MetadataRoute.Sitemap = TRIPS.map((t) => ({
    url: `${SITE_URL}/viajes/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...destinationRoutes,
    ...tripRoutes,
  ];
}
