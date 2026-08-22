import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Una carta, de vez en cuando, sobre ampliar el mundo — de Pam Guerrero.",
  alternates: { canonical: "/newsletter" },
};

const WHAT_YOU_GET = [
  "Destinos y aprendizajes de viajes recientes, en primera persona.",
  "Oportunidades internacionales seleccionadas — becas, trabajo, movilidad.",
  "Lo primero en enterarte de próximas fechas de viajes grupales.",
];

export default function NewsletterPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Newsletter" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Sin ruido, sin relleno"
        title="Una carta, de vez en cuando, sobre ampliar el mundo."
        description="Nada de correos diarios ni promociones constantes. Solo lo que de verdad vale la pena leer."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">Qué vas a recibir</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {WHAT_YOU_GET.map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-line pt-4">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  <span className="font-body text-sm leading-relaxed text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-8">
            <form className="flex flex-col gap-4" aria-label="Suscripción al newsletter">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-body text-sm font-medium text-ink">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="rounded-lg border border-line-strong bg-paper px-4 py-3 font-body text-sm text-ink focus-visible:outline-accent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-body text-sm font-medium text-ink">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-lg border border-line-strong bg-paper px-4 py-3 font-body text-sm text-ink focus-visible:outline-accent"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-accent px-7 py-3.5 font-body text-sm font-semibold text-white transition-transform hover:-translate-y-px"
              >
                Suscribirme
              </button>
              <p className="font-body text-xs text-ink-muted">
                [PENDIENTE: conectar formulario a proveedor de email real]
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
