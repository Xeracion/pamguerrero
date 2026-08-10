import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/types";

export function RelatedContent({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-medium text-ink">Sigue leyendo</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
