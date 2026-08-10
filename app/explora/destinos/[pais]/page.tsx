import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ExampleContentNote } from "@/components/example-content-note";
import { TravelCard } from "@/components/travel-card";
import { Cta } from "@/components/cta";
import { DESTINATIONS, getDestination } from "@/lib/data/destinations";
import { getTrip } from "@/lib/data/trips";

const SITE_URL = "https://www.pamguerrero.com";

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ pais: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pais: string }>;
}): Promise<Metadata> {
  const { pais } = await params;
  const destination = getDestination(pais);
  if (!destination) return {};

  return {
    title: destination.name,
    description: destination.summary,
    alternates: { canonical: `/explora/destinos/${destination.slug}` },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ pais: string }>;
}) {
  const { pais } = await params;
  const destination = getDestination(pais);
  if (!destination) notFound();

  const relatedTrips = destination.relatedTripSlugs
    .map((slug) => getTrip(slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Explora", href: "/explora" },
    { label: "Destinos", href: "/explora/destinos" },
    { label: destination.name },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <div className="relative">
        <PhotoPlaceholder
          label={`[FOTO PRINCIPAL DE ${destination.name.toUpperCase()}]`}
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
          {destination.guide.map((section) => (
            <div key={section.heading} className="border-t border-line pt-6">
              <h2 className="font-display text-2xl font-medium text-ink">{section.heading}</h2>
              <p className="mt-3 font-body text-base leading-relaxed text-ink-muted">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {relatedTrips.length > 0 && (
        <section className="border-t border-line bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-2xl font-medium text-ink">
              Viajes grupales a {destination.name}
            </h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTrips.map((trip) => (
                <TravelCard key={trip.slug} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Cta
        eyebrow="Sigue explorando"
        title="Descubre más destinos y todos los próximos viajes."
        primaryHref="/viajes"
        primaryLabel="Ver todos los viajes"
        secondaryHref="/explora/destinos"
        secondaryLabel="Ver más destinos"
      />
    </main>
  );
}
