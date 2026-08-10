import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { ArticleCard } from "@/components/article-card";
import { DestinationCard } from "@/components/destination-card";
import { CATEGORIES } from "@/lib/data/categories";
import { ARTICLES } from "@/lib/data/articles";
import { DESTINATIONS } from "@/lib/data/destinations";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Explora",
  description:
    "El Knowledge Hub de Pam Guerrero: destinos, viajar mejor, experiencias internacionales, cultura e historias reales.",
  alternates: { canonical: "/explora" },
};

export default function ExploraPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Explora" }];
  const latestArticles = [...ARTICLES]
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, 3);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Knowledge Hub"
        title="Explora"
        description="Destinos, cultura, oportunidades y lo que voy aprendiendo por el camino. Organizado para que encuentres lo que necesitas, no para que te pierdas en él."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Destinos</h2>
          <p className="mt-2 max-w-lg font-body text-sm text-ink-muted">
            Guías de lugares que he visitado de verdad — no listas genéricas.
          </p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
          <Link
            href="/explora/destinos"
            className="mt-8 inline-block font-body text-sm font-semibold text-accent hover:underline"
          >
            Ver todos los destinos →
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Categorías</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {CATEGORIES.map((category, i) => {
              const isLastOdd = CATEGORIES.length % 2 === 1 && i === CATEGORIES.length - 1;
              return (
                <Link
                  key={category.slug}
                  href={`/explora/${category.slug}`}
                  className={`group flex flex-col gap-2 bg-paper p-8 transition-colors hover:bg-cream ${isLastOdd ? "sm:col-span-2" : ""}`}
                >
                  <h3 className="font-display text-xl font-medium text-ink group-hover:text-accent">
                    {category.label}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-ink-muted">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Últimos artículos</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
