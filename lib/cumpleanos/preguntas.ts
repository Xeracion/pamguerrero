/**
 * Preguntas del juego de cumpleaños. Solo se envían al navegador después de
 * introducir la contraseña correcta.
 *
 * Para editarlas: cambia el texto de cada pregunta, las cuatro opciones, el
 * índice de la correcta (0 = A, 1 = B, 2 = C, 3 = D) y el comentario que
 * aparece al acertar. Son 10: la 5.ª y la 10.ª tienen premio, y llegar a la
 * 5.ª lo deja asegurado aunque después se falle.
 */
export interface Pregunta {
  pregunta: string;
  opciones: [string, string, string, string];
  correcta: 0 | 1 | 2 | 3;
  /** Lo que se muestra al acertar. */
  comentario: string;
}

export const PREGUNTAS: Pregunta[] = [
  {
    pregunta:
      "¿En qué red social, una calurosa tarde de agosto, recibiste tu primer mensaje de un tal Fran Sequeiro?",
    opciones: ["Tinder", "Grinder", "Couchsurfing", "Facebook"],
    correcta: 2,
    comentario:
      "¡Correcto! Couchsurfing. Él ofrecía un café y paseo, y acabó colando mucho más. El upgrade más rentable de la historia.",
  },
  {
    pregunta: "¿Cuál es el significado de chinchear?",
    opciones: [
      "Extraer la sangre del otro sin que se dé cuenta",
      "Saltar de un lado a otro de manera hiperactiva",
      "Poner chinchetas en un marco de corcho",
      "Abrazarse muy juntitos en el sofá mientras fuera llueve",
    ],
    correcta: 3,
    comentario: "¡Exacto! En Galicia, con lo que llueve, chinchear no es un plan: es un estilo de vida.",
  },
  {
    pregunta: "Una gamberra… ¿cómo se comporta?",
    opciones: [
      "Pone los pies en la mesa",
      "Tira las latas en los contenedores de obra",
      "Mea el albornoz de su chico",
      "Todas las anteriores",
    ],
    correcta: 3,
    comentario: "Y es que una gamberra de verdad no se corta ante nada ni ante nadie.",
  },
  {
    pregunta: "¿Qué tipo de prenda se asocia con la citronela?",
    opciones: [
      "Un picardías sexy",
      "Una bata de señor mayor de lo más calentita",
      "Un pantalón con el que se trabaja mucho",
      "Una ganga del mercadillo",
    ],
    correcta: 1,
    comentario: "También conocida como matapasiones, pero oiga, y lo que abriga en invierno ¿qué?",
  },
  {
    pregunta: "¿Cuál es el animal que proporciona más calor?",
    opciones: ["Ornitorrinco", "Oso", "Lagartija", "Vaca"],
    correcta: 1,
    comentario: "Peludo, achuchable y con el modo estufa activado de serie. Como Francito, pero este no chimbea.",
  },
  {
    pregunta: "¿Cuál es el mejor pueblo del mundo mundial?",
    opciones: ["Braga", "Viana do Castelo", "A Capela", "Ponte de Lima"],
    correcta: 3,
    comentario: "¿Amén o no amén?",
  },
  {
    pregunta: "¿En qué momentos se manifiesta el espíritu Pamelo?",
    opciones: [
      "Cuando toca pues hacer algún trabajo pues y es necesario encontrar una excusa",
      "Cuando una serie emotiva de Netflix te da ganas de llorar",
      "Cuando «I'm sexy and I know it»",
      "Cuando una diosa egipcia no me llega ni a la suela de los zapatos",
    ],
    correcta: 3,
    comentario: "Nefertiti, a fregar. En el trono solo cabe un espíritu, y es Pamelo.",
  },
  {
    pregunta: "¿Cómo se llama nuestro segundo hogar?",
    opciones: ["Xerihome", "La Casa del fumador", "Das Nest", "La oficina"],
    correcta: 1,
    comentario: "Y la señora del mostrador con voz ronca ya es candidata a familiar.",
  },
  {
    pregunta: "¿En qué momento surgió la idea de Caminando.lat?",
    opciones: [
      "Comiendo en un libanés de Limoges",
      "Tomando un matcha en Toulouse",
      "Haciendo coworking en un McDonald's",
      "Leyendo enfrente de un río de los Pirineos",
    ],
    correcta: 0,
    comentario: "Las grandes ideas siempre llegan con salsa de yogur.",
  },
  {
    pregunta: "¿Cuál es el mejor plan posible?",
    opciones: [
      "Día de chamba infinita",
      "Carretera, manta y Dacia",
      "Un buen encebollado acompañado de hornado",
      "Da lo mismo siempre que sea contigo",
    ],
    correcta: 3,
    comentario:
      "¡Respuesta correcta y la más empalagosa del concurso! Te llevas el millón… en abrazos. Ahora, a chinchear.",
  },
];

/** Lo que aparece al final, después del comentario de la última pregunta. */
export const GIRO_FINAL = "Que noo… que hay premio de verdad";

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
