import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { getCategory } from "@/lib/data/categories";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  const category = getCategory(article.category);

  return (
    <Link
      href={`/explora/${article.category}/${article.slug}`}
      className="group flex flex-col gap-4"
    >
      <PhotoPlaceholder
        label={`[FOTO PARA: ${article.title}]`}
        aspect="landscape"
        className="transition-opacity group-hover:opacity-80"
      />
      <div>
        {category && (
          <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
            {category.label}
          </span>
        )}
        <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink group-hover:underline">
          {article.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
        <p className="mt-3 font-body text-xs text-ink-muted">{article.readingMinutes} min de lectura</p>
      </div>
    </Link>
  );
}
