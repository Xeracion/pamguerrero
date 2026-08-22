import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PrivacidadPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Política de privacidad" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader eyebrow="Legal" title="Política de privacidad" />
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <p className="font-body text-base leading-relaxed text-ink-muted">
          [PENDIENTE: esta política de privacidad está en preparación con los datos legales
          reales del responsable del tratamiento. Se publicará antes de que el sitio recoja
          datos personales en producción — no se publica contenido legal genérico o de
          relleno.]
        </p>
      </div>
    </main>
  );
}
