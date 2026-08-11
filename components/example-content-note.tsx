export function ExampleContentNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.08em] text-navy ${className}`}
    >
      Contenido de ejemplo — pendiente de sustituir por datos reales
    </p>
  );
}
