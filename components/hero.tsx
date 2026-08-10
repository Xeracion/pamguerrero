import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      <div className="absolute inset-0">
        <PhotoPlaceholder
          label="[REEMPLAZAR CON FOTO REAL DE PAM — plano editorial, viaje o retrato en movimiento]"
          aspect="wide"
          className="h-full w-full border-none bg-navy-deep text-cream/60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
      </div>

      <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-40">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Doctora en Turismo · +30 países · Fundadora de Caminando.lat
        </p>

        <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium italic leading-[1.05] sm:text-6xl md:text-7xl">
          Hay más mundo del que imaginas.
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-cream/85">
          Ecuador, España y más de treinta países después, esto es lo que he aprendido: existen
          muchas más formas de vivir de las que nos enseñaron a ver. Vamos a descubrirlas.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/explora"
            className="rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold text-navy transition-transform hover:-translate-y-px"
          >
            Explora conmigo
          </Link>
          <Link
            href="#historia"
            className="rounded-full border border-cream/40 px-7 py-3.5 font-body text-sm font-semibold text-cream transition-colors hover:border-cream"
          >
            Conoce mi historia
          </Link>
        </div>
      </div>
    </section>
  );
}
