/**
 * Música de tensión estilo concurso de televisión, sintetizada en el
 * navegador con Web Audio (composición original, sin archivos de audio).
 *
 * Modos:
 * - "juego": pulso grave tipo latido, drone y un arpegio en menor que se
 *   acelera y se abre a medida que sube el nivel.
 * - "suspense": mientras se revela la respuesta; solo drone, latido rápido
 *   y un trémolo agudo que sube de tono.
 * Efectos: acierto, fallo, comodín, llamada y victoria.
 */

type Modo = "silencio" | "juego" | "suspense";

// La menor: la (A), do (C), mi (E) y su séptima sol (G); fa (F) para la tensión.
const ARPEGIO = [220, 261.63, 329.63, 261.63, 220, 261.63, 349.23, 329.63];

export class Musica {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private drone: { oscs: OscillatorNode[]; filtro: BiquadFilterNode; gain: GainNode } | null = null;
  private trem: { osc: OscillatorNode; lfo: OscillatorNode; gain: GainNode } | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private siguiente = 0;
  private paso = 0;
  private modo: Modo = "silencio";
  private nivel = 0;
  private silenciada = false;

  /** Debe llamarse desde un clic (los navegadores bloquean el audio sin gesto). */
  iniciar() {
    if (this.ctx) {
      void this.ctx.resume();
      return;
    }
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.silenciada ? 0 : 0.7;
    const comp = this.ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(this.ctx.destination);
    this.timer = setInterval(() => this.programar(), 50);
  }

  cerrar() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
    this.drone = null;
    this.trem = null;
  }

  setSilencio(silenciada: boolean) {
    this.silenciada = silenciada;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(silenciada ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
  }

  setNivel(nivel: number) {
    this.nivel = nivel;
    if (this.ctx && this.drone) {
      this.drone.filtro.frequency.setTargetAtTime(280 + nivel * 90, this.ctx.currentTime, 0.5);
    }
  }

  setModo(modo: Modo) {
    if (!this.ctx || modo === this.modo) return;
    this.modo = modo;
    if (modo === "silencio") {
      this.pararDrone();
      this.pararTremolo();
      return;
    }
    this.arrancarDrone();
    if (modo === "suspense") this.arrancarTremolo();
    else this.pararTremolo();
    this.siguiente = this.ctx.currentTime + 0.05;
    this.paso = 0;
  }

  // ---------------------------------------------------------------- efectos

  acierto() {
    this.setModo("silencio");
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.nota(f, i * 0.11, 0.5, "triangle", 0.22));
    this.nota(261.63, 0, 0.9, "sawtooth", 0.08, 1200);
  }

  fallo() {
    this.setModo("silencio");
    [311.13, 293.66, 277.18, 207.65].forEach((f, i) => this.nota(f, i * 0.28, 0.5, "sawtooth", 0.13, 900));
    this.nota(55, 0.9, 2, "sine", 0.4);
  }

  comodin() {
    [880, 1318.5].forEach((f, i) => this.nota(f, i * 0.08, 0.35, "sine", 0.15));
  }

  victoria() {
    this.setModo("silencio");
    const fanfarria: [number, number, number][] = [
      [523.25, 0, 0.18],
      [523.25, 0.2, 0.18],
      [523.25, 0.4, 0.18],
      [659.25, 0.6, 0.5],
      [587.33, 1.15, 0.18],
      [659.25, 1.35, 0.18],
      [783.99, 1.55, 1.4],
    ];
    fanfarria.forEach(([f, t, d]) => {
      this.nota(f, t, d, "sawtooth", 0.1, 2500);
      this.nota(f / 2, t, d, "triangle", 0.12);
    });
    [130.81, 196, 261.63].forEach((f) => this.nota(f, 1.55, 2.2, "sawtooth", 0.06, 1500));
  }

  // ------------------------------------------------------------- internos

  private programar() {
    if (!this.ctx || this.modo === "silencio") return;
    const suspense = this.modo === "suspense";
    const bpm = suspense ? 132 : 92 + this.nivel * 4;
    const corchea = 60 / bpm / 2;
    while (this.siguiente < this.ctx.currentTime + 0.2) {
      const t = this.siguiente - this.ctx.currentTime;
      const enPulso = this.paso % 2 === 0;
      if (enPulso) this.latido(t, (this.paso / 2) % 2 === 0 ? 1 : 0.6);
      if (!suspense) {
        const f = ARPEGIO[this.paso % ARPEGIO.length] * (this.nivel >= 5 ? 2 : 1);
        this.nota(f, t, corchea * 0.9, "square", 0.025 + this.nivel * 0.003, 1400 + this.nivel * 200);
        if (this.paso % 16 === 0) this.nota(110, t, corchea * 14, "sawtooth", 0.05, 500);
      }
      this.siguiente += corchea;
      this.paso++;
    }
  }

  private latido(cuando: number, fuerza: number) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + cuando;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.18);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.55 * fuerza, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  private nota(
    freq: number,
    cuando: number,
    duracion: number,
    tipo: OscillatorType,
    volumen: number,
    corte?: number,
  ) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + cuando;
    const osc = this.ctx.createOscillator();
    osc.type = tipo;
    osc.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(volumen, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
    let salida: AudioNode = osc;
    if (corte) {
      const f = this.ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = corte;
      salida = osc.connect(f);
    }
    salida.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + duracion + 0.05);
  }

  private arrancarDrone() {
    if (!this.ctx || !this.master || this.drone) return;
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 280 + this.nivel * 90;
    filtro.Q.value = 6;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.09, this.ctx.currentTime + 1.2);
    const oscs = [55, 55.4, 82.41].map((f) => {
      const o = this.ctx!.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.connect(filtro);
      o.start();
      return o;
    });
    filtro.connect(gain).connect(this.master);
    this.drone = { oscs, filtro, gain };
  }

  private pararDrone() {
    if (!this.ctx || !this.drone) return;
    const { oscs, gain } = this.drone;
    const t = this.ctx.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.setTargetAtTime(0.0001, t, 0.15);
    oscs.forEach((o) => o.stop(t + 1));
    this.drone = null;
  }

  private arrancarTremolo() {
    if (!this.ctx || !this.master || this.trem) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.linearRampToValueAtTime(587.33, t + 2.5);
    const gain = this.ctx.createGain();
    gain.gain.value = 0.03;
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 12;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain).connect(gain.gain);
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 2200;
    osc.connect(filtro).connect(gain).connect(this.master);
    osc.start(t);
    lfo.start(t);
    this.trem = { osc, lfo, gain };
  }

  private pararTremolo() {
    if (!this.ctx || !this.trem) return;
    const t = this.ctx.currentTime;
    this.trem.gain.gain.cancelScheduledValues(t);
    this.trem.gain.gain.setTargetAtTime(0, t, 0.05);
    this.trem.osc.stop(t + 0.4);
    this.trem.lfo.stop(t + 0.4);
    this.trem = null;
  }
}
