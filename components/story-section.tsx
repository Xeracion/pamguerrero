import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export function StorySection() {
  return (
    <section id="historia" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <PhotoPlaceholder
          label="[REEMPLAZAR CON FOTO REAL DE PAM — momento de docencia o primer viaje]"
          aspect="portrait"
        />

        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-coral-deep">
            Por qué viajo
          </p>
          <h2 className="mt-4 font-display text-3xl italic font-medium leading-snug text-ink sm:text-4xl">
            No dejé mi trabajo para &ldquo;convertirme en influencer&rdquo;.
          </h2>
          <p className="mt-5 max-w-lg font-body text-lg leading-relaxed text-ink-muted">
            Me hice una pregunta — ¿y si existe otra forma de vivir la mía? — y empecé a
            responderla un viaje a la vez. De ahí salió todo lo demás.
          </p>
          <Link
            href="/sobre-pam"
            className="mt-6 inline-block font-body text-sm font-semibold text-accent hover:underline"
          >
            Conoce mi historia completa →
          </Link>
        </div>
      </div>
    </section>
  );
}
