import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { getDestinations } from "@/lib/sanity/queries";

export async function WhereToSection() {
  const destinations = await getDestinations();
  const [featured, ...rest] = destinations;

  return (
    <section className="bg-ink py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-coral">
          🌍 ¿A dónde vamos?
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl italic font-medium leading-snug sm:text-4xl">
          Destinos que se sienten como capítulos, no como casillas de una lista.
        </h2>

        {featured ? (
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <Link href={`/viajes/destinos/${featured.slug}`} className="group flex flex-col gap-5">
              <SanityImage
                image={featured.mainImage}
                fallbackLabel={`[FOTO EDITORIAL DE ${featured.name.toUpperCase()}]`}
                aspect="wide"
                className="border-cream/20 bg-ink-deep text-cream/50 transition-opacity group-hover:opacity-85"
              />
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-turquoise">
                  {featured.region}
                </span>
                <h3 className="mt-2 font-display text-3xl italic font-medium">{featured.name}</h3>
                <p className="mt-2 max-w-md font-body text-base leading-relaxed text-cream/75">
                  {featured.summary}
                </p>
                <span className="mt-3 inline-block font-body text-sm font-semibold text-coral group-hover:underline">
                  Guías · cultura · experiencias →
                </span>
              </div>
            </Link>

            <div className="flex flex-col justify-center gap-6 border-t border-cream/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="font-body text-sm leading-relaxed text-cream/70">
                {rest.length > 0
                  ? "Más destinos, uno a uno, a medida que los voy documentando de verdad."
                  : "Este es el primero. Voy a ir sumando destinos uno a uno, solo los que he vivido de verdad — nada de listas genéricas."}
              </p>
              <Link
                href="/viajes/destinos"
                className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-cream hover:text-coral"
              >
                Ver todos los destinos →
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-14 font-body text-sm text-cream/70">
            Todavía no hay destinos publicados. Vuelve pronto.
          </p>
        )}
      </div>
    </section>
  );
}
