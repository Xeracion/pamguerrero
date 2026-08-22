import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribe a Pam Guerrero: comunidad, prensa o colaboraciones.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Contacto" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />

      <PageHeader
        eyebrow="Hablemos"
        title="Contacto"
        description="¿Pregunta sobre un viaje, propuesta de colaboración o consulta de prensa? Escríbeme por aquí."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1fr]">
          <form className="flex flex-col gap-5" aria-label="Formulario de contacto">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-body text-sm font-medium text-ink">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-lg border border-line-strong bg-surface px-4 py-3 font-body text-sm text-ink focus-visible:outline-accent"
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
                className="rounded-lg border border-line-strong bg-surface px-4 py-3 font-body text-sm text-ink focus-visible:outline-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="reason" className="font-body text-sm font-medium text-ink">
                Motivo
              </label>
              <select
                id="reason"
                name="reason"
                className="rounded-lg border border-line-strong bg-surface px-4 py-3 font-body text-sm text-ink focus-visible:outline-accent"
              >
                <option>Comunidad / general</option>
                <option>Viajes grupales</option>
                <option>Colaboración de marca</option>
                <option>Prensa</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-body text-sm font-medium text-ink">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="rounded-lg border border-line-strong bg-surface px-4 py-3 font-body text-sm text-ink focus-visible:outline-accent"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-fit rounded-full bg-accent px-7 py-3.5 font-body text-sm font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Enviar mensaje
            </button>
            <p className="font-body text-xs text-ink-muted">
              [PENDIENTE: conectar formulario a servicio de envío real]
            </p>
          </form>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-xl font-medium text-ink">Comunidad</h2>
              <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink-muted">
                Preguntas sobre viajes, contenido o la comunidad en general.
              </p>
              <p className="mt-2 font-body text-sm text-accent">[INSERTAR EMAIL VERIFICADO]</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-ink">Prensa</h2>
              <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink-muted">
                Entrevistas, notas de prensa y solicitudes de medios.
              </p>
              <p className="mt-2 font-body text-sm text-accent">[INSERTAR EMAIL VERIFICADO]</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-ink">Colaboraciones</h2>
              <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink-muted">
                Marcas, destinos e instituciones — revisa también{" "}
                <a href="/trabaja-conmigo" className="underline hover:text-accent">
                  Trabaja conmigo
                </a>
                .
              </p>
              <p className="mt-2 font-body text-sm text-accent">[INSERTAR EMAIL VERIFICADO]</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
