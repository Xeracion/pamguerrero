import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function CollaborationsSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Para marcas, destinos e instituciones
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Trabajemos juntos.
            </h2>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink-muted">
              Storytelling, viajes grupales con marca, investigación en turismo y acceso directo
              a una comunidad latinoamericana interesada en viajar.
            </p>
            <a
              href="/trabaja-conmigo"
              className="mt-8 inline-block w-fit rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Trabaja conmigo
            </a>
          </div>

          <div className="flex flex-col gap-5 border-t border-line pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <PhotoPlaceholder
              label="[REEMPLAZAR CON IMAGEN REAL DE CAMINANDO.LAT]"
              aspect="landscape"
            />
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-aqua-deep">
                Un proyecto fundado por Pam
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium text-ink">Caminando.lat</h3>
              <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-ink-muted">
                Becas, trabajo y rutas de migración para latinoamericanos.
              </p>
              <a
                href="https://caminando.lat"
                className="mt-4 inline-block font-body text-sm font-semibold text-accent hover:underline"
              >
                Descubre Caminando.lat →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
