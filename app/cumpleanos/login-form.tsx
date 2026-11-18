"use client";

import { useActionState } from "react";
import { entrar, type LoginState } from "./actions";

const INITIAL: LoginState = { error: null };

export function LoginForm({ configurado }: { configurado: boolean }) {
  const [state, action, pending] = useActionState(entrar, INITIAL);

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <p className="font-body text-xs font-semibold tracking-[0.3em] text-tangerine uppercase">
        Acceso privado
      </p>
      <h1 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">
        ¿Quién quiere ser <span className="italic text-tangerine">cumpleañera</span>?
      </h1>
      <p className="mt-5 font-body text-sm leading-relaxed text-white/75">
        Esta página es una sorpresa. Escribe la contraseña para entrar al juego.
      </p>

      {configurado ? (
        <form action={action} className="mt-10 w-full space-y-4">
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder="Contraseña"
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "password-error" : undefined}
            className="w-full rounded-full border-2 border-tangerine/60 bg-ink-deep/60 px-6 py-4 text-center font-body text-base text-white placeholder:text-white/40 focus:border-tangerine focus:outline-none focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-tangerine px-6 py-4 font-body text-sm font-bold tracking-widest text-ink-deep uppercase transition hover:bg-[#d6ad57] disabled:opacity-60"
          >
            {pending ? "Comprobando…" : "Entrar"}
          </button>
          {state.error && (
            <p id="password-error" role="alert" className="font-body text-sm text-coral">
              {state.error}
            </p>
          )}
        </form>
      ) : (
        <p className="mt-10 rounded-2xl border border-white/20 px-6 py-4 font-body text-sm text-white/80">
          La página todavía no tiene contraseña configurada.
        </p>
      )}
    </div>
  );
}
