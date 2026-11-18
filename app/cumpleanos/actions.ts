"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_MAX_AGE, COOKIE_NAME, checkPassword, tokenFor } from "@/lib/cumpleanos/auth";

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
