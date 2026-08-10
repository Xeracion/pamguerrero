import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function CaminandoTeaser() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        <PhotoPlaceholder
          label="[REEMPLAZAR CON IMAGEN REAL DE CAMINANDO.LAT]"
          aspect="landscape"
        />

        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Un proyecto fundado por Pam Guerrero
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Caminando.lat
          </h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink-muted">
            Becas, trabajo y rutas de migración para latinoamericanos. La plataforma editorial
            que fundé para ayudar a otros a encontrar las oportunidades internacionales que a
            mí me cambiaron la vida.
          </p>
          <a
            href="https://caminando.lat"
            className="mt-8 inline-block rounded-full bg-navy px-7 py-3.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-px"
          >
            Descubre Caminando.lat
          </a>
        </div>
      </div>
    </section>
  );
}
