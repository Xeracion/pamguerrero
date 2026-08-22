import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { getDestinations } from "@/lib/sanity/queries";

export async function WhereToSection() {
  const destinations = await getDestinations();
  const [featured, ...rest] = destinations;

  if (!featured) {
    return (
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-coral">
            🌍 ¿A dónde vamos?
          </span>
          <p className="mt-4 max-w-xl font-body text-lg text-white/70">
            Todavía no hay destinos publicados. Vuelve pronto.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {featured.mainImage ? (
        <SanityImage
          image={featured.mainImage}
          fallbackLabel={`[FOTO EDITORIAL DE ${featured.name.toUpperCase()} — a pantalla completa]`}
          aspect="square"
          className="absolute inset-0 h-full w-full border-none"
        />
      ) : (
        <PhotoPlaceholder
          label={`[FOTO EDITORIAL DE ${featured.name.toUpperCase()} — a pantalla completa]`}
          aspect="square"
          className="absolute inset-0 h-full w-full border-none text-white/40"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,18,32,0.92) 0%, rgba(13,18,32,0.55) 38%, rgba(13,18,32,0.05) 65%)",
        }}
      />

      <div className="relative flex min-h-[85vh] flex-col justify-between px-6 py-12 sm:px-10 sm:py-16">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-sun px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink">
          🌍 ¿A dónde vamos?
        </span>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Link href={`/viajes/destinos/${featured.slug}`} className="group max-w-2xl">
            <span className="inline-block rounded-full bg-coral px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink">
              {featured.region}
            </span>
            <h2 className="mt-3 font-display text-5xl italic font-medium leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              {featured.name}
            </h2>
            <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-white/80">
              {featured.summary}
            </p>
            <span className="mt-4 inline-block font-body text-sm font-semibold text-white group-hover:underline">
              Guías · cultura · experiencias →
            </span>
          </Link>

          <div className="flex flex-col gap-3 sm:items-end">
            <p className="max-w-xs font-body text-sm leading-relaxed text-white/70 sm:text-right">
              {rest.length > 0
                ? "Más destinos, uno a uno, a medida que los voy documentando de verdad."
                : "Este es el primero. Voy a ir sumando destinos uno a uno, solo los que he vivido de verdad — nada de listas genéricas."}
            </p>
            <Link
              href="/viajes/destinos"
              className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-white hover:underline"
            >
              Ver todos los destinos →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
