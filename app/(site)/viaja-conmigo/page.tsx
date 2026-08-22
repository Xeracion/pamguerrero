import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { JourneyCard } from "@/components/journey-card";
import { getJourneys } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Viaja Conmigo",
  description:
    "Lo que he vivido, en primera persona: mis viajes, mis destinos, mis historias reales.",
  alternates: { canonical: "/viaja-conmigo" },
};

export default async function ViajaConmigoPage() {
  const journeys = await getJourneys();
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Viaja Conmigo" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Lo que he vivido"
        title="Viaja conmigo"
        description="Aquí no encontrarás guías ni consejos organizados por intención de búsqueda — eso vive en Viajes. Esto es lo que yo he vivido, contado en primera persona."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {journeys.length > 0 ? (
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {journeys.map((journey) => (
                <JourneyCard key={journey.slug} journey={journey} />
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-ink-muted">
              Todavía no he publicado ningún relato aquí. Vuelve pronto.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
