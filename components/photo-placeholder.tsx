interface PhotoPlaceholderProps {
  label: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  tone?: "light" | "dark";
  className?: string;
}

const ASPECT: Record<NonNullable<PhotoPlaceholderProps["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

/**
 * tone="dark" uses a translucent white fill instead of solid white, so the
 * placeholder blends into whatever color block or dark overlay sits behind
 * it (hero, burgundy/cobalt sections) instead of punching a bright white
 * hole through it.
 */
const TONE = {
  light: { box: "border-line-strong bg-surface", text: "text-ink-muted" },
  dark: { box: "border-white/30 bg-white/10", text: "text-white/60" },
} as const;

export function PhotoPlaceholder({
  label,
  aspect = "landscape",
  tone = "light",
  className = "",
}: PhotoPlaceholderProps) {
  const t = TONE[tone];

  return (
    <div
      className={`flex ${ASPECT[aspect]} items-center justify-center border border-dashed ${t.box} p-6 text-center ${className}`}
      role="img"
      aria-label={label}
    >
      <p className={`font-body text-xs font-medium uppercase tracking-[0.14em] ${t.text}`}>
        {label}
      </p>
    </div>
  );
}
