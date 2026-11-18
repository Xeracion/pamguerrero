"use client";

import { useEffect, useRef, useState } from "react";
import type { Pregunta } from "@/lib/cumpleanos/preguntas";
import { salir } from "./actions";

type Fase = "intro" | "jugando" | "confirmando" | "revelando" | "fallo" | "plantado" | "ganado";
type Comodin = "cincuenta" | "publico" | "llamada";

interface Props {
  preguntas: Pregunta[];
  premios: string[];
  seguros: number[];
  mensajeFinal: string;
}

const LETRAS = ["A", "B", "C", "D"] as const;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Votos del público: casi siempre favorecen la correcta, menos cuanto más difícil. */
function votosDelPublico(correcta: number, visibles: number[], dificultad: number): number[] {
  const votos = [0, 0, 0, 0];
  const acierto = Math.random() < 0.9 - dificultad * 0.35;
  const favorita = acierto ? correcta : shuffle(visibles.filter((i) => i !== correcta))[0] ?? correcta;
  let restante = 100;
  const base = 40 + Math.floor(Math.random() * 30);
  votos[favorita] = base;
  restante -= base;
  const otras = visibles.filter((i) => i !== favorita);
  otras.forEach((i, n) => {
    const parte = n === otras.length - 1 ? restante : Math.floor(Math.random() * restante * 0.7);
    votos[i] = parte;
    restante -= parte;
  });
  return votos;
}

function IconoPublico({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16.5 14.6c2.5.2 4.3 1.9 5 5.4" />
    </svg>
  );
}

function IconoTelefono({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.6 6.6l1.4-2.3 4.5 1.8V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function azar() {
  return Math.random();
}

function Confeti() {
  const piezas = Array.from({ length: 60 }, (_, i) => i);
  const colores = ["#c49a45", "#d96f5f", "#438c8a", "#ffffff", "#7595a5"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {piezas.map((i) => (
        <span
          key={i}
          className="confeti absolute top-[-5%] block h-3 w-2 rounded-sm"
          style={{
            left: `${(i * 37) % 100}%`,
            background: colores[i % colores.length],
            animationDelay: `${(i % 12) * 0.25}s`,
            animationDuration: `${3 + (i % 5) * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Juego({ preguntas, premios, seguros, mensajeFinal }: Props) {
  const total = Math.min(preguntas.length, premios.length);
  const [fase, setFase] = useState<Fase>("intro");
  const [nivel, setNivel] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [ocultas, setOcultas] = useState<number[]>([]);
  const [usados, setUsados] = useState<Comodin[]>([]);
  const [publico, setPublico] = useState<number[] | null>(null);
  const [llamada, setLlamada] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const actual = preguntas[nivel];
  const visibles = [0, 1, 2, 3].filter((i) => !ocultas.includes(i));

  const premioGanado = (superadas: number) => (superadas > 0 ? premios[superadas - 1] : "0");
  const seguroAlcanzado = () => {
    const superados = seguros.filter((s) => s < nivel);
    return superados.length ? premios[superados[superados.length - 1]] : "0";
  };

  function empezar() {
    setFase("jugando");
    setNivel(0);
    setElegida(null);
    setOcultas([]);
    setUsados([]);
    setPublico(null);
    setLlamada(null);
  }

  function elegir(i: number) {
    if (fase !== "jugando" && fase !== "confirmando") return;
    setElegida(i);
    setFase("confirmando");
  }

  function confirmar() {
    if (elegida === null) return;
    setFase("revelando");
    timer.current = setTimeout(() => {
      if (elegida !== actual.correcta) {
        setFase("fallo");
        return;
      }
      timer.current = setTimeout(() => {
        if (nivel + 1 >= total) {
          setFase("ganado");
          return;
        }
        setNivel(nivel + 1);
        setElegida(null);
        setOcultas([]);
        setPublico(null);
        setLlamada(null);
        setFase("jugando");
      }, 1600);
    }, 2000);
  }

  function usarComodin(c: Comodin) {
    if (usados.includes(c) || (fase !== "jugando" && fase !== "confirmando")) return;
    setUsados([...usados, c]);
    const dificultad = nivel / Math.max(total - 1, 1);
    if (c === "cincuenta") {
      const incorrectas = shuffle(visibles.filter((i) => i !== actual.correcta));
      const quitar = incorrectas.slice(0, 2);
      setOcultas([...ocultas, ...quitar]);
      if (elegida !== null && quitar.includes(elegida)) {
        setElegida(null);
        setFase("jugando");
      }
    } else if (c === "publico") {
      setPublico(votosDelPublico(actual.correcta, visibles, dificultad));
    } else {
      if (actual.pista) {
        setLlamada(actual.pista);
      } else {
        const acierta = azar() < 0.85 - dificultad * 0.4;
        const opcion = acierta
          ? actual.correcta
          : shuffle(visibles.filter((i) => i !== actual.correcta))[0] ?? actual.correcta;
        const seguridad = acierta && dificultad < 0.4 ? "Estoy casi segura" : "No pongo la mano en el fuego, pero creo";
        setLlamada(`${seguridad}: es la ${LETRAS[opcion]}, «${actual.opciones[opcion]}».`);
      }
    }
  }

  function plantarse() {
    if (fase !== "jugando") return;
    setFase("plantado");
  }

  function resaltada(i: number) {
    if (i === elegida && fase !== "jugando") return true;
    return fase === "fallo" && i === actual.correcta;
  }

  function claseOpcion(i: number) {
    const base =
      "group relative flex w-full items-center gap-3 rounded-full border-2 px-5 py-4 text-left font-body text-sm transition sm:text-base";
    if (ocultas.includes(i)) return `${base} invisible`;
    const revelado = fase === "revelando" || fase === "fallo";
    if (revelado && fase === "fallo" && i === actual.correcta) {
      return `${base} border-turquoise bg-turquoise text-white animate-pulse`;
    }
    if (fase === "fallo" && i === elegida) return `${base} border-coral bg-coral-deep text-white`;
    if (fase === "revelando" && i === elegida) {
      return `${base} border-tangerine bg-tangerine text-ink-deep respuesta-revelando`;
    }
    if (fase === "confirmando" && i === elegida) {
      return `${base} border-tangerine bg-tangerine text-ink-deep`;
    }
    return `${base} border-tangerine/50 bg-ink-deep/70 text-white hover:border-tangerine hover:bg-cobalt`;
  }

  if (fase === "intro") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
        <p className="font-body text-xs font-semibold tracking-[0.3em] text-tangerine uppercase">Edición especial</p>
        <h1 className="mt-4 font-display text-5xl font-semibold sm:text-7xl">
          ¿Quién quiere ser <span className="italic text-tangerine">cumpleañera</span>?
        </h1>
        <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-white/80 sm:text-base">
          {total} preguntas sobre Pam, de la más fácil a la más difícil. Tienes tres comodines: 50:50, la ayuda del
          público y la llamada a un amigo. Al superar la pregunta {seguros[0] + 1} y la {seguros[1] + 1} aseguras el
          premio. ¿Lista?
        </p>
        <button
          onClick={empezar}
          className="mt-10 rounded-full bg-tangerine px-10 py-4 font-body text-sm font-bold tracking-widest text-ink-deep uppercase transition hover:bg-[#d6ad57]"
        >
          Empezar a jugar
        </button>
        <form action={salir} className="mt-8">
          <button type="submit" className="font-body text-xs text-white/50 underline hover:text-white">
            Cerrar sesión
          </button>
        </form>
      </div>
    );
  }

  if (fase === "ganado" || fase === "plantado") {
    const ganado = fase === "ganado";
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
        {ganado && <Confeti />}
        <p className="font-body text-xs font-semibold tracking-[0.3em] text-tangerine uppercase">
          {ganado ? "¡Lo lograste!" : "Te plantaste"}
        </p>
        <p className="mt-4 font-display text-6xl font-semibold text-tangerine sm:text-8xl">
          {ganado ? premios[total - 1] : premioGanado(nivel)}
        </p>
        <p className="mt-2 font-body text-sm text-white/70">puntos de cariño</p>
        <p className="mt-10 font-display text-2xl leading-snug italic sm:text-3xl">{mensajeFinal}</p>
        <button
          onClick={empezar}
          className="mt-10 rounded-full border-2 border-tangerine px-8 py-3 font-body text-sm font-bold tracking-widest text-tangerine uppercase transition hover:bg-tangerine hover:text-ink-deep"
        >
          Jugar otra vez
        </button>
      </div>
    );
  }

  const comodines: { id: Comodin; etiqueta: React.ReactNode; titulo: string }[] = [
    { id: "cincuenta", etiqueta: "50:50", titulo: "Elimina dos respuestas incorrectas" },
    { id: "publico", etiqueta: <IconoPublico />, titulo: "Pregunta al público" },
    { id: "llamada", etiqueta: <IconoTelefono />, titulo: "Llama a un amigo" },
  ];

  return (
    <div className="mx-auto grid min-h-dvh max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_260px] lg:py-12">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {comodines.map((c) => {
              const usado = usados.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => usarComodin(c.id)}
                  disabled={usado || (fase !== "jugando" && fase !== "confirmando")}
                  title={c.titulo}
                  aria-label={c.titulo}
                  className={`relative flex h-12 w-16 items-center justify-center rounded-full border-2 font-body text-sm font-bold transition ${
                    usado
                      ? "border-white/20 text-white/30 line-through"
                      : "border-tangerine text-tangerine hover:bg-tangerine hover:text-ink-deep"
                  }`}
                >
                  {c.etiqueta}
                </button>
              );
            })}
          </div>
          <button
            onClick={plantarse}
            disabled={fase !== "jugando" || nivel === 0}
            className="rounded-full border border-white/30 px-4 py-2 font-body text-xs font-semibold tracking-wide text-white/80 uppercase transition hover:border-white hover:text-white disabled:opacity-30"
          >
            Plantarme
          </button>
        </div>

        <div className="mt-4 font-body text-xs tracking-[0.2em] text-white/60 uppercase lg:hidden">
          Pregunta {nivel + 1} de {total} · por <span className="text-tangerine">{premios[nivel]}</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          {publico && (
            <div className="mx-auto mb-6 flex items-end gap-4" aria-label="Votos del público">
              {publico.map((v, i) =>
                ocultas.includes(i) ? null : (
                  <div key={i} className="flex w-12 flex-col items-center gap-1">
                    <span className="font-body text-xs text-white/80">{v}%</span>
                    <div className="flex h-24 w-full items-end rounded-t bg-white/10">
                      <div className="w-full rounded-t bg-tangerine transition-all" style={{ height: `${v}%` }} />
                    </div>
                    <span className="font-body text-xs font-bold text-tangerine">{LETRAS[i]}</span>
                  </div>
                ),
              )}
            </div>
          )}
          {llamada && (
            <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-white/20 bg-ink-deep/60 px-5 py-4 text-center font-body text-sm text-white/90">
              <IconoTelefono className="mr-2 inline h-4 w-4 align-[-2px] text-tangerine" />
              {llamada}
            </div>
          )}

          <div className="rounded-[2rem] border-2 border-tangerine/70 bg-ink-deep/80 px-6 py-8 text-center shadow-[0_0_40px_rgba(196,154,69,0.15)] sm:px-10">
            <h2 className="font-display text-2xl leading-snug font-semibold sm:text-3xl">{actual.pregunta}</h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {actual.opciones.map((opcion, i) => (
              <button
                key={i}
                onClick={() => elegir(i)}
                disabled={ocultas.includes(i) || (fase !== "jugando" && fase !== "confirmando")}
                className={claseOpcion(i)}
              >
                <span className={`font-bold ${resaltada(i) ? "" : "text-tangerine"}`}>{LETRAS[i]}:</span>
                <span>{opcion}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 min-h-24 text-center" aria-live="polite">
            {fase === "confirmando" && (
              <div className="flex flex-col items-center gap-3">
                <p className="font-display text-2xl italic">¿Es tu respuesta definitiva?</p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmar}
                    className="rounded-full bg-tangerine px-8 py-3 font-body text-sm font-bold tracking-widest text-ink-deep uppercase transition hover:bg-[#d6ad57]"
                  >
                    Sí, definitiva
                  </button>
                  <button
                    onClick={() => {
                      setElegida(null);
                      setFase("jugando");
                    }}
                    className="rounded-full border border-white/40 px-6 py-3 font-body text-sm font-semibold text-white/80 transition hover:border-white"
                  >
                    Pensarlo
                  </button>
                </div>
              </div>
            )}
            {fase === "revelando" && <p className="font-display text-2xl italic text-white/80">Veamos…</p>}
            {fase === "fallo" && (
              <div className="flex flex-col items-center gap-3">
                <p className="font-display text-3xl">¡Oh, no! La respuesta correcta era la {LETRAS[actual.correcta]}.</p>
                <p className="font-body text-sm text-white/75">
                  Te llevas <span className="font-bold text-tangerine">{seguroAlcanzado()}</span> puntos de cariño.
                </p>
                <p className="max-w-xl font-display text-xl italic text-white/90">{mensajeFinal}</p>
                <button
                  onClick={empezar}
                  className="mt-2 rounded-full border-2 border-tangerine px-8 py-3 font-body text-sm font-bold tracking-widest text-tangerine uppercase transition hover:bg-tangerine hover:text-ink-deep"
                >
                  Intentarlo de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ol className="hidden flex-col-reverse gap-1 self-center rounded-3xl border border-white/15 bg-ink-deep/60 p-4 lg:flex">
        {premios.slice(0, total).map((premio, i) => {
          const esActual = i === nivel;
          const superada = i < nivel;
          const seguro = seguros.includes(i);
          return (
            <li
              key={i}
              className={`flex items-center justify-between rounded-full px-4 py-1.5 font-body text-sm ${
                esActual ? "bg-tangerine font-bold text-ink-deep" : seguro ? "text-white" : "text-tangerine/80"
              } ${superada ? "opacity-50" : ""}`}
            >
              <span className="w-6 text-xs">{i + 1}</span>
              <span className={seguro && !esActual ? "font-bold" : ""}>{premio}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
