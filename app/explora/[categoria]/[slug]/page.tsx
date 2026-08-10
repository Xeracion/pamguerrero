import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ExampleContentNote } from "@/components/example-content-note";
import { RelatedContent } from "@/components/related-content";
import { Cta } from "@/components/cta";
import { getCategory } from "@/lib/data/categories";
import { ARTICLES, getArticle, getRelatedArticles } from "@/lib/data/articles";

const SITE_URL = "https://www.pamguerrero.com";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ categoria: a.category, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/explora/${article.category}/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified ?? article.datePublished,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { categoria, slug } = await params;
  const article = getArticle(slug);
  const category = getCategory(categoria);
  if (!article || !category || article.category !== category.slug) notFound();

  const related = getRelatedArticles(article);
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Explora", href: "/explora" },
    { label: category.label, href: `/explora/${category.slug}` },
    { label: article.title },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: { "@id": `${SITE_URL}/#pam-guerrero`, name: "Pam Guerrero" },
    mainEntityOfPage: `${SITE_URL}/explora/${article.category}/${article.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumbs items={crumbs} />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6">
          {article.isExample && <ExampleContentNote className="mb-6" />}

          <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
            {category.label}
          </span>
          <h1 className="mt-3 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-ink-muted">
            <span>Por Pam Guerrero</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.datePublished}>
              {new Date(article.datePublished).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min de lectura</span>
          </div>

          <PhotoPlaceholder
            label={`[FOTO PRINCIPAL PARA: ${article.title}]`}
            aspect="wide"
            className="mt-8"
          />

          <div className="mt-10 flex flex-col gap-6 font-body text-lg leading-relaxed text-ink">
            {article.body.map((paragraph, i) => (
              <p key={i} className={paragraph.startsWith("[") ? "italic text-ink-muted" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <RelatedContent articles={related} />

      <Cta
        eyebrow="¿Y ahora qué?"
        title="Sigue ampliando tu mundo."
        primaryHref="/viajes"
        primaryLabel="Ver próximos viajes"
        secondaryHref="/newsletter"
        secondaryLabel="Suscríbete al newsletter"
      />
    </main>
  );
}
