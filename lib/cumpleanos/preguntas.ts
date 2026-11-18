/**
 * Preguntas del juego de cumpleaños. Solo se envían al navegador después de
 * introducir la contraseña correcta.
 *
 * Para editarlas: cambia el texto de cada pregunta, las cuatro opciones y el
 * índice de la correcta (0 = A, 1 = B, 2 = C, 3 = D). Van de más fácil a más
 * difícil. Son 10: la 5.ª y la 10.ª tienen premio, y llegar a la 5.ª lo
 * deja asegurado aunque después se falle.
 */
export interface Pregunta {
  pregunta: string;
  opciones: [string, string, string, string];
  correcta: 0 | 1 | 2 | 3;
}

export const PREGUNTAS: Pregunta[] = [
  {
    pregunta: "¿En qué país nació Pam?",
    opciones: ["Colombia", "Ecuador", "Perú", "México"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué título académico tiene Pam?",
    opciones: ["Doctora en Turismo", "Doctora en Medicina", "Arquitecta", "Abogada"],
    correcta: 0,
  },
  {
    pregunta: "¿Cuál es el proyecto de viajes que fundó Pam?",
    opciones: ["Viajando.com", "Mochileros.es", "Caminando.lat", "Rutas.org"],
    correcta: 2,
  },
  {
    pregunta: "¿Aproximadamente cuántos países ha recorrido Pam?",
    opciones: ["Unos 5", "Unos 12", "Más de 30", "Más de 100"],
    correcta: 2,
  },
  {
    pregunta: "¿A qué se dedicaba Pam antes de viajar a tiempo completo?",
    opciones: ["Piloto", "Docente universitaria e investigadora", "Chef", "Azafata"],
    correcta: 1,
  },
  {
    pregunta: "[EDITAR] ¿Cuál es la comida favorita de Pam?",
    opciones: ["Ceviche", "Pizza", "Sushi", "Encebollado"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] ¿Qué es lo primero que hace Pam al llegar a un país nuevo?",
    opciones: ["Dormir", "Buscar un mercado local", "Ir al museo", "Subir una story"],
    correcta: 1,
  },
  {
    pregunta: "[EDITAR] ¿Cuál fue el primer viaje fuera de su país?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] ¿Qué objeto nunca falta en su mochila?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] La pregunta final: ¿cuántos años cumple Pam?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
];

/**
 * Premios: la clave es el número de pregunta (empezando en 1). Cambia los
 * textos por lo que vaya a recibir de verdad.
 */
export const PREMIOS: Record<number, string> = {
  5: "Primer premio",
  10: "Gran premio",
};

/** Pregunta a partir de la cual el premio queda asegurado. */
export const PREGUNTA_SEGURO = 5;

/** Número al que llama el comodín "Llamada a un amigo". */
export const TELEFONO_AMIGO = "+34684126167";

export const MENSAJE_FINAL =
  "¡Feliz cumpleaños, Pam! Que este nuevo año venga cargado de sellos en el pasaporte, caminos nuevos y gente bonita con quien recorrerlos.";
