import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { STATUS_LABEL, isClosingSoon } from "@/lib/data/trips";
import type { Trip } from "@/lib/types";

const STATUS_STYLE: Record<Trip["status"], string> = {
  proximamente: "bg-cobalt/15 text-cobalt",
  "plazas-disponibles": "bg-turquoise/15 text-turquoise-deep",
  "ultimas-plazas": "bg-sun/25 text-ink",
  cerrado: "bg-line text-ink-muted",
};

export function TravelCard({ trip }: { trip: Trip }) {
  const urgent = isClosingSoon(trip);

  return (
    <Link href={`/viajes-grupales/${trip.slug}`} className="group flex flex-col gap-4">
      <div className="relative">
        <PhotoPlaceholder
          label={`[FOTO DEL VIAJE: ${trip.title}]`}
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
