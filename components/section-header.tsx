interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "onBrand" | "onWarm";
}

/**
 * tone reflects the section's background:
 * light = paper/white (ink text, burgundy eyebrow)
 * onBrand = burgundy or navy (white text — the two dark anchor colors)
 * onWarm = coral / teal / ochre (solid ink, no opacity reduction — teal
 * in particular only clears 4.5:1 against ink at full opacity, so any
 * lightened variant would fail; see contrast notes in globals.css)
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowColor = tone === "onBrand" ? "text-white" : tone === "onWarm" ? "text-ink" : "text-accent";
  const titleColor = tone === "onBrand" ? "text-white" : "text-ink";
  const descriptionColor =
    tone === "onBrand" ? "text-white/80" : tone === "onWarm" ? "text-ink" : "text-ink-muted";

  return (
    <div className={`flex max-w-2xl flex-col gap-5 ${alignment}`}>
      {eyebrow && (
        <p className={`font-body text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl font-body text-lg leading-relaxed ${descriptionColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
