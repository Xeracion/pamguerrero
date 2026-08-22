interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowColor = tone === "dark" ? "text-white" : "text-accent";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const descriptionColor = tone === "dark" ? "text-white/80" : "text-ink-muted";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <p className={`font-body text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-medium leading-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`font-body text-base leading-relaxed ${descriptionColor}`}>{description}</p>
      )}
    </div>
  );
}
