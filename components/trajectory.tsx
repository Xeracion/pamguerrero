const MILESTONES = [
  "Ecuador",
  "Docencia universitaria",
  "Doctora en Turismo",
  "+30 países recorridos",
  "Fundadora de Caminando.lat",
];

export function Trajectory() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl overflow-x-auto px-6 py-6">
        <ol className="flex min-w-max items-center gap-3 font-body text-sm font-medium text-ink-muted">
          {MILESTONES.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-line-strong">—</span>}
              <span className={i === MILESTONES.length - 1 ? "text-accent" : ""}>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
