interface PhotoPlaceholderProps {
  label: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  className?: string;
}

const ASPECT: Record<NonNullable<PhotoPlaceholderProps["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function PhotoPlaceholder({ label, aspect = "landscape", className = "" }: PhotoPlaceholderProps) {
  return (
    <div
      className={`flex ${ASPECT[aspect]} items-center justify-center border border-dashed border-line-strong bg-surface p-6 text-center ${className}`}
      role="img"
      aria-label={label}
    >
      <p className="font-body text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </p>
    </div>
  );
}
