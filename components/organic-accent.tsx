interface OrganicAccentProps {
  className?: string;
}

/**
 * A soft, irregular blob — a small "mancha" of color, purely decorative.
 * Absolutely positioned by the caller; never affects document flow.
 */
export function OrganicAccent({ className = "" }: OrganicAccentProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M52.4 26.6c22.9-14.5 54.6-13 74.7 3.9 20.5 17.3 30 46.5 22.6 72.2-7.3 25.5-31.4 43.5-56.7 48.9-26.2 5.6-56.1-2.1-71.9-24.1C4.9 105.6 3.6 73 18.9 51.4 27 40.1 40.6 34 52.4 26.6Z"
      />
    </svg>
  );
}
