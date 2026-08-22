import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function CollaborationsSection() {
  return (
    <section className="bg-cobalt py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col justify-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-sun">
              Para marcas, destinos e instituciones
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-white sm:text-5xl">
              Trabajemos juntos.
            </h2>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-white/80">
              Storytelling, viajes grupales con marca, investigación en turismo y acceso directo
              a una comunidad latinoamericana interesada en viajar.
            </p>
            <a
              href="/trabaja-conmigo"
              className="mt-8 inline-block w-fit rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-cobalt transition-transform hover:-translate-y-px"
            >
              Trabaja conmigo
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <PhotoPlaceholder
              label="[REEMPLAZAR CON IMAGEN REAL DE CAMINANDO.LAT]"
              aspect="portrait"
              className="border-none text-white/40"
            />
            <div className="absolute -bottom-6 -left-6 max-w-[13rem] rounded-xl bg-coral p-5 shadow-[0_20px_40px_-15px_rgba(13,18,32,0.5)]">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">
                Un proyecto fundado por Pam
              </p>
              <h3 className="mt-1 font-display text-xl font-medium text-ink">Caminando.lat</h3>
              <a
                href="https://caminando.lat"
                className="mt-2 inline-block font-body text-xs font-semibold text-ink underline underline-offset-2"
              >
                Descúbrelo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
