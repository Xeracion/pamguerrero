export function NewsletterCta() {
  return (
    <section className="bg-accent py-24 text-cream sm:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
          Una carta, de vez en cuando, sobre ampliar el mundo.
        </h2>
        <p className="font-body text-base leading-relaxed text-cream/85">
          Destinos, oportunidades y lo que voy aprendiendo por el camino — sin ruido, sin
          relleno.
        </p>

        <form className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row" aria-label="Suscripción al newsletter">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="tu@email.com"
            className="w-full rounded-full border border-cream/30 bg-cream/10 px-5 py-3 font-body text-sm text-cream placeholder:text-cream/60 focus-visible:outline-cream"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-full bg-gold px-6 py-3 font-body text-sm font-semibold text-navy transition-transform hover:-translate-y-px"
          >
            Suscribirme
          </button>
        </form>
        <p className="font-body text-xs text-cream/60">
          [PENDIENTE: conectar formulario a proveedor de email real]
        </p>
      </div>
    </section>
  );
}
