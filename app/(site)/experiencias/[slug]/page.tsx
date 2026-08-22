import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { SanityImage } from "@/components/sanity-image";
import { PortableText } from "@/components/portable-text";
import { ExampleContentNote } from "@/components/example-content-note";
import { RelatedExperiences } from "@/components/related-experiences";
import { TAG_COLOR } from "@/components/experience-card";
import { Cta } from "@/components/cta";
import { sanityClient } from "@/lib/sanity/client";
import { getExperience } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(
    `*[_type == "experience"]{ "slug": slug.current }`
  );
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperience(slug);
  if (!experience) return {};

  return {
    title: experience.title,
    description: experience.excerpt,
    alternates: { canonical: `/experiencias/${experience.slug}` },
    openGraph: {
      type: "article",
      title: experience.title,
      description: experience.excerpt,
      publishedTime: experience.datePublished,
      modifiedTime: experience.dateModified ?? experience.datePublished,
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperience(slug);
  if (!experience) notFound();

  const related = experience.relatedExperiences ?? [];
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Experiencias", href: "/experiencias" },
    { label: experience.title },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: experience.title,
    description: experience.excerpt,
    datePublished: experience.datePublished,
    dateModified: experience.dateModified ?? experience.datePublished,
    author: { "@id": `${SITE_URL}/#pam-guerrero`, name: "Pam Guerrero" },
    publisher: { "@id": `${SITE_URL}/#pam-guerrero`, name: "Pam Guerrero" },
    image: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
    mainEntityOfPage: `${SITE_URL}/experiencias/${experience.slug}`,
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
          {experience.isExample && <ExampleContentNote className="mb-6" />}

          <span
            className={`font-body text-xs font-semibold uppercase tracking-[0.1em] ${TAG_COLOR[experience.tag]}`}
          >
            {experience.tag}
          </span>
          <h1 className="mt-3 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            {experience.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-ink-muted">
            <span>Por Pam Guerrero</span>
            <span aria-hidden="true">·</span>
            <time dateTime={experience.datePublished}>
              {new Date(experience.datePublished).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{experience.readingMinutes} min de lectura</span>
          </div>

          <SanityImage
            image={experience.mainImage}
            fallbackLabel={`[FOTO PRINCIPAL PARA: ${experience.title}]`}
            aspect="wide"
            className="mt-8"
          />

          <div className="mt-10">
            <PortableText value={experience.body} />
          </div>
        </div>
      </article>

      <RelatedExperiences experiences={related} />

      <Cta
        eyebrow="Amplía tu mundo"
        title="Descubre por dónde seguir."
        primaryHref="/viaja-conmigo"
        primaryLabel="Viaja conmigo"
        secondaryHref="/viajes"
        secondaryLabel="Explorar viajes"
      />
    </main>
  );
}
