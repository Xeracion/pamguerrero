interface RouteLineProps {
  className?: string;
  variant?: "arc" | "wave" | "loop" | "zigzag";
}

const PATHS: Record<NonNullable<RouteLineProps["variant"]>, { d: string; start: [number, number]; end: [number, number] }> = {
  arc: { d: "M4 60C120 -10 280 -10 396 60", start: [4, 60], end: [396, 60] },
  wave: {
    d: "M4 30C80 70 160 -10 240 30C280 50 360 10 396 30",
    start: [4, 30],
    end: [396, 30],
  },
  loop: {
    d: "M4 50C60 -10 140 90 200 30C240 -10 300 -10 340 20C365 40 380 30 396 15",
    start: [4, 50],
    end: [396, 15],
  },
  zigzag: {
    d: "M4 15C60 65 100 5 160 55C210 95 260 5 320 45C345 63 375 45 396 55",
    start: [4, 15],
    end: [396, 55],
  },
};

/**
 * Abstract flight-route motif: a dashed curve with waypoint dots.
 * No literal airplane/globe/compass iconography — see brand guidelines.
 * Designed to sit over color blocks or photographs alike (currentColor).
 */
export function RouteLine({ className = "", variant = "arc" }: RouteLineProps) {
  const { d, start, end } = PATHS[variant];

  return (
    <svg
      viewBox="0 0 400 70"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx={start[0]} cy={start[1]} r="3.5" fill="currentColor" />
      <circle cx={end[0]} cy={end[1]} r="3.5" fill="currentColor" />
    </svg>
  );
}
