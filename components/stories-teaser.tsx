import { SectionHeader } from "@/components/section-header";
import { JourneyCard } from "@/components/journey-card";
import { getJourneys } from "@/lib/sanity/queries";

export async function StoriesTeaser() {
  const journeys = await getJourneys();
  if (journeys.length === 0) return null;

  const [featured, ...rest] = journeys.slice(0, 4);

  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Lo que he vivido"
          title="Historias, en primera persona"
          description="No consejos organizados por intención de búsqueda — esto es lo que yo he vivido."
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <JourneyCard journey={featured} />
          {rest.length > 0 && (
            <div className="flex flex-col gap-10 border-t border-line pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {rest.map((journey) => (
                <JourneyCard key={journey.slug} journey={journey} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
