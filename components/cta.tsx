import Link from "next/link";
import { RouteLine } from "@/components/route-line";

interface CtaProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function Cta({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CtaProps) {
  return (
    <section className="relative overflow-hidden bg-burgundy py-20 text-white">
      <RouteLine
        variant="wave"
        className="pointer-events-none absolute -bottom-4 left-1/2 h-14 w-[80%] -translate-x-1/2 text-white/10"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
        {eyebrow && (
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-4xl font-medium leading-[1.05] sm:text-5xl">{title}</h2>
        {description && (
          <p className="max-w-xl font-body text-base leading-relaxed text-white/85">
            {description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="rounded-full bg-coral px-7 py-3.5 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-px"
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/40 px-7 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:border-white"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
