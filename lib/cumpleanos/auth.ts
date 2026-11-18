import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Acceso a /felices35. La contraseña vive solo en el servidor, en la
 * variable de entorno CUMPLEANOS_PASSWORD (nunca con prefijo NEXT_PUBLIC_).
 * La cookie no guarda la contraseña sino un HMAC derivado de ella: no se
 * puede falsificar sin conocerla, y cambiar la contraseña invalida todas
 * las sesiones abiertas.
 */
export const COOKIE_NAME = "cumple_acceso";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

function getPassword(): string | null {
  const password = process.env.CUMPLEANOS_PASSWORD;
  return password && password.length > 0 ? password : null;
}

export function isConfigured(): boolean {
  return getPassword() !== null;
}

export function tokenFor(password: string): string {
  return createHmac("sha256", password).update("cumpleanos-acceso-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** Compara sin distinguir mayúsculas ni espacios sobrantes en los extremos. */
export function checkPassword(attempt: string): boolean {
  const password = getPassword();
  if (!password) return false;
  return safeEqual(tokenFor(attempt.trim().toLowerCase()), tokenFor(password.trim().toLowerCase()));
}

export function isValidToken(token: string | undefined): boolean {
  const password = getPassword();
  if (!password || !token) return false;
  return safeEqual(token, tokenFor(password.trim().toLowerCase()));
}
