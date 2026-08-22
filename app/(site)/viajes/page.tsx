import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { ArticleCard } from "@/components/article-card";
import { DestinationCard } from "@/components/destination-card";
import { getCategories, getArticles, getDestinations } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Viajes",
  description:
    "Todo lo que necesitas para descubrir el mundo: destinos, guías, consejos y experiencias para ayudarte a viajar mejor.",
  alternates: { canonical: "/viajes" },
};

export default async function ViajesPage() {
  const [categories, articles, destinations] = await Promise.all([
    getCategories(),
    getArticles(),
    getDestinations(),
  ]);
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Viajes" }];
  const latestArticles = articles.slice(0, 3);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Lo que sé"
        title="Viajes"
        description="Todo lo que necesitas para descubrir el mundo: destinos, guías, consejos y experiencias para ayudarte a viajar mejor."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Destinos</h2>
          <p className="mt-2 max-w-lg font-body text-sm text-ink-muted">
            Guías de lugares que he visitado de verdad — no listas genéricas.
          </p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
          <Link
            href="/viajes/destinos"
            className="mt-8 inline-block font-body text-sm font-semibold text-accent hover:underline"
          >
            Ver todos los destinos →
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Categorías</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/viajes/${category.slug}`}
                className="group flex flex-col gap-2 bg-paper p-8 transition-colors hover:bg-line"
              >
                <h3 className="font-display text-xl font-medium text-ink group-hover:text-accent">
                  {category.label}
                </h3>
                <p className="font-body text-sm leading-relaxed text-ink-muted">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Lo más buscado</h2>
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
