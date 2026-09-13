interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "onBrand";
}

/**
 * tone reflects the section's background:
 * light = paper/white (ink text, burgundy eyebrow)
 * onBrand = burgundy or navy (white text — the two dark anchor colors)
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowColor = tone === "onBrand" ? "text-white" : "text-accent";
  const titleColor = tone === "onBrand" ? "text-white" : "text-ink";
  const descriptionColor = tone === "onBrand" ? "text-white/80" : "text-ink-muted";

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
