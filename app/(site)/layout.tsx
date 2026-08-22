import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const SITE_URL = "https://www.pamguerrero.com";

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#pam-guerrero`,
  name: "Pam Guerrero",
  url: SITE_URL,
  jobTitle: ["Doctora en Turismo", "Creadora de contenido", "Líder de viajes grupales"],
  nationality: "Ecuatoriana",
  homeLocation: ["Ecuador", "España"],
  description:
    "Doctora en Turismo, exdocente universitaria e investigadora ecuatoriana que ha recorrido más de 30 países. Fundadora de Caminando.lat.",
  knowsAbout: [
    "Turismo",
    "Viajes grupales",
    "Experiencias internacionales",
    "Cultura",
    "Exploración",
  ],
  founder: {
    "@type": "Organization",
    name: "Caminando.lat",
    url: "https://caminando.lat",
  },
  sameAs: [
    // [INSERTAR URL VERIFICADA: Instagram]
    // [INSERTAR URL VERIFICADA: YouTube]
    // [INSERTAR URL VERIFICADA: TikTok]
    // [INSERTAR URL VERIFICADA: LinkedIn]
  ],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pam Guerrero",
  url: SITE_URL,
  inLanguage: "es",
  publisher: { "@id": `${SITE_URL}/#pam-guerrero` },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-body focus:text-sm focus:font-semibold focus:text-cream"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <div id="main-content">{children}</div>
      <SiteFooter />
    </>
  );
}
