import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { RouteLine } from "@/components/route-line";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="grid min-h-[88vh] lg:grid-cols-[3fr_2fr]">
        <div className="relative flex flex-col justify-end gap-8 bg-burgundy px-6 py-20 sm:px-10 lg:py-24">
          <RouteLine
            variant="wave"
            className="absolute left-6 top-10 h-10 w-40 text-coral/70 sm:left-10"
          />

          <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-coral">
            Doctora en Turismo · +30 países
          </p>

          <h1 className="font-display text-6xl font-medium leading-[0.95] text-cream sm:text-7xl lg:text-8xl">
            Ampliar
            <br />
            <span className="italic text-coral">tu</span>
            <br />
            mundo.
          </h1>

          <p className="max-w-sm font-body text-lg leading-relaxed text-cream/80">
            Viajes, experiencias e historias para mirar más allá de lo conocido.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/viaja-conmigo"
              className="rounded-full bg-coral px-7 py-3.5 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-px"
            >
              Viaja conmigo
            </Link>
            <Link
              href="/viajes"
              className="rounded-full border border-cream/40 px-7 py-3.5 font-body text-sm font-semibold text-cream transition-colors hover:border-cream"
            >
              Explora viajes
            </Link>
          </div>
        </div>

        <div className="relative min-h-[40vh]">
          <PhotoPlaceholder
            label="[REEMPLAZAR CON FOTO REAL DE PAM — plano editorial, viaje o retrato en movimiento]"
            aspect="square"
            className="h-full w-full border-none bg-ink-deep text-cream/50"
          />
        </div>
      </div>
    </section>
  );
}
