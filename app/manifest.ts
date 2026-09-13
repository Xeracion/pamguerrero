import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pam Guerrero — Amplía tu mundo",
    short_name: "Pam Guerrero",
    description:
      "Doctora en Turismo, exploradora de más de 30 países y fundadora de Caminando.lat.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5d101d",
    lang: "es",
  };
}
