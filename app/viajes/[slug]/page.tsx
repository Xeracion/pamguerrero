import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ExampleContentNote } from "@/components/example-content-note";
import { FaqAccordion, faqJsonLd } from "@/components/faq-accordion";
import { STATUS_LABEL, TRIPS, getTrip } from "@/lib/data/trips";
import { getDestination } from "@/lib/data/destinations";

const SITE_URL = "https://www.pamguerrero.com";

export function generateStaticParams() {
  return TRIPS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};

  return {
    title: trip.title,
    description: trip.description,
    alternates: { canonical: `/viajes/${trip.slug}` },
  };
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const destination = getDestination(trip.destinationSlug);
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Viajes", href: "/viajes" },
    { label: trip.title },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(trip.faqs)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PhotoPlaceholder
        label={`[FOTO PRINCIPAL DEL VIAJE: ${trip.title}]`}
        aspect="wide"
        className="border-none"
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {trip.isExample && <ExampleContentNote className="mb-6" />}

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
              {STATUS_LABEL[trip.status]}
              {destination && ` · ${destination.name}`}
            </span>
            <h1 className="mt-3 font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
              {trip.title}
            </h1>
            <p className="mt-5 font-body text-lg leading-relaxed text-ink-muted">
              {trip.description}
            </p>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-ink">Itinerario</h2>
              <ol className="mt-6 flex flex-col gap-6 border-l border-line pl-6">
                {trip.itinerary.map((day) => (
                  <li key={day.day} className="relative">
                    <span className="absolute -left-[1.9rem] top-1 h-2.5 w-2.5 rounded-full bg-gold" />
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                      Día {day.day}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-medium text-ink">{day.title}</h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">
                      {day.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-xl font-medium text-ink">Incluye</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {trip.includes.map((item) => (
                    <li key={item} className="font-body text-sm text-ink-muted">
                      + {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-ink">No incluye</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {trip.excludes.map((item) => (
                    <li key={item} className="font-body text-sm text-ink-muted">
                      − {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-xl font-medium text-ink">Alojamiento</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                {trip.accommodation}
              </p>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-xl font-medium text-ink">Preguntas frecuentes</h2>
              <div className="mt-4">
                <FaqAccordion faqs={trip.faqs} />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-xl font-medium text-ink">Testimonios</h2>
              <p className="mt-3 font-body text-sm italic text-ink-muted">
                [INSERTAR TESTIMONIO REAL DE UNA PERSONA QUE VIAJÓ CON PAM]
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-surface p-8 lg:sticky lg:top-28">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
              Fechas
            </p>
            <p className="mt-1 font-body text-base text-ink">{trip.dates}</p>

            <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
              Duración
            </p>
            <p className="mt-1 font-body text-base text-ink">{trip.durationDays} días</p>

            <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
              Precio
            </p>
            <p className="mt-1 font-display text-2xl font-medium text-accent">{trip.price}</p>

            <a
              href="/contacto"
              className="mt-8 block w-full rounded-full bg-accent px-6 py-3.5 text-center font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-px"
            >
              {trip.status === "agotado" ? "Unirme a la lista de espera" : "Reservar mi plaza"}
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}
