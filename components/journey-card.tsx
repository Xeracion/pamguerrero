import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import type { JourneyDoc } from "@/lib/sanity/queries";

export function JourneyCard({ journey }: { journey: JourneyDoc }) {
  return (
    <Link href={`/viaja-conmigo/${journey.slug}`} className="group flex flex-col gap-4">
      <SanityImage
        image={journey.mainImage}
        fallbackLabel={`[FOTO DE PAM EN ${journey.destination.name.toUpperCase()}]`}
        aspect="portrait"
        className="transition-opacity group-hover:opacity-80"
      />
      <div>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-coral-deep">
          {journey.destination.name}
        </span>
        <h3 className="mt-2 font-display text-3xl italic font-medium leading-snug text-ink group-hover:underline">
          {journey.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{journey.excerpt}</p>
      </div>
    </Link>
  );
}
