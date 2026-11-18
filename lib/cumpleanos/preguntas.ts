/**
 * Preguntas del juego de cumpleaños. Solo se envían al navegador después de
 * introducir la contraseña correcta.
 *
 * Para editarlas: cambia el texto de cada pregunta, las cuatro opciones y el
 * índice de la correcta (0 = A, 1 = B, 2 = C, 3 = D). Van de más fácil a más
 * difícil; puedes añadir o quitar preguntas y la escalera de premios se
 * ajusta sola (los seguros caen en la 5.ª y la 10.ª).
 */
export interface Pregunta {
  pregunta: string;
  opciones: [string, string, string, string];
  correcta: 0 | 1 | 2 | 3;
  /** Lo que dice "el amigo" en el comodín de la llamada (opcional). */
  pista?: string;
}

export const PREGUNTAS: Pregunta[] = [
  {
    pregunta: "¿En qué país nació Pam?",
    opciones: ["Colombia", "Ecuador", "Perú", "México"],
    correcta: 1,
    pista: "Facilísima: piensa en la mitad del mundo.",
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
    pregunta: "[EDITAR] ¿En qué ciudad celebró su cumpleaños más especial?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] ¿Cuál es su canción para los viajes en carretera?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] ¿Qué país sueña visitar todavía?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] ¿Cuál es su mayor anécdota perdiendo un vuelo?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] ¿Cómo se llamaba su primera mascota?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
  },
  {
    pregunta: "[EDITAR] La pregunta final: ¿cuántos años cumple Pam?",
    opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correcta: 0,
    pista: "Esta no te la puedo decir… ¡es un secreto de Estado!",
  },
];

/** Premios de la escalera, de la pregunta 1 a la 15. */
export const PREMIOS = [
  "100",
  "200",
  "300",
  "500",
  "1.000",
  "2.000",
  "4.000",
  "8.000",
  "16.000",
  "32.000",
  "64.000",
  "125.000",
  "250.000",
  "500.000",
  "1 MILLÓN",
];

/** Índices (0-based) de las preguntas que, una vez superadas, son "seguro". */
export const SEGUROS = [4, 9];

export const MENSAJE_FINAL =
  "¡Feliz cumpleaños, Pam! Que este nuevo año venga cargado de sellos en el pasaporte, caminos nuevos y gente bonita con quien recorrerlos.";
