import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { DestinationCard } from "@/components/destination-card";
import { DESTINATIONS } from "@/lib/data/destinations";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Destinos",
  description: "Guías de destinos que Pam Guerrero ha visitado de verdad.",
  alternates: { canonical: "/explora/destinos" },
};

export default function DestinosPage() {
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Explora", href: "/explora" },
    { label: "Destinos" },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Explora"
        title="Destinos"
        description="Cada guía nace de un viaje real: cultura, gastronomía, transporte, presupuesto y errores que no volvería a cometer."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {DESTINATIONS.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {DESTINATIONS.map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-ink-muted">
              Todavía no hay guías de destino publicadas. Vuelve pronto.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
