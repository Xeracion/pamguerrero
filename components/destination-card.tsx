import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { Destination } from "@/lib/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/explora/destinos/${destination.slug}`} className="group flex flex-col gap-4">
      <PhotoPlaceholder
        label={`[FOTO DE ${destination.name.toUpperCase()}]`}
        aspect="landscape"
        className="transition-opacity group-hover:opacity-80"
      />
      <div>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-accent">
          {destination.region}
        </span>
        <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink group-hover:underline">
          {destination.name}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{destination.summary}</p>
      </div>
    </Link>
  );
}
