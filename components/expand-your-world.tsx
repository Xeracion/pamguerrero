import { SectionHeader } from "@/components/section-header";

const MEANINGS = [
  "Conocer otra cultura",
  "Viajar sin saber bien a dónde",
  "Aprender un idioma nuevo",
  "Vivir en otro país",
  "Conocer a alguien que piensa distinto",
  "Cuestionar lo que creías cierto",
  "Descubrir una oportunidad que no sabías que existía",
  "Empezar antes de tenerlo todo resuelto",
];

export function ExpandYourWorld() {
  return (
    <section className="bg-navy py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          tone="dark"
          eyebrow="La idea detrás de todo esto"
          title="Ampliar tu mundo no significa una sola cosa."
          description="Puede empezar con un vuelo o con una pregunta. Esto es a lo que me refiero cuando digo la frase."
        />

        <ul className="mt-14 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {MEANINGS.map((item, i) => (
            <li key={item} className="border-t border-cream/20 pt-4">
              <span className="font-body text-xs font-semibold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-display text-lg leading-snug text-cream/90">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
