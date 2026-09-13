import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";
import { SanityImage } from "@/components/sanity-image";
import { RouteLine } from "@/components/route-line";
import { Cta } from "@/components/cta";
import { imageDataAttribute } from "@/lib/sanity/data-attribute";
import { getSiteSettings, SITE_SETTINGS_ID } from "@/lib/sanity/queries";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Sobre Pam",
  description:
    "Doctora en Turismo, exdocente universitaria y exploradora de más de 30 países. La persona, la experiencia y la expertise detrás de Pam Guerrero.",
  alternates: { canonical: "/sobre-pam" },
};

const DEFAULT_MOMENTS = [
  { label: "[FOTO: PAM VIAJANDO]", caption: "Viajando" },
  { label: "[FOTO: PAM CON PERSONAS LOCALES]", caption: "Con personas" },
  { label: "[FOTO: PAM DANDO UNA CHARLA O TRABAJANDO]", caption: "Trabajando" },
  { label: "[FOTO: PAM DESCUBRIENDO UN LUGAR NUEVO]", caption: "Descubriendo" },
];

const DEFAULT_EXPERTISE = [
  "Doctora en Turismo",
  "Exdocente universitaria e investigadora",
  "Más de 30 países recorridos",
  "Fundadora de Caminando.lat",
  "Líder de viajes grupales",
];

export default async function SobrePamPage() {
  const settings = await getSiteSettings();
  const header = settings.sobrePamHeader;
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Sobre Pam" }];

  const moments =
    settings.sobrePamMoments && settings.sobrePamMoments.length > 0
      ? settings.sobrePamMoments.map((m, i) => ({
          image: m.image,
          caption: m.caption,
          fallbackLabel: `[FOTO: ${m.caption.toUpperCase()}]`,
          key: `sobrePamMoments[${i}]`,
        }))
      : DEFAULT_MOMENTS.map((m, i) => ({
          image: undefined,
          caption: m.caption,
          fallbackLabel: m.label,
          key: `default-${i}`,
        }));

  const expertise =
    settings.sobrePamExpertiseItems && settings.sobrePamExpertiseItems.length > 0
      ? settings.sobrePamExpertiseItems
      : DEFAULT_EXPERTISE;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        tone="burgundy"
        eyebrow={header?.eyebrow || "Sobre Pam"}
        title={header?.title || "Antes de los títulos, esto es lo que necesitas saber de mí."}
      />

      {/* PERSONA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0">
            <SanityImage
              image={settings.sobrePamIntroImage}
              fallbackLabel="[REEMPLAZAR CON FOTO REAL DE PAM — momento espontáneo, no posado]"
              aspect="portrait"
              className="absolute inset-y-0 left-0 w-[75%] border-none"
              dataAttribute={imageDataAttribute(SITE_SETTINGS_ID, "siteSettings", "sobrePamIntroImage")}
            />
            <SanityImage
              image={settings.sobrePamIntroImageSecondary}
              fallbackLabel="[FOTO SECUNDARIA DE PAM]"
              aspect="square"
              className="absolute bottom-0 right-0 w-[42%] rotate-2 border-4 border-white shadow-[0_18px_36px_-16px_rgba(23,32,51,0.4)]"
              dataAttribute={imageDataAttribute(SITE_SETTINGS_ID, "siteSettings", "sobrePamIntroImageSecondary")}
            />
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-display text-3xl italic font-medium leading-snug text-ink sm:text-4xl">
              {settings.sobrePamIntroQuote ||
                "Curiosa antes que nada. Ecuatoriana, y desde hace años también un poco de cada lugar que he pisado."}
            </p>
            <p className="font-body text-lg leading-relaxed text-ink-muted">
              {settings.sobrePamIntroBody ||
                "Hago demasiadas preguntas. Como en la calle antes que en restaurantes con estrella. Guardo mapas de sitios a los que todavía no he ido. [INSERTAR MÁS RASGOS Y ANÉCDOTAS REALES QUE DEFINAN A PAM COMO PERSONA]"}
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="relative overflow-hidden bg-cobalt py-16 sm:py-20">
        <RouteLine
          variant="loop"
          className="pointer-events-none absolute -right-10 top-0 h-24 w-[45%] text-white/10"
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SanityImage
            image={settings.sobrePamExperienceImage}
            fallbackLabel="[FOTO: PAM DOCENTE O EN INVESTIGACIÓN, ANTES DE VIAJAR]"
            aspect="portrait"
            tone="dark"
            className="border-none"
            dataAttribute={imageDataAttribute(SITE_SETTINGS_ID, "siteSettings", "sobrePamExperienceImage")}
          />
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              {settings.sobrePamExperienceEyebrow || "Lo que he vivido"}
            </p>
            <div className="mt-6 flex flex-col gap-6 font-body text-lg leading-relaxed text-white/85">
              <p>
                {settings.sobrePamExperienceBody1 ||
                  "Durante años construí mi vida dentro de una estructura muy clara: aula, investigación, jornadas larguísimas como docente universitaria. Era una vida profesional válida — y también una que, en algún punto, empezó a sentirse como la única opción posible."}
              </p>
              <p>
                {settings.sobrePamExperienceBody2 ||
                  "La pregunta que lo cambió todo fue simple: ¿y si existe otra forma de vivir la mía? No fue una crisis dramática ni una renuncia de un día para otro. Fue una pregunta que no pude dejar de hacerme, y que empecé a responder un viaje a la vez."}
              </p>
              <p className="text-white/60">
                [INSERTAR CRONOLOGÍA REAL Y VERIFICADA: primeros viajes, primeras oportunidades
                internacionales, cómo empezó a crear contenido y a liderar viajes grupales.]
              </p>
              <p>
                Hoy vivo en España, he recorrido más de 30 países y fundé{" "}
                <a href="/proyectos/caminando" className="text-white underline hover:text-white/70">
                  Caminando.lat
                </a>{" "}
                para ayudar a otros latinoamericanos a encontrar las oportunidades internacionales
                que a mí me cambiaron la vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MOMENTOS — collage de fotografías */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-coral-deep">
            En sus propias palabras
          </p>
          <h2 className="mt-2 max-w-lg font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            {settings.sobrePamMomentsHeading ||
              "No una sola fotografía corporativa — esto es lo que realmente hago."}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {moments.map((moment, i) => (
              <div key={moment.key} className={i % 2 === 1 ? "sm:mt-10" : ""}>
                <SanityImage
                  image={moment.image}
                  fallbackLabel={moment.fallbackLabel}
                  aspect="portrait"
                  dataAttribute={
                    moment.image
                      ? imageDataAttribute(SITE_SETTINGS_ID, "siteSettings", `sobrePamMoments[${i}].image`)
                      : undefined
                  }
                />
                <p className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  {moment.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-coral-deep">
            Lo que sé hacer
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium text-ink">
            {settings.sobrePamExpertiseHeading || "Trayectoria"}
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
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
