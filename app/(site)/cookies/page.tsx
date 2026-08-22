import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Política de cookies",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Cookies" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader eyebrow="Legal" title="Política de cookies" />
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <p className="font-body text-base leading-relaxed text-ink-muted">
          [PENDIENTE: este sitio todavía no instala cookies de analítica ni de terceros. En
          cuanto se añada cualquier servicio que las requiera, esta página detallará
          exactamente qué cookies se usan, con qué finalidad y cómo gestionarlas.]
        </p>
      </div>
    </main>
  );
}
