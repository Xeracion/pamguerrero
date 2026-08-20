import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { ArticleCard } from "@/components/article-card";
import { ARTICLES } from "@/lib/data/articles";

export function KnowledgeSection() {
  if (ARTICLES.length === 0) return null;

  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="🔎 Lo más buscado"
          title="Lo que más me preguntáis"
          description="Las dudas prácticas que más se repiten antes de un viaje internacional."
        />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Link
          href="/viajes"
          className="mt-10 inline-block font-body text-sm font-semibold text-accent hover:underline"
        >
          Ver todo en Viajes →
        </Link>
      </div>
    </section>
  );
}
