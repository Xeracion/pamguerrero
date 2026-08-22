import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pam Guerrero — Amplía tu mundo";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#5d101d",
          backgroundImage: "linear-gradient(135deg, #5d101d 0%, #370a12 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: 2, backgroundColor: "#f72585" }} />
          <span
            style={{
              fontSize: 22,
              color: "#f72585",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            pamguerrero.com
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 92, color: "#ffffff", fontWeight: 600, lineHeight: 1.05 }}>
            Pam Guerrero
          </span>
          <span style={{ fontSize: 38, color: "#f72585", fontStyle: "italic" }}>
            Amplía tu mundo.
          </span>
        </div>

        <span style={{ fontSize: 24, color: "rgba(255, 255, 255, 0.7)" }}>
          Doctora en Turismo · +30 países · Fundadora de Caminando.lat
        </span>
      </div>
    ),
    { ...size }
  );
}
