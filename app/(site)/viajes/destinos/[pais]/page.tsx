import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { SanityImage } from "@/components/sanity-image";
import { ExampleContentNote } from "@/components/example-content-note";
import { RouteLine } from "@/components/route-line";
import { TravelCard } from "@/components/travel-card";
import { Cta } from "@/components/cta";
import { getDestinations, getDestination, getJourneyByDestination } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

/**
 * Cada destino recibe su propio tratamiento cromático — determinado por el
 * slug, no elegido a mano, para que la plantilla siga funcionando igual de
 * bien con el próximo destino que se publique en Sanity.
 */
const CHAPTER_TONES = [
  { bg: "bg-burgundy", border: "border-burgundy", text: "text-white", route: "text-white/15", tag: "bg-sun text-ink" },
  { bg: "bg-cobalt", border: "border-cobalt", text: "text-white", route: "text-white/15", tag: "bg-coral text-ink" },
  { bg: "bg-turquoise", border: "border-turquoise", text: "text-ink", route: "text-ink/15", tag: "bg-burgundy text-white" },
  { bg: "bg-tangerine", border: "border-tangerine", text: "text-ink", route: "text-ink/15", tag: "bg-white text-ink" },
] as const;

function chapterTone(slug: string) {
  const hash = slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return CHAPTER_TONES[hash % CHAPTER_TONES.length];
}

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
  const tone = chapterTone(destination.slug);

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

      {/* PORTADA — fotografía gigante con el título superpuesto */}
      <div className="relative min-h-[70vh]">
        <SanityImage
          image={destination.mainImage}
          fallbackLabel={`[FOTO PRINCIPAL DE ${destination.name.toUpperCase()} — a pantalla completa]`}
          aspect="square"
          className="absolute inset-0 h-full w-full border-none"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(13,18,32,0.85) 0%, rgba(13,18,32,0.05) 55%)",
          }}
        />
        <div className="relative flex min-h-[70vh] flex-col justify-end px-6 py-14 sm:px-10">
          {destination.isExample && <ExampleContentNote className="mb-6 w-fit" />}
          <h1 className="max-w-3xl font-display text-6xl font-medium leading-[0.95] text-white sm:text-7xl lg:text-8xl">
            {destination.name}
          </h1>
        </div>
      </div>

      {/* CAPÍTULO — franja de color propia del destino */}
      <section className={`relative overflow-hidden ${tone.bg} py-14`}>
        <RouteLine variant="arc" className={`pointer-events-none absolute -right-8 top-2 h-16 w-[35%] ${tone.route}`} />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className={`inline-block rounded-full px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.1em] ${tone.tag}`}>
              {destination.region}
            </span>
            <p className={`mt-3 max-w-xl font-body text-lg leading-relaxed ${tone.text}`}>
              {destination.summary}
            </p>
          </div>
        </div>
      </section>

      {/* GUÍA — pequeños datos editoriales */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {(destination.guide ?? []).map((section) => (
            <div key={section.heading} className={`border-t-2 pt-6 ${tone.border}`}>
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
