import { RouteLine } from "@/components/route-line";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "white" | "burgundy" | "cobalt" | "coral" | "turquoise" | "tangerine";
}

/**
 * burgundy/cobalt(azul) are the two deep anchor colors — solid, white text.
 * coral/turquoise(teal)/tangerine(ochre) render as a soft tinted wash rather
 * than a solid fill: teal in particular only clears 4.5:1 against ink at
 * full opacity, and a wash reads as the "sutil" accent this palette calls
 * for rather than a saturated block.
 */
const TONE_BG: Record<NonNullable<PageHeaderProps["tone"]>, string> = {
  white: "bg-surface",
  burgundy: "bg-burgundy",
  cobalt: "bg-cobalt",
  coral: "bg-coral/14",
  turquoise: "bg-turquoise/12",
  tangerine: "bg-tangerine/16",
};

const ON_DARK = new Set<PageHeaderProps["tone"]>(["burgundy", "cobalt"]);

export function PageHeader({ eyebrow, title, description, tone = "white" }: PageHeaderProps) {
  const onDark = ON_DARK.has(tone);
  const colored = tone !== "white";
  const eyebrowColor = tone === "white" ? "text-accent" : onDark ? "text-white/80" : "text-ink";
  const titleColor = tone === "white" ? "text-ink" : onDark ? "text-white" : "text-ink";
  const descColor = tone === "white" ? "text-ink-muted" : onDark ? "text-white/80" : "text-ink";

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
