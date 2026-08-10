import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const SITE_URL = "https://www.pamguerrero.com";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pam Guerrero — Amplía tu mundo",
    template: "%s | Pam Guerrero",
  },
  description:
    "Doctora en Turismo, exploradora de más de 30 países y fundadora de Caminando.lat. Historias, viajes grupales y experiencias internacionales para quienes creen que hay más de una forma de vivir.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Pam Guerrero",
    url: SITE_URL,
    title: "Pam Guerrero — Amplía tu mundo",
    description:
      "Doctora en Turismo, exploradora de más de 30 países y fundadora de Caminando.lat.",
  },
};

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
  publisher: { "@id": `${SITE_URL}/#pam-guerrero` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
      <body className="font-body antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
