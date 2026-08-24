interface PlaneIconProps {
  className?: string;
}

/**
 * Minimal linear plane glyph — a small, abstract travel mark, not a literal
 * illustration. Meant for sparing use as a graphic accent (currentColor).
 */
export function PlaneIcon({ className = "" }: PlaneIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 12.5L21 6.5c.7-.23 1.23.3 1 1L15 21l-2-7-7-2 16.5-6.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
