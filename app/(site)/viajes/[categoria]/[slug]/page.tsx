import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { SanityImage } from "@/components/sanity-image";
import { PortableText } from "@/components/portable-text";
import { ExampleContentNote } from "@/components/example-content-note";
import { RelatedContent } from "@/components/related-content";
import { Cta } from "@/components/cta";
import { sanityClient } from "@/lib/sanity/client";
import { getArticle } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export async function generateStaticParams() {
  const pairs: { categoria: string; slug: string }[] = await sanityClient.fetch(
    `*[_type == "article"]{ "categoria": category->slug.current, "slug": slug.current }`
  );
  return pairs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/viajes/${article.category.slug}/${article.slug}` },
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
  const article = await getArticle(slug);
  if (!article || article.category.slug !== categoria) notFound();

  const related = article.relatedArticles ?? [];
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Viajes", href: "/viajes" },
    { label: article.category.label, href: `/viajes/${article.category.slug}` },
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
    publisher: { "@id": `${SITE_URL}/#pam-guerrero`, name: "Pam Guerrero" },
    image: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
    mainEntityOfPage: `${SITE_URL}/viajes/${article.category.slug}/${article.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd) }}
      />
      <Breadcrumbs items={crumbs} />

      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6">
          {article.isExample && <ExampleContentNote className="mb-6" />}

          <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
            {article.category.label}
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

          <SanityImage
            image={article.mainImage}
            fallbackLabel={`[FOTO PRINCIPAL PARA: ${article.title}]`}
            aspect="wide"
            className="mt-8"
          />

          <div className="mt-10">
            <PortableText value={article.body} />
          </div>
        </div>
      </article>

      <RelatedContent articles={related} />

      <Cta
        eyebrow="¿Quieres viajar conmigo?"
        title="Descubre los próximos viajes grupales."
        primaryHref="/viajes-grupales"
        primaryLabel="Ver viajes grupales"
        secondaryHref="/newsletter"
        secondaryLabel="Suscríbete al newsletter"
      />
    </main>
  );
}
