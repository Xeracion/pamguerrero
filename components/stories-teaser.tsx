import { SectionHeader } from "@/components/section-header";
import { JourneyCard } from "@/components/journey-card";
import { JOURNEYS } from "@/lib/data/journeys";

export function StoriesTeaser() {
  if (JOURNEYS.length === 0) return null;

  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Lo que he vivido"
          title="Historias, en primera persona"
          description="No consejos organizados por intención de búsqueda — esto es lo que yo he vivido."
        />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEYS.slice(0, 3).map((journey) => (
            <JourneyCard key={journey.slug} journey={journey} />
          ))}
        </div>
      </div>
    </section>
  );
}
