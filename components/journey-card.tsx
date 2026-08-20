import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { Journey } from "@/lib/types";

export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link href={`/viaja-conmigo/${journey.slug}`} className="group flex flex-col gap-4">
      <PhotoPlaceholder
        label={`[FOTO DE PAM EN ${journey.destinationName.toUpperCase()}]`}
        aspect="portrait"
        className="transition-opacity group-hover:opacity-80"
      />
      <div>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-coral-deep">
          {journey.destinationName}
        </span>
        <h3 className="mt-2 font-display text-2xl italic font-medium leading-snug text-ink group-hover:underline">
          {journey.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{journey.excerpt}</p>
      </div>
    </Link>
  );
}
