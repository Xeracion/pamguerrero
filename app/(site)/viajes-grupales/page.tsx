import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { TravelCard } from "@/components/travel-card";
import { getTrips, STATUS_LABEL } from "@/lib/sanity/queries";
import type { TripStatus } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Viajes Grupales",
  description:
    "Viajes grupales liderados por Pam Guerrero: experiencias, no paquetes. Próximas fechas, últimas plazas y convocatorias cerradas.",
  alternates: { canonical: "/viajes-grupales" },
};

const GROUP_ORDER: TripStatus[] = [
  "ultimas-plazas",
  "plazas-disponibles",
  "proximamente",
  "cerrado",
];

export default async function ViajesGrupalesPage() {
  const trips = await getTrips();
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Viajes Grupales" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Vívelo conmigo"
        title="Viajes grupales"
        description="No son paquetes: son experiencias que diseño y acompaño de principio a fin. Estas son las convocatorias abiertas ahora mismo."
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {GROUP_ORDER.map((status) => {
          const tripsForStatus = trips.filter((t) => t.status === status);
          if (tripsForStatus.length === 0) return null;

          return (
            <section key={status} className="mb-16 last:mb-0">
              <h2 className="font-display text-2xl font-medium text-ink">{STATUS_LABEL[status]}</h2>
              <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {tripsForStatus.map((trip) => (
                  <TravelCard key={trip.slug} trip={trip} />
                ))}
              </div>
            </section>
          );
        })}

        {trips.length === 0 && (
          <p className="font-body text-sm text-ink-muted">
            No hay viajes publicados por el momento. Suscríbete al newsletter para enterarte
            primero de las próximas fechas.
          </p>
        )}
      </div>
    </main>
  );
}
