import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { RouteLine } from "@/components/route-line";
import { getSiteSettings } from "@/lib/sanity/queries";

export async function StorySection() {
  const settings = await getSiteSettings();

  return (
    <section id="historia" className="relative overflow-hidden bg-burgundy py-24 sm:py-32">
      <RouteLine
        variant="zigzag"
        className="pointer-events-none absolute -left-10 bottom-10 h-16 w-[60%] text-white/10"
      />
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="relative mx-auto aspect-square w-full max-w-md lg:mx-0">
          <PhotoPlaceholder
            label="[REEMPLAZAR CON FOTO REAL DE PAM — momento de docencia o primer viaje]"
            aspect="portrait"
            tone="dark"
            className="absolute inset-y-0 left-0 w-[72%] border-none"
          />
          <PhotoPlaceholder
            label="[FOTO SECUNDARIA: PAM CON PERSONAS]"
            aspect="square"
            className="absolute right-0 top-0 w-[45%] rotate-3 border-4 border-burgundy shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          />
          <PhotoPlaceholder
            label="[FOTO TERCIARIA: DETALLE DE VIAJE]"
            aspect="square"
            className="absolute bottom-0 right-6 w-[38%] -rotate-2 border-4 border-burgundy shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {settings.storyEyebrow || "Por qué viajo"}
          </p>
          <h2 className="mt-4 font-display text-4xl italic font-medium leading-[1.05] text-white sm:text-5xl">
            {settings.storyHeadline || "No dejé mi trabajo para “convertirme en influencer”."}
          </h2>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-white/80">
            {settings.storyBody ||
              "Me hice una pregunta — ¿y si existe otra forma de vivir la mía? — y empecé a responderla un viaje a la vez. De ahí salió todo lo demás."}
          </p>
          <Link
            href="/sobre-pam"
            className="mt-8 inline-block font-body text-sm font-semibold text-white underline decoration-coral decoration-2 underline-offset-4 hover:decoration-white"
          >
            {settings.storyLinkLabel || "Conoce mi historia completa →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
