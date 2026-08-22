import { RouteLine } from "@/components/route-line";

const MILESTONES = [
  "Ecuador",
  "Docencia universitaria",
  "Doctora en Turismo",
  "+30 países recorridos",
  "Fundadora de Caminando.lat",
];

export function Trajectory() {
  return (
    <section className="relative overflow-hidden bg-cobalt py-5">
      <RouteLine
        variant="wave"
        className="pointer-events-none absolute inset-0 h-full w-full text-white/15"
      />
      <div className="relative mx-auto max-w-6xl overflow-x-auto px-6">
        <ol className="flex min-w-max items-center gap-3 font-body text-sm font-medium text-white/80">
          {MILESTONES.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-white/30">—</span>}
              <span className={i === MILESTONES.length - 1 ? "text-white" : ""}>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
