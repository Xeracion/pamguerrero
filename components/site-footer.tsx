import Link from "next/link";
import { InstagramLink } from "@/components/instagram-link";
import { RouteLine } from "@/components/route-line";

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
    <footer className="relative overflow-hidden bg-burgundy text-white">
      <RouteLine
        variant="arc"
        className="pointer-events-none absolute -top-4 right-[8%] h-14 w-[40%] text-white/10"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold">
              pam<span className="text-coral">guerrero</span>
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/70">
              Viajar para ampliar tu mundo.
            </p>
            <InstagramLink className="mt-5 inline-block text-white/70 transition-colors hover:text-sun" />
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Navega
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {MAIN_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-white/90 hover:text-sun">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-white/90 hover:text-sun">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-8">
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} Pam Guerrero. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
