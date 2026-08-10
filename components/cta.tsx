import Link from "next/link";

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
    <section className="bg-navy py-20 text-cream">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
        {eyebrow && (
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">{title}</h2>
        {description && (
          <p className="max-w-xl font-body text-base leading-relaxed text-cream/85">
            {description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold text-navy transition-transform hover:-translate-y-px"
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="rounded-full border border-cream/40 px-7 py-3.5 font-body text-sm font-semibold text-cream transition-colors hover:border-cream"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
