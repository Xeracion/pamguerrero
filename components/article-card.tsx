import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import type { ArticleSummary } from "@/lib/sanity/queries";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`/viajes/${article.category.slug}/${article.slug}`}
      className="group flex flex-col gap-4"
    >
      <SanityImage
        image={article.mainImage}
        fallbackLabel={`[FOTO PARA: ${article.title}]`}
        aspect="landscape"
        className="transition-opacity group-hover:opacity-80"
      />
      <div>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
          {article.category.label}
        </span>
        <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-ink group-hover:underline">
          {article.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
        <p className="mt-3 font-body text-xs text-ink-muted">{article.readingMinutes} min de lectura</p>
      </div>
    </Link>
  );
}
