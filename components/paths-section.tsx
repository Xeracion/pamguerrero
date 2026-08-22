import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SectionHeader } from "@/components/section-header";

const PATHS = [
  {
    title: "Viaja conmigo",
    body: "Acompáñame en mis viajes y experiencias.",
    href: "/viaja-conmigo",
    cta: "Ver mis viajes",
    dot: "bg-coral",
    offset: "sm:mt-0",
    label: "[FOTO: PAM EN MOVIMIENTO]",
  },
  {
    title: "Viajes",
    body: "Encuentra destinos, guías y consejos para planificar los tuyos.",
    href: "/viajes",
    cta: "Explorar viajes",
    dot: "bg-burgundy",
    offset: "sm:mt-10",
    label: "[FOTO: MAPA O RUTA DE VIAJE]",
  },
  {
    title: "Experiencias",
    body: "Descubre historias, cultura y experiencias para ampliar tu mundo.",
    href: "/experiencias",
    cta: "Ver experiencias",
    dot: "bg-tangerine",
    offset: "sm:mt-0",
    label: "[FOTO: MOMENTO CULTURAL O DE ENCUENTRO]",
  },
];

export function PathsSection() {
  return (
    <section className="bg-turquoise py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Por dónde empezar"
          title="¿Qué quieres hacer?"
          tone="onWarm"
          align="center"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {PATHS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className={`group relative block overflow-hidden rounded-lg shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] ${path.offset}`}
            >
              <PhotoPlaceholder
                label={path.label}
                aspect="portrait"
                className="border-none transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6"
                style={{
                  background: "linear-gradient(to top, rgba(13,18,32,0.92) 0%, rgba(13,18,32,0) 65%)",
                }}
              >
                <h3 className="font-display text-2xl italic font-medium text-white">
                  {path.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/75">{path.body}</p>
                <span className="mt-2 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.1em] text-white">
                  <span className={`h-1.5 w-1.5 rounded-full ${path.dot}`} />
                  {path.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
