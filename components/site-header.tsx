"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/sobre-pam", label: "Sobre Pam" },
  { href: "/viajes", label: "Viajes" },
  { href: "/explora", label: "Explora" },
  { href: "/proyectos/caminando", label: "Caminando.lat" },
  { href: "/colabora", label: "Colabora" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Pam<span className="text-accent">.</span>Guerrero
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-body text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/newsletter"
            className="hidden rounded-full bg-accent px-5 py-2.5 font-body text-sm font-semibold text-cream transition-transform hover:-translate-y-px sm:inline-block"
          >
            Newsletter
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-6 py-4 lg:hidden" aria-label="Navegación móvil">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-body text-base font-medium text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/newsletter"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-accent px-5 py-2.5 font-body text-sm font-semibold text-cream"
              >
                Newsletter
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
