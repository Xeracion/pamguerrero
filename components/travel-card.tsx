import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { STATUS_LABEL, isClosingSoon } from "@/lib/sanity/queries";
import type { TripSummary, TripStatus } from "@/lib/sanity/queries";

const STATUS_STYLE: Record<TripStatus, string> = {
  proximamente: "bg-cobalt/15 text-cobalt",
  "plazas-disponibles": "bg-turquoise/15 text-turquoise-deep",
  "ultimas-plazas": "bg-sun/25 text-ink",
  cerrado: "bg-line text-ink-muted",
};

export function TravelCard({ trip }: { trip: TripSummary }) {
  const urgent = isClosingSoon(trip);

  return (
    <Link href={`/viajes-grupales/${trip.slug}`} className="group flex flex-col gap-4">
      <div className="relative">
        <SanityImage
          image={trip.mainImage}
          fallbackLabel={`[FOTO DEL VIAJE: ${trip.title}]`}
          aspect="portrait"
          className="transition-opacity group-hover:opacity-80"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.06em] ${
            urgent ? "bg-coral text-cream" : STATUS_STYLE[trip.status]
          }`}
        >
          {urgent ? "Últimos días" : STATUS_LABEL[trip.status]}
        </span>
      </div>
      <div>
        <h3 className="font-display text-2xl italic font-medium leading-snug text-ink group-hover:underline">
          {trip.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
          &ldquo;{trip.personalNote}&rdquo;
        </p>
        <p className="mt-3 font-body text-xs uppercase tracking-[0.08em] text-ink-muted">
          {trip.dates} · {trip.durationDays} días
        </p>
      </div>
    </Link>
  );
}
