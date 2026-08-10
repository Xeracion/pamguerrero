import { SectionHeader } from "@/components/section-header";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

const CHAPTERS = [
  {
    title: "Ecuador",
    body: "Empecé donde empieza casi todo el mundo: creyendo que había un solo camino correcto para construir una vida.",
  },
  {
    title: "Docencia universitaria",
    body: "Años de aula, investigación y jornadas larguísimas. Aprendí a explicar el turismo antes de vivirlo por mi cuenta.",
  },
  {
    title: "Doctorado en Turismo",
    body: "Investigar de cerca una industria que existe, precisamente, para que las personas puedan salir a ver otras formas de vivir.",
  },
  {
    title: "Una pregunta",
    body: "¿Y si existe otra forma de vivir la mía? No fue una crisis: fue una pregunta que no pude dejar de hacerme.",
  },
  {
    title: "Viajes y oportunidades",
    body: "Empecé a buscar. Becas, proyectos, billetes baratos, gente que ya lo había hecho. El mundo tenía más puertas de las que parecía.",
  },
  {
    title: "Contenido y vida internacional",
    body: "Contar lo que iba aprendiendo se convirtió en trabajo. España se convirtió en casa. Más de 30 países se convirtieron en referencia, no en cifra.",
  },
  {
    title: "Proyectos y comunidad",
    body: "De ahí nació Caminando.lat, y de ahí nace esta casa digital: un lugar para seguir ampliando el mundo, en compañía.",
  },
];

export function StorySection() {
  return (
    <section id="historia" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Mi historia"
          title="Me atreví a buscar otra forma de vivir."
          description="No dejé mi trabajo para 'convertirme en influencer'. Me hice una pregunta y empecé a seguirla, un viaje a la vez."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <PhotoPlaceholder
            label="[REEMPLAZAR CON FOTO REAL DE PAM — momento de docencia o primer viaje]"
            aspect="portrait"
            className="lg:sticky lg:top-28"
          />

          <ol className="flex flex-col gap-10 border-l border-line pl-8">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.title} className="relative">
                <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                <h3 className="font-display text-xl font-medium text-ink">{chapter.title}</h3>
                <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-ink-muted">
                  {chapter.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
