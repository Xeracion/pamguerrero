interface RouteLineProps {
  className?: string;
  variant?: "arc" | "wave";
}

/**
 * Abstract flight-route motif: a dashed curve with waypoint dots.
 * No literal airplane/globe/compass iconography — see brand guidelines.
 */
export function RouteLine({ className = "", variant = "arc" }: RouteLineProps) {
  const path =
    variant === "arc"
      ? "M4 60C120 -10 280 -10 396 60"
      : "M4 30C80 70 160 -10 240 30C280 50 360 10 396 30";

  return (
    <svg
      viewBox="0 0 400 70"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d={path} stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="4" cy={variant === "arc" ? 60 : 30} r="3.5" fill="currentColor" />
      <circle cx="396" cy={variant === "arc" ? 60 : 30} r="3.5" fill="currentColor" />
    </svg>
  );
}
