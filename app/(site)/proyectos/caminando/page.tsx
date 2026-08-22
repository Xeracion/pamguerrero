import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Caminando.lat",
  description:
    "Caminando.lat es la plataforma editorial de oportunidades internacionales fundada por Pam Guerrero: becas, trabajo y rutas de migración para latinoamericanos.",
  alternates: { canonical: "/proyectos/caminando" },
};

const PILLARS = [
  {
    title: "Becas",
    body: "Oportunidades de estudio y movilidad académica internacional.",
  },
  {
    title: "Trabajo",
    body: "Ofertas y rutas de empleo internacional para perfiles latinoamericanos.",
  },
  {
    title: "Migración",
    body: "Información práctica sobre rutas y procesos de movilidad internacional.",
  },
];

export default function CaminandoProjectPage() {
  const crumbs = [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Caminando.lat" },
  ];

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Caminando.lat",
    url: "https://caminando.lat",
    founder: { "@id": `${SITE_URL}/#pam-guerrero`, name: "Pam Guerrero" },
    description:
      "Plataforma editorial de oportunidades internacionales para latinoamericanos: becas, trabajo y rutas de migración.",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Breadcrumbs items={crumbs} />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Un proyecto fundado por Pam Guerrero
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
          Caminando.lat
        </h1>
        <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-muted">
          Las mismas oportunidades internacionales que me cambiaron la vida, organizadas para
          que sean más fáciles de encontrar: becas, trabajo y rutas de migración para
          latinoamericanos.
        </p>

        <PhotoPlaceholder
          label="[REEMPLAZAR CON IMAGEN REAL DE CAMINANDO.LAT]"
          aspect="wide"
          className="mt-12"
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="border-t border-line pt-5">
              <h2 className="font-display text-xl font-medium text-ink">{pillar.title}</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-body text-sm leading-relaxed text-ink-muted">
            Caminando.lat es un sitio independiente. El contenido y las oportunidades listadas
            viven allí, no aquí.
          </p>
          <a
            href="https://caminando.lat"
            className="whitespace-nowrap rounded-full bg-ink px-7 py-3.5 text-center font-body text-sm font-semibold text-white transition-transform hover:-translate-y-px"
          >
            Descubre Caminando.lat
          </a>
        </div>
      </div>
    </main>
  );
}
