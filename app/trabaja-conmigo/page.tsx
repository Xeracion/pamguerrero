import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Cta } from "@/components/cta";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Trabaja Conmigo",
  description:
    "Pam Guerrero trabaja con marcas, destinos e instituciones que buscan contar historias reales de viaje y experiencias internacionales.",
  alternates: { canonical: "/trabaja-conmigo" },
};

const SECTIONS = [
  {
    title: "Colaboraciones",
    body: "Marcas, destinos, hoteles y aerolíneas que buscan una voz con audiencia real y confianza construida.",
  },
  {
    title: "Creación de contenido",
    body: "Historias en primera persona — fotografía, vídeo y texto — con la voz que ya sigue esta comunidad.",
  },
  {
    title: "Turismo y destinos",
    body: "Proyectos con oficinas de turismo e instituciones que quieren contar su territorio de forma editorial, no institucional.",
  },
  {
    title: "Proyectos",
    body: (
      <>
        Iniciativas propias más allá del contenido — como{" "}
        <a href="/proyectos/caminando" className="text-accent underline hover:no-underline">
          Caminando.lat
        </a>
        , fundada por Pam.
      </>
    ),
  },
  {
    title: "Conferencias / Formación",
    body: "Viajes, turismo, experiencias internacionales y creación de contenido, para universidades, empresas e instituciones bajo solicitud.",
  },
  {
    title: "Investigación",
    body: "Una mirada de Doctora en Turismo aplicada a proyectos, campañas y estudios reales.",
  },
];

export default function TrabajaConmigoPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Trabaja Conmigo" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Para marcas, destinos e instituciones"
        title="Trabajemos juntos."
        description="No solo publico contenido: cuento historias, viajo, investigo, lidero experiencias y conecto audiencias. Esto es lo que puedo aportar a un proyecto."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <h2 className="font-display text-xl font-medium text-ink">{item.title}</h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Trabajos anteriores</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <PhotoPlaceholder
                key={i}
                label="[INSERTAR COLABORACIÓN REAL: marca, destino o institución]"
                aspect="square"
              />
            ))}
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Hablemos"
        title="¿Tienes un proyecto en mente?"
        description="Cuéntame de qué se trata y qué buscas conseguir."
        primaryHref="/contacto"
        primaryLabel="Trabajemos juntos"
      />
    </main>
  );
}
