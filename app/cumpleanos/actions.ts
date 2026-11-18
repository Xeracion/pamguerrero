"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_MAX_AGE, COOKIE_NAME, checkPassword, isValidToken, tokenFor } from "@/lib/cumpleanos/auth";
import {
  PARTIDA_COOKIE,
  PARTIDA_MAX_AGE,
  codificarPartida,
  esAvance,
  leerPartida,
  validarPartida,
  type Partida,
} from "@/lib/cumpleanos/partida";

export interface LoginState {
  error: string | null;
}

export async function entrar(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const attempt = String(formData.get("password") ?? "");

  if (!checkPassword(attempt)) {
    // Pequeña pausa para frenar intentos por fuerza bruta.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "Esa no es la contraseña. ¡Inténtalo otra vez!" };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, tokenFor(attempt.trim().toLowerCase()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/cumpleanos",
    maxAge: COOKIE_MAX_AGE,
  });
  redirect("/cumpleanos");
}

export async function salir() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: COOKIE_NAME, path: "/cumpleanos" });
  redirect("/cumpleanos");
}

/** Guarda el progreso de la partida. Devuelve false si el cambio no es válido. */
export async function guardarPartida(nueva: Partida): Promise<boolean> {
  const cookieStore = await cookies();
  if (!isValidToken(cookieStore.get(COOKIE_NAME)?.value)) return false;
  const valida = validarPartida(nueva);
  if (!valida) return false;
  const vieja = leerPartida(cookieStore.get(PARTIDA_COOKIE)?.value);
  if (!esAvance(vieja, valida)) return false;
  const valor = codificarPartida(valida);
  if (!valor) return false;
  cookieStore.set(PARTIDA_COOKIE, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/cumpleanos",
    maxAge: PARTIDA_MAX_AGE,
  });
  return true;
}
