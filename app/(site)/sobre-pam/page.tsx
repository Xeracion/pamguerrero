import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { RouteLine } from "@/components/route-line";
import { Cta } from "@/components/cta";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Sobre Pam",
  description:
    "Doctora en Turismo, exdocente universitaria y exploradora de más de 30 países. La persona, la experiencia y la expertise detrás de Pam Guerrero.",
  alternates: { canonical: "/sobre-pam" },
};

const EXPERTISE = [
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
        title="Antes de los títulos, esto es lo que necesitas saber de mí."
      />

      {/* PERSONA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <PhotoPlaceholder
            label="[REEMPLAZAR CON FOTO REAL DE PAM — momento espontáneo, no posado]"
            aspect="portrait"
          />
          <div className="flex flex-col gap-6">
            <p className="font-display text-3xl italic font-medium leading-snug text-ink sm:text-4xl">
              Curiosa antes que nada. Ecuatoriana, y desde hace años también un poco de cada
              lugar que he pisado.
            </p>
            <p className="font-body text-lg leading-relaxed text-ink-muted">
              Hago demasiadas preguntas. Como en la calle antes que en restaurantes con estrella.
              Guardo mapas de sitios a los que todavía no he ido. [INSERTAR MÁS RASGOS Y ANÉCDOTAS
              REALES QUE DEFINAN A PAM COMO PERSONA]
            </p>
          </div>
        </div>
      </section>

      <RouteLine className="mx-auto h-10 w-full max-w-4xl text-coral" />

      {/* EXPERIENCIA */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-coral-deep">
            Lo que he vivido
          </p>
          <div className="mt-6 flex flex-col gap-6 font-body text-lg leading-relaxed text-ink-muted">
            <p>
              Durante años construí mi vida dentro de una estructura muy clara: aula,
              investigación, jornadas larguísimas como docente universitaria. Era una vida
              profesional válida — y también una que, en algún punto, empezó a sentirse como la
              única opción posible.
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
              Hoy vivo en España, he recorrido más de 30 países y fundé{" "}
              <a href="/proyectos/caminando" className="text-accent underline hover:no-underline">
                Caminando.lat
              </a>{" "}
              para ayudar a otros latinoamericanos a encontrar las oportunidades internacionales
              que a mí me cambiaron la vida.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-coral-deep">
            Lo que sé hacer
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium text-ink">Trayectoria</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE.map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-line pt-4">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
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
        primaryHref="/viajes-grupales"
        primaryLabel="Ver viajes grupales"
        secondaryHref="/experiencias"
        secondaryLabel="Explorar experiencias"
      />
    </main>
  );
}
