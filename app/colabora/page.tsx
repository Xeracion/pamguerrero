import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Cta } from "@/components/cta";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Colabora",
  description:
    "Pam Guerrero trabaja con marcas, destinos e instituciones que buscan contar historias reales de viaje y experiencias internacionales.",
  alternates: { canonical: "/colabora" },
};

const CAPABILITIES = [
  {
    title: "Storytelling y contenido",
    body: "Historias en primera persona, con la voz y la audiencia que ya confían en ella.",
  },
  {
    title: "Viajes grupales con marca",
    body: "Experiencias de viaje diseñadas junto a destinos, hoteles o aerolíneas.",
  },
  {
    title: "Investigación y turismo",
    body: "Una mirada de Doctora en Turismo aplicada a proyectos y campañas reales.",
  },
  {
    title: "Conexión con audiencia latinoamericana",
    body: "Acceso directo a una comunidad interesada en viajes, cultura y oportunidades internacionales.",
  },
];

export default function ColaboraPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Colabora" }];

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
          <div className="grid gap-10 sm:grid-cols-2">
            {CAPABILITIES.map((item) => (
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

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Charlas y conferencias</h2>
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-muted">
            Viajes, turismo, experiencias internacionales y creación de contenido, disponible
            para universidades, empresas e instituciones bajo solicitud.
          </p>
          <p className="mt-4 font-body text-xs text-ink-muted">
            [INSERTAR TEMARIO Y FORMATOS REALES CUANDO EXISTA CONTENIDO SUFICIENTE PARA UNA
            PÁGINA INDEPENDIENTE]
          </p>
        </div>
      </section>

      <Cta
        eyebrow="Hablemos"
        title="¿Tienes un proyecto en mente?"
        description="Cuéntame de qué se trata y qué buscas conseguir."
        primaryHref="/contacto"
        primaryLabel="Escríbeme"
      />
    </main>
  );
}
