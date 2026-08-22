import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { SanityImage } from "@/components/sanity-image";
import { ExampleContentNote } from "@/components/example-content-note";
import { TravelCard } from "@/components/travel-card";
import { Cta } from "@/components/cta";
import { getDestinations, getDestination, getJourneyByDestination } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({ pais: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pais: string }>;
}): Promise<Metadata> {
  const { pais } = await params;
  const destination = await getDestination(pais);
  if (!destination) return {};

  return {
    title: destination.name,
    description: destination.summary,
    alternates: { canonical: `/viajes/destinos/${destination.slug}` },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ pais: string }>;
}) {
  const { pais } = await params;
  const destination = await getDestination(pais);
  if (!destination) notFound();

  const relatedTrips = destination.relatedTrips ?? [];
  const journey = await getJourneyByDestination(destination.slug);
  const openTrip = relatedTrips.find((t) => t.status !== "cerrado");

  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Viajes", href: "/viajes" },
    { label: "Destinos", href: "/viajes/destinos" },
    { label: destination.name },
  ];

  const destinationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.summary,
    containedInPlace: destination.region,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(destinationJsonLd) }}
      />
      <Breadcrumbs items={crumbs} />

      <div className="relative">
        <SanityImage
          image={destination.mainImage}
          fallbackLabel={`[FOTO PRINCIPAL DE ${destination.name.toUpperCase()}]`}
          aspect="wide"
          className="border-none"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {destination.isExample && <ExampleContentNote className="mb-6" />}
        <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
          {destination.region}
        </span>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
          {destination.name}
        </h1>
        <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-muted">
          {destination.summary}
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {(destination.guide ?? []).map((section) => (
            <div key={section.heading} className="border-t border-line pt-6">
              <h2 className="font-display text-2xl font-medium text-ink">{section.heading}</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-ink-muted">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {journey && (
        <section className="border-t border-line bg-surface py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <SanityImage
              image={journey.mainImage}
              fallbackLabel={`[FOTO DE PAM EN ${destination.name.toUpperCase()}]`}
              aspect="portrait"
            />
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-coral-deep">
                Mi experiencia
              </p>
              <h2 className="mt-2 font-display text-2xl italic font-medium text-ink">
                {journey.title}
              </h2>
              <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink-muted">
                {journey.excerpt}
              </p>
              <a
                href={`/viaja-conmigo/${journey.slug}`}
                className="mt-4 inline-block font-body text-sm font-semibold text-accent hover:underline"
              >
                Acompáñame en el viaje →
              </a>
            </div>
          </div>
        </section>
      )}

      {relatedTrips.length > 0 && (
        <section className="border-t border-line py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-coral-deep">
              Si quieres vivirlo conmigo
            </p>
            <h2 className="mt-2 font-display text-2xl font-medium text-ink">
              Próximo viaje a {destination.name}
            </h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTrips.map((trip) => (
                <TravelCard key={trip.slug} trip={trip} />
              ))}
            </div>
            {openTrip && (
              <a
                href={`/viajes-grupales/${openTrip.slug}`}
                className="mt-8 inline-block rounded-full bg-coral px-7 py-3.5 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-px"
              >
                Ver viaje →
              </a>
            )}
          </div>
        </section>
      )}

      <Cta
        eyebrow="Sigue explorando"
        title="Descubre más destinos y todos los próximos viajes."
        primaryHref="/viajes-grupales"
        primaryLabel="Ver viajes grupales"
        secondaryHref="/viajes/destinos"
        secondaryLabel="Ver más destinos"
      />
    </main>
  );
}
