import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

const PATHS = [
  {
    title: "Viaja conmigo",
    body: "Acompáñame en mis viajes y experiencias.",
    href: "/viaja-conmigo",
    cta: "Ver mis viajes",
    accent: "group-hover:text-coral-deep",
  },
  {
    title: "Viajes",
    body: "Encuentra destinos, guías y consejos para planificar los tuyos.",
    href: "/viajes",
    cta: "Explorar viajes",
    accent: "group-hover:text-cobalt",
  },
  {
    title: "Experiencias",
    body: "Descubre historias, cultura y experiencias para ampliar tu mundo.",
    href: "/experiencias",
    cta: "Ver experiencias",
    accent: "group-hover:text-turquoise-deep",
  },
];

export function PathsSection() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Por dónde empezar" title="¿Qué quieres hacer?" align="center" />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {PATHS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group flex flex-col gap-4 bg-surface p-10 transition-colors hover:bg-cream"
            >
              <h3 className="font-display text-2xl italic font-medium text-ink">{path.title}</h3>
              <p className="font-body text-sm leading-relaxed text-ink-muted">{path.body}</p>
              <span
                className={`mt-auto font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors ${path.accent}`}
              >
                {path.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
