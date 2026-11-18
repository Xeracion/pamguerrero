import type { Metadata } from "next";
import { cookies } from "next/headers";
import { COOKIE_NAME, isConfigured, isValidToken } from "@/lib/cumpleanos/auth";
import { PARTIDA_COOKIE, leerPartida } from "@/lib/cumpleanos/partida";
import { ARCHIVOS_PREMIO } from "@/lib/cumpleanos/archivos-premio";
import { GIRO_FINAL, MENSAJE_FALLO, MENSAJE_FINAL, MENSAJES_PREMIO, PREGUNTA_SEGURO, PREGUNTAS, PREMIOS, TELEFONO_AMIGO } from "@/lib/cumpleanos/preguntas";
import { LoginForm } from "./login-form";
import { Juego } from "./juego";

export const metadata: Metadata = {
  title: "Cumpleaños",
  robots: { index: false, follow: false },
};

export default async function CumpleanosPage() {
  const cookieStore = await cookies();
  const autorizado = isValidToken(cookieStore.get(COOKIE_NAME)?.value);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[radial-gradient(ellipse_at_top,#24456a_0%,#18304a_45%,#0e1822_100%)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(196,154,69,0.22),transparent)]"
      />
      <div className="relative">
        {autorizado ? (
          <Juego
            preguntas={PREGUNTAS}
            premios={PREMIOS}
            preguntaSeguro={PREGUNTA_SEGURO}
            telefono={TELEFONO_AMIGO}
            mensajeFinal={MENSAJE_FINAL}
            giroFinal={GIRO_FINAL}
            mensajeFallo={MENSAJE_FALLO}
            mensajesPremio={MENSAJES_PREMIO}
            descargables={Object.keys(ARCHIVOS_PREMIO).map(Number)}
            partidaInicial={leerPartida(cookieStore.get(PARTIDA_COOKIE)?.value)}
          />
        ) : (
          <LoginForm configurado={isConfigured()} />
        )}
      </div>
    </main>
  );
}
