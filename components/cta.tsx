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
    <section className="bg-burgundy py-20 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
        {eyebrow && (
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">{title}</h2>
        {description && (
          <p className="max-w-xl font-body text-base leading-relaxed text-white/85">
            {description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="rounded-full bg-hot-pink px-7 py-3.5 font-body text-sm font-semibold text-ink transition-transform hover:-translate-y-px"
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
