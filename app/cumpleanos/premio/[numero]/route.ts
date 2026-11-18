import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { COOKIE_NAME, isValidToken } from "@/lib/cumpleanos/auth";
import { ARCHIVOS_PREMIO } from "@/lib/cumpleanos/archivos-premio";
import { PARTIDA_COOKIE, leerPartida } from "@/lib/cumpleanos/partida";
import { PREGUNTAS } from "@/lib/cumpleanos/preguntas";

const CARPETA = path.join(process.cwd(), "private", "cumpleanos");

/**
 * GET /cumpleanos/premio/5        → descarga el PDF del premio
 * GET /cumpleanos/premio/5?vista  → imagen de vista previa
 * Solo con sesión válida y una partida que haya superado esa pregunta.
 */
export async function GET(request: Request, { params }: { params: Promise<{ numero: string }> }) {
  const { numero } = await params;
  const n = Number(numero);
  const archivo = ARCHIVOS_PREMIO[n];
  if (!Number.isInteger(n) || !archivo) return new Response("No encontrado", { status: 404 });

  const cookieStore = await cookies();
  if (!isValidToken(cookieStore.get(COOKIE_NAME)?.value)) {
    return new Response("No autorizado", { status: 401 });
  }
  const partida = leerPartida(cookieStore.get(PARTIDA_COOKIE)?.value);
  const superadas = !partida ? 0 : partida.estado === "ganado" ? PREGUNTAS.length : partida.nivel;
  if (superadas < n) return new Response("Este premio todavía no es tuyo", { status: 403 });

  const vista = new URL(request.url).searchParams.has("vista");
  const datos = await readFile(path.join(CARPETA, vista ? archivo.vista : archivo.pdf));
  return new Response(new Uint8Array(datos), {
    headers: vista
      ? { "Content-Type": "image/jpeg", "Cache-Control": "private, max-age=3600" }
      : {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${archivo.nombreDescarga}"`,
          "Cache-Control": "private, no-store",
        },
  });
}
