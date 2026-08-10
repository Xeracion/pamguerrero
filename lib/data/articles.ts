import type { Article } from "@/lib/types";

/**
 * Contenido de ejemplo (isExample: true): ilustra la plantilla editorial
 * antes de cargar artículos reales. No son publicaciones en vivo.
 */
export const ARTICLES: Article[] = [
  {
    slug: "como-armo-el-presupuesto-de-un-viaje-internacional",
    category: "viajar-mejor",
    title: "Cómo armo el presupuesto de un viaje internacional",
    excerpt:
      "El método que uso para no descubrir a mitad de viaje que el dinero no va a alcanzar.",
    datePublished: "2026-02-10",
    dateModified: "2026-02-10",
    readingMinutes: 6,
    isExample: true,
    body: [
      "Cada vez que alguien me escribe pidiendo consejo para un primer viaje internacional, la pregunta real detrás casi nunca es '¿a dónde voy?'. Es '¿cómo sé que me va a alcanzar el dinero?'.",
      "No existe una fórmula mágica, pero sí un orden: primero el transporte internacional, después el alojamiento, después todo lo demás. La mayoría de la gente lo hace al revés y por eso el presupuesto se descuadra.",
      "[INSERTAR DESGLOSE REAL DE PRESUPUESTO CON CIFRAS VERIFICADAS DE UN VIAJE CONCRETO DE PAM]",
      "Lo que sí puedo decir sin cifras: reservar con margen, tener un fondo para imprevistos y no gastar todo el presupuesto en llegar — hay que dejar espacio para lo que no se puede planear.",
    ],
    relatedSlugs: ["primera-vez-que-viaje-sola"],
  },
  {
    slug: "tres-puertas-de-entrada-a-vivir-fuera",
    category: "experiencias-internacionales",
    title: "Becas, trabajo y voluntariado: tres puertas de entrada a vivir fuera",
    excerpt:
      "No hace falta tener todo resuelto para empezar. Hace falta saber por cuál puerta entrar primero.",
    datePublished: "2026-01-22",
    readingMinutes: 7,
    isExample: true,
    body: [
      "Cuando empecé a buscar oportunidades internacionales, no sabía que existían tantas puertas distintas. Pensaba que la única forma de vivir fuera era tener mucho dinero ahorrado o una beca completa ya en mano.",
      "Con el tiempo aprendí que hay al menos tres caminos que se pueden empezar a trabajar en paralelo: programas de becas y movilidad académica, ofertas de trabajo internacional en el sector que ya conoces, y voluntariado o intercambios que abren la puerta sin exigir experiencia previa.",
      "Cada camino tiene requisitos, tiempos y letra pequeña distintos — y esa es exactamente la razón por la que fundé Caminando.lat: para mapear esas oportunidades con el detalle que un artículo como este no puede dar.",
      "[INSERTAR ENLACES A RECURSOS VERIFICADOS DE CAMINANDO.LAT]",
    ],
    relatedSlugs: ["de-profesora-universitaria-a-exploradora"],
  },
  {
    slug: "lo-que-aprendi-comiendo-en-la-calle",
    category: "cultura",
    title: "Lo que aprendí comiendo en la calle en cada país",
    excerpt: "La comida callejera cuenta más sobre un lugar que cualquier guía turística.",
    datePublished: "2025-11-05",
    readingMinutes: 5,
    isExample: true,
    body: [
      "Hay una regla que sigo desde hace años: si quiero entender un lugar rápido, no voy al restaurante mejor calificado. Voy a donde come la gente que vive ahí, todos los días, sin pensarlo.",
      "[INSERTAR ANÉCDOTA REAL DE PAM SOBRE UN PLATO O MERCADO CONCRETO]",
      "La comida callejera no miente: refleja lo que hay disponible, lo que la gente puede pagar y lo que una cultura decide celebrar incluso en lo cotidiano. Es la forma más honesta de entender un país antes de leer sobre su historia.",
    ],
  },
  {
    slug: "primera-vez-que-viaje-sola",
    category: "ampliar-tu-mundo",
    title: "La primera vez que viajé sola cambié una pregunta, no una respuesta",
    excerpt: "No volví con las respuestas resueltas. Volví haciéndome mejores preguntas.",
    datePublished: "2025-09-14",
    readingMinutes: 5,
    isExample: true,
    body: [
      "Antes de mi primer viaje sola, pensaba que 'ampliar el mundo' era acumular lugares. Volver con una lista más larga de países visitados.",
      "[INSERTAR RELATO REAL DEL PRIMER VIAJE EN SOLITARIO DE PAM]",
      "Lo que realmente cambió no fue mi lista de destinos. Fue la pregunta con la que salí: ya no me preguntaba '¿qué voy a ver?', sino '¿qué otras formas de vivir existen que yo todavía no conozco?'. Esa pregunta es, en el fondo, de donde sale todo lo que hago ahora.",
    ],
    relatedSlugs: ["como-armo-el-presupuesto-de-un-viaje-internacional"],
  },
  {
    slug: "de-profesora-universitaria-a-exploradora",
    category: "historias",
    title: "De profesora universitaria a exploradora: cómo empezó todo",
    excerpt: "No dejé mi trabajo para 'convertirme en influencer'. Me hice una pregunta primero.",
    datePublished: "2025-08-01",
    readingMinutes: 8,
    isExample: true,
    body: [
      "Durante años, mi vida tuvo una estructura muy clara: aula, investigación, jornadas larguísimas. Era una vida profesional válida — y también una que empezó a sentirse como la única opción posible.",
      "La pregunta que lo cambió todo fue simple: ¿y si existe otra forma de vivir la mía? No fue una crisis dramática. Fue una pregunta que no pude dejar de hacerme, hasta que empecé a actuar sobre ella.",
      "[INSERTAR RELATO REAL Y CRONOLOGÍA VERIFICADA DE LA TRANSICIÓN DE PAM]",
      "Hoy esa pregunta sigue siendo el motor de este sitio: no vender la idea de que 'todo es posible sin esfuerzo', sino mostrar, con información real, que existen más caminos de los que parecía al principio.",
    ],
    relatedSlugs: ["tres-puertas-de-entrada-a-vivir-fuera"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const bySlug = (article.relatedSlugs ?? [])
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
  if (bySlug.length >= limit) return bySlug.slice(0, limit);

  const fallback = ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug && !bySlug.includes(a)
  );
  return [...bySlug, ...fallback].slice(0, limit);
}
