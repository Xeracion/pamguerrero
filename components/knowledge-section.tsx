import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { ArticleCard } from "@/components/article-card";
import { OrganicAccent } from "@/components/organic-accent";
import { getArticles } from "@/lib/sanity/queries";

export async function KnowledgeSection() {
  const articles = await getArticles();
  if (articles.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <OrganicAccent className="pointer-events-none absolute -right-20 top-10 h-80 w-80 text-tangerine/10" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="🔎 Lo más buscado"
          title="Lo que más me preguntáis"
          description="Las dudas prácticas que más se repiten antes de un viaje internacional."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <div
              key={article.slug}
              className="rounded-2xl border border-line border-t-2 border-t-tangerine bg-white p-5 shadow-[0_16px_36px_-20px_rgba(23,32,51,0.2)]"
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
        <Link
          href="/viajes"
          className="mt-10 inline-block font-body text-sm font-semibold text-ink underline decoration-2 underline-offset-4 hover:no-underline"
        >
          Ver todo en Viajes →
        </Link>
      </div>
    </section>
  );
}
