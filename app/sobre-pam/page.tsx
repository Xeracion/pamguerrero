import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Cta } from "@/components/cta";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Sobre Pam",
  description:
    "Doctora en Turismo, exdocente universitaria y exploradora de más de 30 países. La historia completa detrás de Pam Guerrero y de la pregunta que la llevó a construir una vida internacional.",
  alternates: { canonical: "/sobre-pam" },
};

const CREDENTIALS = [
  "Doctora en Turismo",
  "Exdocente universitaria e investigadora",
  "Más de 30 países recorridos",
  "Fundadora de Caminando.lat",
  "Líder de viajes grupales",
];

export default function SobrePamPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Sobre Pam" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Sobre Pam"
        title="Una ecuatoriana que se atrevió a preguntarse si existía otra forma de vivir."
        description="Doctora en Turismo, exdocente universitaria, investigadora y exploradora de más de 30 países. Esta es la historia completa, sin editar para sonar más dramática de lo que fue."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <PhotoPlaceholder
            label="[REEMPLAZAR CON FOTO REAL DE PAM — retrato editorial]"
            aspect="portrait"
            className="lg:sticky lg:top-28"
          />

          <div className="flex flex-col gap-6 font-body text-base leading-relaxed text-ink-muted">
            <p>
              Nací en Ecuador y durante años construí mi vida dentro de una estructura muy clara:
              aula, investigación, jornadas larguísimas como docente universitaria. Era una vida
              profesional válida — y también una que, en algún punto, empezó a sentirse como la
              única opción posible.
            </p>
            <p>
              Hice un doctorado en Turismo investigando de cerca una industria que existe,
              precisamente, para que las personas puedan salir a ver otras formas de vivir. La
              ironía no se me escapó: estudiaba el turismo mientras yo misma apenas había viajado
              por decisión propia.
            </p>
            <p>
              La pregunta que lo cambió todo fue simple: ¿y si existe otra forma de vivir la mía?
              No fue una crisis dramática ni una renuncia de un día para otro. Fue una pregunta que
              no pude dejar de hacerme, y que empecé a responder un viaje a la vez.
            </p>
            <p>
              [INSERTAR CRONOLOGÍA REAL Y VERIFICADA: primeros viajes, primeras oportunidades
              internacionales, cómo empezó a crear contenido y a liderar viajes grupales.]
            </p>
            <p>
              Hoy vivo en España, he recorrido más de 30 países y fundé Caminando.lat para ayudar
              a otros latinoamericanos a encontrar las oportunidades internacionales — becas,
              trabajo, rutas de migración — que a mí me cambiaron la vida. Esta web es la
              continuación natural de esa misma pregunta: un lugar para seguir ampliando el
              mundo, en compañía.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-medium text-ink">Trayectoria</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {CREDENTIALS.map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-line pt-4">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span className="font-body text-sm text-ink">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-body text-xs text-ink-muted">
            [INSERTAR CREDENCIALES ADICIONALES VERIFICADAS: universidad, publicaciones, líneas de
            investigación]
          </p>
        </div>
      </section>

      <Cta
        eyebrow="Sigue el camino"
        title="Conoce por dónde puedes empezar a ampliar tu mundo."
        primaryHref="/viajes"
        primaryLabel="Ver próximos viajes"
        secondaryHref="/explora"
        secondaryLabel="Explorar contenido"
      />
    </main>
  );
}
