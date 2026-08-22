import { RouteLine } from "@/components/route-line";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "white" | "burgundy" | "cobalt" | "coral" | "turquoise" | "tangerine" | "sun";
}

const TONE_BG: Record<NonNullable<PageHeaderProps["tone"]>, string> = {
  white: "bg-surface",
  burgundy: "bg-burgundy",
  cobalt: "bg-cobalt",
  coral: "bg-coral",
  turquoise: "bg-turquoise",
  tangerine: "bg-tangerine",
  sun: "bg-sun",
};

/** white text only pairs safely with burgundy/cobalt; everything else needs ink. */
const ON_DARK = new Set<PageHeaderProps["tone"]>(["burgundy", "cobalt"]);

export function PageHeader({ eyebrow, title, description, tone = "white" }: PageHeaderProps) {
  const onDark = ON_DARK.has(tone);
  const colored = tone !== "white";
  const eyebrowColor = tone === "white" ? "text-accent" : onDark ? "text-white/80" : "text-ink/70";
  const titleColor = tone === "white" ? "text-ink" : onDark ? "text-white" : "text-ink";
  const descColor = tone === "white" ? "text-ink-muted" : onDark ? "text-white/80" : "text-ink/75";

  return (
    <div className={`relative overflow-hidden ${colored ? TONE_BG[tone] : "border-b border-line bg-surface"}`}>
      {colored && (
        <RouteLine
          variant="arc"
          className={`pointer-events-none absolute -right-6 -top-4 h-20 w-[50%] ${onDark ? "text-white/10" : "text-ink/10"}`}
        />
      )}
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {eyebrow && (
          <p className={`font-body text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>
            {eyebrow}
          </p>
        )}
        <h1
          className={`mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl ${titleColor}`}
        >
          {title}
        </h1>
        {description && (
          <p className={`mt-6 max-w-xl font-body text-lg leading-relaxed ${descColor}`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
