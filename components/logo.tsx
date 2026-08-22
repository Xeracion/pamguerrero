interface LogoProps {
  tone?: "positive" | "negative";
  className?: string;
}

/**
 * Wordmark: italic "pam" + upright "guerrero", set in Cormorant Garamond
 * (the site's own display face, already loaded via next/font) so it
 * renders pixel-identical to the rest of the type system.
 * positive = dark mark for light backgrounds, negative = white mark for
 * burgundy/color blocks.
 */
export function Logo({ tone = "positive", className = "" }: LogoProps) {
  const fill = tone === "negative" ? "#ffffff" : "#172033";

  return (
    <svg
      viewBox="0 0 210 34"
      className={className}
      role="img"
      aria-label="Pam Guerrero"
    >
      <text
        x="0"
        y="26"
        fontSize="30"
        fontWeight="600"
        fill={fill}
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        <tspan fontStyle="italic">pam</tspan>
        <tspan>guerrero</tspan>
      </text>
    </svg>
  );
}
