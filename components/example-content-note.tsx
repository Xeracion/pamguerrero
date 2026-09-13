export function ExampleContentNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex w-fit items-center gap-2 rounded-full border border-tangerine/40 bg-tangerine/12 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.08em] text-ink ${className}`}
    >
      Contenido de ejemplo — pendiente de sustituir por datos reales
    </p>
  );
}
