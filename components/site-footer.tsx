import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/viajes", label: "Viajes grupales" },
  { href: "/explora/destinos", label: "Destinos" },
  { href: "/explora/ampliar-tu-mundo", label: "Ampliar tu mundo" },
  { href: "/explora/historias", label: "Historias" },
];

const ABOUT_LINKS = [
  { href: "/sobre-pam", label: "Sobre Pam" },
  { href: "/proyectos/caminando", label: "Caminando.lat" },
  { href: "/colabora", label: "Colabora" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold text-ink">
              Pam<span className="text-accent">.</span>Guerrero
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-muted">
              Amplía tu mundo. Historias, viajes y oportunidades para quienes creen que hay
              más de una forma de vivir.
            </p>
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Explora
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-ink hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Pam
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {ABOUT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-ink hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-ink-muted">
            © {new Date().getFullYear()} Pam Guerrero. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-ink-muted">
            Un proyecto de Pam Guerrero — fundadora de{" "}
            <a
              href="https://caminando.lat"
              className="underline decoration-line-strong underline-offset-4 hover:text-accent"
            >
              Caminando.lat
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
