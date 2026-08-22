import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { ArticleCard } from "@/components/article-card";
import { getCategories, getCategory, getArticlesByCategory } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = await getCategory(categoria);
  if (!category) return {};

  return {
    title: category.label,
    description: category.description,
    alternates: { canonical: `/viajes/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = await getCategory(categoria);
  if (!category) notFound();

  const articles = await getArticlesByCategory(category.slug);
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Viajes", href: "/viajes" },
    { label: category.label },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader eyebrow="Viajes" title={category.label} description={category.description} />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {articles.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-ink-muted">
              Todavía no hay artículos publicados en esta categoría. Vuelve pronto.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
