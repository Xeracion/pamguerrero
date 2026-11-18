import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Estado de la única partida permitida. Se guarda en una cookie httpOnly
 * firmada con HMAC (clave derivada de CUMPLEANOS_PASSWORD), así que no se
 * puede editar desde el navegador. El servidor solo acepta cambios que
 * avanzan: no se baja de pregunta, no se recupera un comodín y una partida
 * terminada ya no cambia.
 */
export const PARTIDA_COOKIE = "cumple_partida";
export const PARTIDA_MAX_AGE = 60 * 60 * 24 * 365;

export interface Partida {
  /** Pregunta actual (0-based). En una partida terminada, la última jugada. */
  nivel: number;
  estado: "jugando" | "fallo" | "ganado";
  cincuenta: boolean;
  llamada: boolean;
  /** Respuestas eliminadas por el 50:50 en la pregunta actual. */
  ocultas: number[];
  /** Respuesta elegida en la pregunta que terminó la partida. */
  elegida: number | null;
}

function clave(): string | null {
  const password = process.env.CUMPLEANOS_PASSWORD;
  return password ? `partida:${password.trim().toLowerCase()}` : null;
}

function firmar(datos: string, k: string) {
  return createHmac("sha256", k).update(datos).digest("base64url");
}

export function codificarPartida(p: Partida): string | null {
  const k = clave();
  if (!k) return null;
  const datos = Buffer.from(JSON.stringify(p)).toString("base64url");
  return `${datos}.${firmar(datos, k)}`;
}

export function leerPartida(valor: string | undefined): Partida | null {
  const k = clave();
  if (!k || !valor) return null;
  const [datos, firma] = valor.split(".");
  if (!datos || !firma) return null;
  const esperada = Buffer.from(firmar(datos, k));
  const recibida = Buffer.from(firma);
  if (esperada.length !== recibida.length || !timingSafeEqual(esperada, recibida)) return null;
  try {
    return validarPartida(JSON.parse(Buffer.from(datos, "base64url").toString()));
  } catch {
    return null;
  }
}

export function validarPartida(x: unknown): Partida | null {
  if (!x || typeof x !== "object") return null;
  const p = x as Record<string, unknown>;
  const indice = (v: unknown) => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 3;
  if (!Number.isInteger(p.nivel) || (p.nivel as number) < 0 || (p.nivel as number) > 50) return null;
  if (p.estado !== "jugando" && p.estado !== "fallo" && p.estado !== "ganado") return null;
  if (typeof p.cincuenta !== "boolean" || typeof p.llamada !== "boolean") return null;
  if (!Array.isArray(p.ocultas) || p.ocultas.length > 2 || !p.ocultas.every(indice)) return null;
  if (p.elegida !== null && !indice(p.elegida)) return null;
  return {
    nivel: p.nivel as number,
    estado: p.estado,
    cincuenta: p.cincuenta,
    llamada: p.llamada,
    ocultas: p.ocultas as number[],
    elegida: p.elegida as number | null,
  };
}

/** ¿Es `nueva` un paso válido desde `vieja`? */
export function esAvance(vieja: Partida | null, nueva: Partida): boolean {
  if (!vieja) return nueva.nivel === 0 && nueva.estado === "jugando" && !nueva.cincuenta && !nueva.llamada;
  if (vieja.estado !== "jugando") return false;
  if (nueva.nivel < vieja.nivel) return false;
  if (vieja.cincuenta && !nueva.cincuenta) return false;
  if (vieja.llamada && !nueva.llamada) return false;
  return true;
}
