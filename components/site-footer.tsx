import Link from "next/link";
import { InstagramLink } from "@/components/instagram-link";

const MAIN_LINKS = [
  { href: "/viaja-conmigo", label: "Viaja conmigo" },
  { href: "/viajes", label: "Viajes" },
  { href: "/experiencias", label: "Experiencias" },
  { href: "/sobre-pam", label: "Sobre Pam" },
  { href: "/trabaja-conmigo", label: "Trabaja conmigo" },
  { href: "/viajes-grupales", label: "Viajes grupales" },
];

const LEGAL_LINKS = [
  { href: "/contacto", label: "Contacto" },
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/cookies", label: "Cookies" },
  { href: "/aviso-legal", label: "Aviso legal" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold">
              pam<span className="text-coral">guerrero</span>
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream/70">
              Viajar para ampliar tu mundo.
            </p>
            <InstagramLink className="mt-5 inline-block text-cream/70 transition-colors hover:text-coral" />
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
              Navega
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {MAIN_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-cream/90 hover:text-coral">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-cream/90 hover:text-coral">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-8">
          <p className="font-body text-xs text-cream/50">
            © {new Date().getFullYear()} Pam Guerrero. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
