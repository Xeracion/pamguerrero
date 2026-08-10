import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

const PATHS = [
  {
    verb: "Viaja",
    title: "Viajes grupales",
    body: "Recorre destinos conmigo, en experiencias pensadas de principio a fin.",
    href: "/viajes",
    cta: "Ver próximos viajes",
  },
  {
    verb: "Descubre",
    title: "Destinos y cultura",
    body: "Guías, itinerarios y aprendizajes de lugares que he visitado de verdad.",
    href: "/explora/destinos",
    cta: "Explorar destinos",
  },
  {
    verb: "Aprende",
    title: "Viajar mejor",
    body: "Lo práctico: presupuestos, errores, decisiones y recursos que funcionan.",
    href: "/explora/viajar-mejor",
    cta: "Ver recursos",
  },
  {
    verb: "Atrévete",
    title: "Historias y oportunidades",
    body: "Relatos reales de personas que decidieron ampliar su mundo primero.",
    href: "/explora/historias",
    cta: "Leer historias",
  },
];

export function PathsSection() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Por dónde empezar"
          title="Los grandes caminos"
          align="center"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group flex flex-col gap-4 bg-surface p-8 transition-colors hover:bg-cream"
            >
              <span className="font-display text-sm italic text-accent">{path.verb}</span>
              <h3 className="font-display text-xl font-medium text-ink">{path.title}</h3>
              <p className="font-body text-sm leading-relaxed text-ink-muted">{path.body}</p>
              <span className="mt-auto font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors group-hover:text-accent">
                {path.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
