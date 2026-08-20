import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ExampleContentNote } from "@/components/example-content-note";
import { Cta } from "@/components/cta";
import { JOURNEYS, getJourney } from "@/lib/data/journeys";
import { getDestination } from "@/lib/data/destinations";
import { getTripsByDestination } from "@/lib/data/trips";

const SITE_URL = "https://www.pamguerrero.com";

export function generateStaticParams() {
  return JOURNEYS.map((j) => ({ destino: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destino: string }>;
}): Promise<Metadata> {
  const { destino } = await params;
  const journey = getJourney(destino);
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
  const journey = getJourney(destino);
  if (!journey) notFound();

  const destination = getDestination(journey.destinationSlug);
  const trips = getTripsByDestination(journey.destinationSlug);
  const openTrip = trips.find((t) => t.status !== "cerrado");

  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Viaja Conmigo", href: "/viaja-conmigo" },
    { label: journey.destinationName },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: journey.title,
    description: journey.excerpt,
    datePublished: journey.dateISO,
    author: { "@id": `${SITE_URL}/#pam-guerrero`, name: "Pam Guerrero" },
    mainEntityOfPage: `${SITE_URL}/viaja-conmigo/${journey.slug}`,
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
          {journey.isExample && <ExampleContentNote className="mb-6" />}

          <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-coral-deep">
            {journey.destinationName}
          </span>
          <h1 className="mt-3 font-display text-4xl italic font-medium leading-[1.1] text-ink sm:text-5xl">
            {journey.title}
          </h1>
          <p className="mt-5 font-body text-sm text-ink-muted">
            Por Pam Guerrero ·{" "}
            <time dateTime={journey.dateISO}>
              {new Date(journey.dateISO).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>

          <PhotoPlaceholder
            label={`[FOTO PRINCIPAL: ${journey.title}]`}
            aspect="wide"
            className="mt-8"
          />

          <div className="mt-10 flex flex-col gap-6 font-body text-lg leading-relaxed text-ink">
            {journey.body.map((paragraph, i) => (
              <p key={i} className={paragraph.startsWith("[") ? "italic text-ink-muted" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {destination && (
        <section className="border-t border-line bg-surface py-16">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-xl font-medium text-ink">
              ¿Quieres la guía práctica de {destination.name}?
            </h2>
            <p className="mt-2 font-body text-sm text-ink-muted">
              Cuándo viajar, presupuesto, transporte y todo lo demás — en Viajes.
            </p>
            <a
              href={`/viajes/destinos/${destination.slug}`}
              className="mt-4 inline-block font-body text-sm font-semibold text-accent hover:underline"
            >
              Ver guía de {destination.name} →
            </a>
          </div>
        </section>
      )}

      {openTrip && (
        <Cta
          eyebrow="Si quieres vivirlo conmigo"
          title={`Voy a volver a ${journey.destinationName}. ¿Vienes?`}
          primaryHref={`/viajes-grupales/${openTrip.slug}`}
          primaryLabel="Ver viaje"
        />
      )}
    </main>
  );
}
