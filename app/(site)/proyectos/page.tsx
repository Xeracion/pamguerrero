import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Los proyectos que Pam Guerrero ha fundado y construido más allá del contenido.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Proyectos" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader
        eyebrow="Más allá del contenido"
        title="Proyectos"
        description="Cosas que he construido para que las oportunidades sean más fáciles de encontrar, no solo más fáciles de soñar."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/proyectos/caminando"
            className="group grid gap-8 rounded-2xl border border-line bg-surface p-8 transition-colors hover:bg-cream lg:grid-cols-[1fr_1.3fr] lg:items-center"
          >
            <PhotoPlaceholder
              label="[REEMPLAZAR CON IMAGEN REAL DE CAMINANDO.LAT]"
              aspect="landscape"
            />
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                Fundadora
              </p>
              <h2 className="mt-2 font-display text-2xl font-medium text-ink group-hover:underline">
                Caminando.lat
              </h2>
              <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-ink-muted">
                Becas, trabajo y rutas de migración para latinoamericanos.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
