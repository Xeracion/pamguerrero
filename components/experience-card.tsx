import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { Experience } from "@/lib/types";

export const TAG_COLOR: Record<Experience["tag"], string> = {
  Cultura: "text-turquoise-deep",
  "Experiencias internacionales": "text-cobalt",
  "Ampliar tu mundo": "text-hot-pink-deep",
  Historias: "text-coral-deep",
};

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link href={`/experiencias/${experience.slug}`} className="group flex flex-col gap-4">
      <PhotoPlaceholder
        label={`[FOTO PARA: ${experience.title}]`}
        aspect="landscape"
        className="transition-opacity group-hover:opacity-80"
      />
      <div>
        <span
          className={`font-body text-xs font-semibold uppercase tracking-[0.1em] ${TAG_COLOR[experience.tag]}`}
        >
          {experience.tag}
        </span>
        <h3 className="mt-2 font-display text-xl font-medium leading-snug text-ink group-hover:underline">
          {experience.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{experience.excerpt}</p>
        <p className="mt-3 font-body text-xs text-ink-muted">{experience.readingMinutes} min de lectura</p>
      </div>
    </Link>
  );
}
