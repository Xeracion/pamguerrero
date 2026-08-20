import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { ExperienceCard } from "@/components/experience-card";
import { EXPERIENCES } from "@/lib/data/experiences";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Experiencias internacionales, cultura, aprendizaje e historias para mirar más allá de lo conocido. Viajar para ampliar tu mundo.",
  alternates: { canonical: "/experiencias" },
};

export default function ExperienciasPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Experiencias" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Lo que quiero transmitir"
        title="Experiencias"
        description="Esto no es turismo — es cultura, aprendizaje y transformación. Historias sobre lo que significa ampliar tu mundo, más allá de la lista de sitios que hay que visitar."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {EXPERIENCES.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {EXPERIENCES.map((experience) => (
                <ExperienceCard key={experience.slug} experience={experience} />
              ))}
            </div>
          ) : (
            <p className="font-body text-sm text-ink-muted">
              Todavía no hay publicaciones aquí. Vuelve pronto.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
