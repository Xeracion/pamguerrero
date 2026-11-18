"use client";

import { useEffect, useRef, useState } from "react";
import type { Pregunta } from "@/lib/cumpleanos/preguntas";
import { salir } from "./actions";
import { Musica } from "./musica";

type Fase = "intro" | "jugando" | "confirmando" | "revelando" | "acierto" | "fallo" | "ganado";

interface Props {
  preguntas: Pregunta[];
  premios: Record<number, string>;
  preguntaSeguro: number;
  telefono: string;
  mensajeFinal: string;
}

const LETRAS = ["A", "B", "C", "D"] as const;

function azar() {
  return Math.random();
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** +34684126167 → +34 684 12 61 67 */
function telefonoLegible(tel: string) {
  const m = tel.match(/^(\+\d{2})(\d{3})(\d{2})(\d{2})(\d{2})$/);
  return m ? `${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}` : tel;
}

function IconoTelefono({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.6 6.6l1.4-2.3 4.5 1.8V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function IconoRegalo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

function IconoSonido({ silenciada }: { silenciada: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      {silenciada ? <path d="m17 9 5 6M22 9l-5 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
    </svg>
  );
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

export function Juego({ preguntas, premios, preguntaSeguro, telefono, mensajeFinal }: Props) {
  const total = preguntas.length;
  const [fase, setFase] = useState<Fase>("intro");
  const [nivel, setNivel] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [ocultas, setOcultas] = useState<number[]>([]);
  const [cincuentaUsado, setCincuentaUsado] = useState(false);
  const [llamadaUsada, setLlamadaUsada] = useState(false);
  const [llamando, setLlamando] = useState(false);
  const [silenciada, setSilenciada] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const musica = useRef<Musica | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      musica.current?.cerrar();
    },
    [],
  );

  const actual = preguntas[nivel];
  const visibles = [0, 1, 2, 3].filter((i) => !ocultas.includes(i));
  const enJuego = fase === "jugando" || fase === "confirmando";

  /** Premios conseguidos al fallar habiendo superado `superadas` preguntas. */
  const premiosAsegurados = (superadas: number) =>
    Object.keys(premios)
      .map(Number)
      .filter((n) => n <= superadas && n <= preguntaSeguro)
      .map((n) => premios[n]);

  function empezar() {
    if (!musica.current) musica.current = new Musica();
    musica.current.iniciar();
    musica.current.setSilencio(silenciada);
    musica.current.setNivel(0);
    musica.current.setModo("juego");
    setFase("jugando");
    setNivel(0);
    setElegida(null);
    setOcultas([]);
    setCincuentaUsado(false);
    setLlamadaUsada(false);
    setLlamando(false);
  }

  function alternarSonido() {
    const nuevo = !silenciada;
    setSilenciada(nuevo);
    musica.current?.setSilencio(nuevo);
  }

  function elegir(i: number) {
    if (!enJuego) return;
    setElegida(i);
    setFase("confirmando");
  }

  function confirmar() {
    if (elegida === null) return;
    setFase("revelando");
    setLlamando(false);
    musica.current?.setModo("suspense");
    timer.current = setTimeout(() => {
      if (elegida !== actual.correcta) {
        musica.current?.fallo();
        setFase("fallo");
        return;
      }
      if (nivel + 1 >= total) {
        musica.current?.victoria();
        setFase("ganado");
        return;
      }
      musica.current?.acierto();
      setFase("acierto");
      const pausa = premios[nivel + 1] ? 3200 : 1800;
      timer.current = setTimeout(() => {
        setNivel(nivel + 1);
        setElegida(null);
        setOcultas([]);
        setLlamando(false);
        musica.current?.setNivel(nivel + 1);
        musica.current?.setModo("juego");
        setFase("jugando");
      }, pausa);
    }, 3000);
  }

  function usarCincuenta() {
    if (cincuentaUsado || !enJuego) return;
    setCincuentaUsado(true);
    musica.current?.comodin();
    const quitar = shuffle(visibles.filter((i) => i !== actual.correcta)).slice(0, 2);
    setOcultas([...ocultas, ...quitar]);
    if (elegida !== null && quitar.includes(elegida)) {
      setElegida(null);
      setFase("jugando");
    }
  }

  function usarLlamada() {
    // El enlace tel: abre la llamada; aquí solo marcamos el comodín como usado.
    setLlamadaUsada(true);
    setLlamando(true);
    musica.current?.comodin();
  }

  function resaltada(i: number) {
    if (i === elegida && fase !== "jugando") return true;
    return fase === "fallo" && i === actual.correcta;
  }

  function claseOpcion(i: number) {
    const base =
      "relative flex w-full items-center gap-3 rounded-full border-2 px-5 py-4 text-left font-body text-sm transition sm:text-base";
    if (ocultas.includes(i)) return `${base} invisible`;
    if (fase === "fallo" && i === actual.correcta) return `${base} border-turquoise bg-turquoise text-white animate-pulse`;
    if (fase === "fallo" && i === elegida) return `${base} border-coral bg-coral-deep text-white`;
    if (fase === "acierto" && i === elegida) return `${base} border-turquoise bg-turquoise text-white`;
    if (fase === "revelando" && i === elegida) return `${base} border-tangerine bg-tangerine text-ink-deep respuesta-revelando`;
    if (fase === "confirmando" && i === elegida) return `${base} border-tangerine bg-tangerine text-ink-deep`;
    return `${base} border-tangerine/50 bg-ink-deep/70 text-white hover:border-tangerine hover:bg-cobalt`;
  }

  const botonSonido = (
    <button
      onClick={alternarSonido}
      aria-label={silenciada ? "Activar música" : "Silenciar música"}
      title={silenciada ? "Activar música" : "Silenciar música"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white/80 transition hover:border-white hover:text-white"
    >
      <IconoSonido silenciada={silenciada} />
    </button>
  );

  if (fase === "intro") {
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
        <p className="font-body text-xs font-semibold tracking-[0.3em] text-tangerine uppercase">Edición especial</p>
        <h1 className="mt-4 font-display text-5xl font-semibold sm:text-7xl">
          ¿Quién quiere ser <span className="italic text-tangerine">cumpleañera</span>?
        </h1>
        <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-white/80 sm:text-base">
          {total} preguntas sobre Pam, de la más fácil a la más difícil. La pregunta {preguntaSeguro} y la pregunta{" "}
          {total} tienen premio, y al llegar a la {preguntaSeguro} el primero queda asegurado. Tienes dos comodines: el
          50:50 y la llamada a un amigo. Sube el volumen. ¿Lista?
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

  if (fase === "ganado") {
    const todos = Object.values(premios);
    return (
      <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
        <Confeti />
        <p className="font-body text-xs font-semibold tracking-[0.3em] text-tangerine uppercase">¡Lo lograste!</p>
        <p className="mt-4 font-display text-5xl font-semibold sm:text-7xl">
          {total} de {total}
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {todos.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2 rounded-full bg-tangerine px-5 py-2 font-body text-sm font-bold text-ink-deep"
            >
              <IconoRegalo /> {p}
            </li>
          ))}
        </ul>
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

  const asegurados = premiosAsegurados(nivel);
  const premioDeEsta = premios[nivel + 1];

  return (
    <div className="mx-auto grid min-h-dvh max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_280px] lg:py-12">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={usarCincuenta}
              disabled={cincuentaUsado || !enJuego}
              title="Elimina dos respuestas incorrectas"
              aria-label="Comodín 50:50: elimina dos respuestas incorrectas"
              className={`flex h-12 w-16 items-center justify-center rounded-full border-2 font-body text-sm font-bold transition ${
                cincuentaUsado
                  ? "border-white/20 text-white/30 line-through"
                  : "border-tangerine text-tangerine hover:bg-tangerine hover:text-ink-deep"
              }`}
            >
              50:50
            </button>
            {llamadaUsada || !enJuego ? (
              <span
                aria-disabled
                title="Llamada a un amigo"
                className={`flex h-12 w-16 items-center justify-center rounded-full border-2 ${
                  llamadaUsada ? "border-white/20 text-white/30" : "border-tangerine/40 text-tangerine/40"
                }`}
              >
                <IconoTelefono />
              </span>
            ) : (
              <a
                href={`tel:${telefono}`}
                onClick={usarLlamada}
                title="Llamada a un amigo"
                aria-label="Comodín: llamada a un amigo"
                className="flex h-12 w-16 items-center justify-center rounded-full border-2 border-tangerine text-tangerine transition hover:bg-tangerine hover:text-ink-deep"
              >
                <IconoTelefono />
              </a>
            )}
          </div>
          {botonSonido}
        </div>

        <div className="mt-4 flex items-center gap-2 font-body text-xs tracking-[0.2em] text-white/60 uppercase lg:hidden">
          Pregunta {nivel + 1} de {total}
          {premioDeEsta && (
            <span className="flex items-center gap-1 text-tangerine">
              · <IconoRegalo className="h-3.5 w-3.5" /> {premioDeEsta}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          {llamando && (
            <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-white/20 bg-ink-deep/60 px-5 py-4 text-center font-body text-sm text-white/90">
              <IconoTelefono className="mr-2 inline h-4 w-4 align-[-2px] text-tangerine" />
              Llamando a {telefonoLegible(telefono)}… Si no se abre la llamada, marca ese número desde tu móvil.
            </div>
          )}

          <div className="rounded-[2rem] border-2 border-tangerine/70 bg-ink-deep/80 px-6 py-8 text-center shadow-[0_0_40px_rgba(196,154,69,0.15)] sm:px-10">
            {premioDeEsta && (
              <p className="mb-3 flex items-center justify-center gap-2 font-body text-xs font-semibold tracking-[0.2em] text-tangerine uppercase">
                <IconoRegalo /> Pregunta con premio
              </p>
            )}
            <h2 className="font-display text-2xl leading-snug font-semibold sm:text-3xl">{actual.pregunta}</h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {actual.opciones.map((opcion, i) => (
              <button
                key={i}
                onClick={() => elegir(i)}
                disabled={ocultas.includes(i) || !enJuego}
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
            {fase === "acierto" && (
              <div className="flex flex-col items-center gap-2">
                <p className="font-display text-3xl text-turquoise">¡Correcto!</p>
                {premioDeEsta && (
                  <p className="flex items-center gap-2 rounded-full bg-tangerine px-5 py-2 font-body text-sm font-bold text-ink-deep">
                    <IconoRegalo /> ¡{premioDeEsta} conseguido
                    {nivel + 1 === preguntaSeguro ? " y asegurado" : ""}!
                  </p>
                )}
              </div>
            )}
            {fase === "fallo" && (
              <div className="flex flex-col items-center gap-3">
                <p className="font-display text-3xl">¡Oh, no! La respuesta correcta era la {LETRAS[actual.correcta]}.</p>
                <p className="font-body text-sm text-white/75">
                  {asegurados.length ? (
                    <>
                      Pero te llevas el <span className="font-bold text-tangerine">{asegurados.join(" y el ")}</span>.
                    </>
                  ) : (
                    "Esta vez no hay premio… ¡pero puedes volver a intentarlo!"
                  )}
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
        {preguntas.map((_, i) => {
          const numero = i + 1;
          const esActual = i === nivel;
          const superada = i < nivel;
          const premio = premios[numero];
          return (
            <li
              key={i}
              className={`flex items-center justify-between gap-3 rounded-full px-4 py-2 font-body text-sm ${
                esActual ? "bg-tangerine font-bold text-ink-deep" : premio ? "font-semibold text-white" : "text-tangerine/80"
              } ${superada ? "opacity-50" : ""}`}
            >
              <span className="whitespace-nowrap">Pregunta {numero}</span>
              {premio && (
                <span className="flex items-center gap-1 text-xs whitespace-nowrap" title={premio}>
                  <IconoRegalo /> {premio}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
