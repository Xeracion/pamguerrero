interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {eyebrow && (
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-ink-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
