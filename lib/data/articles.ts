import type { Article } from "@/lib/types";

/**
 * Contenido de ejemplo (isExample: true): ilustra la plantilla editorial
 * antes de cargar artículos reales. No son publicaciones en vivo.
 */
export const ARTICLES: Article[] = [
  {
    slug: "como-armo-el-presupuesto-de-un-viaje-internacional",
    category: "viaja-mejor",
    title: "Cómo armo el presupuesto de un viaje internacional",
    excerpt:
      "El método que uso para no descubrir a mitad de viaje que el dinero no va a alcanzar.",
    datePublished: "2026-02-10",
    dateModified: "2026-02-10",
    readingMinutes: 6,
    isExample: true,
    body: [
      "Cada vez que alguien me escribe pidiendo consejo para un primer viaje internacional, la pregunta real detrás casi nunca es '¿a dónde voy?'. Es '¿cómo sé que me va a alcanzar el dinero?'.",
      "No existe una fórmula mágica, pero sí un orden: primero el transporte internacional, después el alojamiento, después todo lo demás. La mayoría de la gente lo hace al revés y por eso el presupuesto se descuadra.",
      "[INSERTAR DESGLOSE REAL DE PRESUPUESTO CON CIFRAS VERIFICADAS DE UN VIAJE CONCRETO DE PAM]",
      "Lo que sí puedo decir sin cifras: reservar con margen, tener un fondo para imprevistos y no gastar todo el presupuesto en llegar — hay que dejar espacio para lo que no se puede planear.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const bySlug = (article.relatedSlugs ?? [])
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
  if (bySlug.length >= limit) return bySlug.slice(0, limit);

  const fallback = ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug && !bySlug.includes(a)
  );
  return [...bySlug, ...fallback].slice(0, limit);
}
