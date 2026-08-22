import { jsonLdString } from "@/lib/json-ld";
import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbsJsonLd } from "@/components/breadcrumbs";
import { PageHeader } from "@/components/page-header";

const SITE_URL = "https://www.pamguerrero.com";

export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false, follow: true },
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  const crumbs = [{ label: "Inicio", href: "/" }, { label: "Aviso legal" }];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbsJsonLd(crumbs, SITE_URL)) }}
      />
      <Breadcrumbs items={crumbs} />
      <PageHeader eyebrow="Legal" title="Aviso legal" />
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <p className="font-body text-base leading-relaxed text-ink-muted">
          [PENDIENTE: identificación fiscal y datos de la titularidad del sitio a la espera de
          confirmación. No se publican datos legales inventados.]
        </p>
      </div>
    </main>
  );
}
