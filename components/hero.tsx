import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { RouteLine } from "@/components/route-line";
import { PlaneIcon } from "@/components/plane-icon";
import { OrganicAccent } from "@/components/organic-accent";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-burgundy">
      <PhotoPlaceholder
        label="[REEMPLAZAR CON FOTO REAL DE PAM — plano editorial, viaje o retrato en movimiento, a pantalla completa]"
        aspect="square"
        tone="dark"
        className="absolute inset-0 h-full w-full border-none"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(93,16,29,0.97) 0%, rgba(93,16,29,0.88) 32%, rgba(93,16,29,0.5) 58%, rgba(93,16,29,0.15) 78%)",
        }}
      />

      {/* Scrim adicional: independiente de la diagonal, garantiza contraste
          del titular contra cualquier foto, incluida una con tonos claros o
          muy saturados en la zona inferior donde vive el texto. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(14,3,6,0.85) 0%, rgba(14,3,6,0.55) 30%, rgba(14,3,6,0) 62%)",
        }}
      />

      <OrganicAccent className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 text-white/5" />

      <RouteLine
        variant="loop"
        className="pointer-events-none absolute right-[6%] top-[14%] h-24 w-[46%] text-white/30 sm:h-32"
      />

      <div className="relative flex min-h-[92vh] flex-col justify-between px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex items-center justify-between">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            Doctora en Turismo · +30 países
          </p>
          <div className="hidden items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-right backdrop-blur-sm sm:flex">
            <PlaneIcon className="h-4 w-4 -rotate-12 text-white/50" />
            <div>
              <p className="font-display text-3xl font-semibold text-white">30+</p>
              <p className="font-body text-[11px] uppercase tracking-[0.14em] text-white/70">
                países recorridos
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <h1 className="font-display font-medium leading-[0.86] text-white">
            <span className="block text-[16vw] sm:text-[10vw] lg:text-[8rem]">Ampliar</span>
            <span className="block pl-[8vw] text-[16vw] italic text-coral sm:pl-6 sm:text-[10vw] lg:text-[8rem]">
              tu
            </span>
            <span className="block text-[16vw] sm:text-[10vw] lg:text-[8rem]">mundo.</span>
          </h1>

          <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-white/85">
            Viajes, experiencias e historias para mirar más allá de lo conocido. Esto no habla
            de viajar — hace sentir que estás viajando.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/viaja-conmigo"
              className="rounded-full bg-coral px-7 py-3.5 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-px"
            >
              Viaja conmigo
            </Link>
            <Link
              href="/viajes"
              className="rounded-full border border-white/40 px-7 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Explora viajes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
