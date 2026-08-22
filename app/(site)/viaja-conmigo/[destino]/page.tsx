import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { SanityImage } from "@/components/sanity-image";
import { PortableText } from "@/components/portable-text";
import { ExampleContentNote } from "@/components/example-content-note";
import { Cta } from "@/components/cta";
import { sanityClient } from "@/lib/sanity/client";
import { getJourney, getTripsByDestination } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs: { destino: string }[] = await sanityClient.fetch(
    `*[_type == "journey"]{ "destino": slug.current }`
  );
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destino: string }>;
}): Promise<Metadata> {
  const { destino } = await params;
  const journey = await getJourney(destino);
  if (!journey) return {};

  return {
    title: journey.title,
    description: journey.excerpt,
    alternates: { canonical: `/viaja-conmigo/${journey.slug}` },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ destino: string }>;
}) {
  const { destino } = await params;
  const journey = await getJourney(destino);
  if (!journey) notFound();

  const trips = await getTripsByDestination(journey.destination.slug);
  const openTrip = trips.find((t) => t.status !== "cerrado");

  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Viaja Conmigo", href: "/viaja-conmigo" },
    { label: journey.destination.name },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: journey.title,
    description: journey.excerpt,
    datePublished: journey.date,
    author: { "@id": `${SITE_URL}/#pam-guerrero`, name: "Pam Guerrero" },
    mainEntityOfPage: `${SITE_URL}/viaja-conmigo/${journey.slug}`,
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
          {journey.isExample && <ExampleContentNote className="mb-6" />}

          <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-coral-deep">
            {journey.destination.name}
          </span>
          <h1 className="mt-3 font-display text-4xl italic font-medium leading-[1.1] text-ink sm:text-5xl">
            {journey.title}
          </h1>
          <p className="mt-5 font-body text-sm text-ink-muted">
            Por Pam Guerrero ·{" "}
            <time dateTime={journey.date}>
              {new Date(journey.date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>

          <SanityImage
            image={journey.mainImage}
            fallbackLabel={`[FOTO PRINCIPAL: ${journey.title}]`}
            aspect="wide"
            className="mt-8"
          />

          <div className="mt-10">
            <PortableText value={journey.body} />
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-surface py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-xl font-medium text-ink">
            ¿Quieres la guía práctica de {journey.destination.name}?
          </h2>
          <p className="mt-2 font-body text-sm text-ink-muted">
            Cuándo viajar, presupuesto, transporte y todo lo demás — en Viajes.
          </p>
          <a
            href={`/viajes/destinos/${journey.destination.slug}`}
            className="mt-4 inline-block font-body text-sm font-semibold text-accent hover:underline"
          >
            Ver guía de {journey.destination.name} →
          </a>
        </div>
      </section>

      {openTrip && (
        <Cta
          eyebrow="Si quieres vivirlo conmigo"
          title={`Voy a volver a ${journey.destination.name}. ¿Vienes?`}
          primaryHref={`/viajes-grupales/${openTrip.slug}`}
          primaryLabel="Ver viaje"
        />
      )}
    </main>
  );
}
