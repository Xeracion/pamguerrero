import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
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
  alternates: { canonical: "/" },
  authors: [{ name: "Pam Guerrero", url: SITE_URL }],
  creator: "Pam Guerrero",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Pam Guerrero",
    url: SITE_URL,
    title: "Pam Guerrero — Amplía tu mundo",
    description:
      "Doctora en Turismo, exploradora de más de 30 países y fundadora de Caminando.lat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pam Guerrero — Amplía tu mundo",
    description:
      "Doctora en Turismo, exploradora de más de 30 países y fundadora de Caminando.lat.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1b3d",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
