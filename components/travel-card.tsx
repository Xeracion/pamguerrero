import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { STATUS_LABEL } from "@/lib/data/trips";
import type { Trip } from "@/lib/types";

const STATUS_STYLE: Record<Trip["status"], string> = {
  proximo: "bg-gold/15 text-navy",
  "lista-espera": "bg-slate/15 text-slate",
  agotado: "bg-accent/10 text-accent",
  pasado: "bg-line text-ink-muted",
};

export function TravelCard({ trip }: { trip: Trip }) {
  return (
    <Link href={`/viajes/${trip.slug}`} className="group flex flex-col gap-4">
      <div className="relative">
        <PhotoPlaceholder
          label={`[FOTO DEL VIAJE: ${trip.title}]`}
          aspect="landscape"
          className="transition-opacity group-hover:opacity-80"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.06em] ${STATUS_STYLE[trip.status]}`}
        >
          {STATUS_LABEL[trip.status]}
        </span>
      </div>
      <div>
        <h3 className="font-display text-xl font-medium leading-snug text-ink group-hover:underline">
          {trip.title}
        </h3>
        <p className="mt-2 font-body text-sm text-ink-muted">
          {trip.dates} · {trip.durationDays} días
        </p>
        <p className="mt-1 font-body text-sm font-semibold text-accent">{trip.price}</p>
      </div>
    </Link>
  );
}
