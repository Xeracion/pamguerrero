import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Mis imprescindibles",
  description: "Lo que realmente uso o recomiendo para viajar — sin inventar recomendaciones.",
  alternates: { canonical: "/mis-imprescindibles" },
};

const CATEGORIES = [
  "Equipaje",
  "Apps",
  "eSIM",
  "Seguro de viaje",
  "Alojamiento",
  "Transporte",
  "Tecnología",
  "Herramientas",
];

export default function MisImprescindiblesPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Mis imprescindibles" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Recomendaciones"
        title="Mis imprescindibles"
        description="Cosas que realmente utilizo o recomiendo para viajar. Todavía no hay nada publicado aquí — no vamos a inventar recomendaciones para llenar la página."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <div key={category} className="flex flex-col gap-2 bg-surface p-8">
                <h2 className="font-display text-lg font-medium text-ink">{category}</h2>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  Próximamente
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
