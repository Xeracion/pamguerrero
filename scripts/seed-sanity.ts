/**
 * Siembra el dataset de Sanity con el mismo contenido de ejemplo que vivía
 * antes en lib/data/*.ts, para que el sitio no se quede vacío al pasar a
 * Sanity. Todo queda marcado con isExample: true.
 *
 * Uso:
 *   SANITY_API_WRITE_TOKEN=sk... npm run seed
 *
 * El token se crea en sanity.io/manage → tu proyecto → API → Tokens,
 * con permiso "Editor". Nunca lo subas al repo.
 */
import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "a4kawsmz";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "Falta SANITY_API_WRITE_TOKEN. Crea uno en sanity.io/manage (permiso Editor) y expórtalo antes de ejecutar este script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block" as const,
    _key: `block-${i}`,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, _key: `span-${i}`, text, marks: [] }],
  }));
}

async function seed() {
  console.log(`Sembrando dataset "${dataset}" del proyecto ${projectId}...`);

  // 1. Categorías
  const categories = [
    {
      _id: "category-viaja-mejor",
      _type: "category",
      title: "Viaja mejor",
      slug: { _type: "slug", current: "viaja-mejor" },
      description: "Lo práctico: presupuestos, decisiones, errores y lo que funciona de verdad.",
    },
    {
      _id: "category-planifica",
      _type: "category",
      title: "Planifica",
      slug: { _type: "slug", current: "planifica" },
      description: "Visados, documentación, seguros y todo lo que hay que resolver antes de salir.",
    },
    {
      _id: "category-descubre",
      _type: "category",
      title: "Descubre",
      slug: { _type: "slug", current: "descubre" },
      description: "Itinerarios, rutas y lugares para descubrir una vez ya estás viajando.",
    },
  ];
  for (const doc of categories) {
    await client.createOrReplace(doc);
  }
  console.log(`✓ ${categories.length} categorías`);

  // 2. Destino: Egipto
  const destination = {
    _id: "destination-egipto",
    _type: "destination",
    name: "Egipto",
    slug: { _type: "slug", current: "egipto" },
    region: "Norte de África",
    summary: "Un país que suele visitarse por sus monumentos y termina recordándose por su gente.",
    isExample: true,
    guide: [
      {
        _type: "guideSection",
        _key: "guide-cultura",
        heading: "Cultura",
        body: "[INSERTAR OBSERVACIONES REALES DE PAM SOBRE CULTURA LOCAL, BASADAS EN SU EXPERIENCIA]",
      },
      {
        _type: "guideSection",
        _key: "guide-gastronomia",
        heading: "Gastronomía",
        body: "[INSERTAR RECOMENDACIONES REALES DE COMIDA PROBADA POR PAM]",
      },
      {
        _type: "guideSection",
        _key: "guide-transporte",
        heading: "Transporte",
        body: "[INSERTAR CONSEJOS REALES SOBRE CÓMO MOVERSE DENTRO DEL PAÍS]",
      },
      {
        _type: "guideSection",
        _key: "guide-presupuesto",
        heading: "Presupuesto",
        body: "[INSERTAR RANGO DE PRESUPUESTO REAL Y VERIFICADO]",
      },
      {
        _type: "guideSection",
        _key: "guide-errores",
        heading: "Errores que no repetiría",
        body: "[INSERTAR APRENDIZAJES REALES DE VIAJES ANTERIORES DE PAM EN ESTE DESTINO]",
      },
    ],
  };
  await client.createOrReplace(destination);
  console.log("✓ Destino: Egipto");

  // 3. Viaje grupal: Egipto marzo 2027
  const trip = {
    _id: "trip-egipto-marzo-2027",
    _type: "trip",
    title: "Egipto — viaje grupal",
    slug: { _type: "slug", current: "egipto-marzo-2027" },
    destination: { _type: "reference", _ref: "destination-egipto" },
    personalNote: "Este es el viaje que más me piden que repita desde que lo hice la primera vez.",
    description:
      "Un recorrido grupal pensado para conocer el país más allá de la ruta turística estándar, con acompañamiento de Pam durante todo el viaje.",
    status: "ultimas-plazas",
    closingDate: "2026-09-05",
    dates: "[INSERTAR FECHAS REALES]",
    durationDays: 10,
    price: "[INSERTAR PRECIO REAL]",
    accommodation: "[INSERTAR DETALLE REAL DE ALOJAMIENTO]",
    isExample: true,
    itinerary: [
      { _type: "itineraryDay", _key: "day-1", day: 1, title: "Llegada y bienvenida", body: "[INSERTAR DETALLE REAL DEL DÍA 1]" },
      { _type: "itineraryDay", _key: "day-2", day: 2, title: "[INSERTAR TÍTULO REAL]", body: "[INSERTAR DETALLE REAL DEL DÍA 2]" },
      { _type: "itineraryDay", _key: "day-3", day: 3, title: "[INSERTAR TÍTULO REAL]", body: "[INSERTAR DETALLE REAL DEL DÍA 3]" },
    ],
    includes: [
      "Alojamiento durante todo el recorrido",
      "Traslados internos indicados en el itinerario",
      "Acompañamiento de Pam durante el viaje",
      "[INSERTAR LISTA COMPLETA Y VERIFICADA]",
    ],
    excludes: [
      "Vuelos internacionales de ida y vuelta",
      "Seguro de viaje",
      "Gastos personales",
      "[INSERTAR LISTA COMPLETA Y VERIFICADA]",
    ],
    faqs: [
      {
        _type: "faq",
        _key: "faq-1",
        question: "¿Necesito experiencia previa viajando en grupo?",
        answer: "No. El viaje está pensado para personas que viajan en grupo por primera vez.",
      },
      {
        _type: "faq",
        _key: "faq-2",
        question: "¿Cómo funciona la lista de espera si el viaje se agota?",
        answer: "Puedes anotarte en la lista de espera y te avisamos si se libera un cupo o se abre una fecha adicional.",
      },
      {
        _type: "faq",
        _key: "faq-3",
        question: "[INSERTAR PREGUNTA REAL FRECUENTE]",
        answer: "[INSERTAR RESPUESTA VERIFICADA]",
      },
    ],
  };
  await client.createOrReplace(trip);
  console.log("✓ Viaje grupal: Egipto marzo 2027");

  // Referencia cruzada: destino → viaje relacionado
  await client
    .patch("destination-egipto")
    .set({ relatedTrips: [{ _type: "reference", _ref: "trip-egipto-marzo-2027", _key: "trip-1" }] })
    .commit();

  // 4. Viaja Conmigo: relato de Egipto
  const journey = {
    _id: "journey-egipto",
    _type: "journey",
    title: "Así fue mi viaje por Egipto",
    slug: { _type: "slug", current: "egipto" },
    destination: { _type: "reference", _ref: "destination-egipto" },
    excerpt: "Lo que planeaba ver en fotos terminó siendo, sobre todo, gente. Esto es lo que me llevo.",
    date: "2025-10-12",
    isExample: true,
    body: toPortableText([
      "Llegué a Egipto con la lista de sitios que todo el mundo lleva. Me fui con una lista completamente distinta: la de las personas que conocí por el camino.",
      "[INSERTAR RELATO REAL Y FOTOGRAFÍAS DEL VIAJE DE PAM POR EGIPTO]",
      "No fue un viaje sin fricciones — hubo momentos de cansancio, de calor, de no entender bien cómo moverme. Eso también es parte de lo que quiero contar aquí: no una versión perfecta, la real.",
    ]),
  };
  await client.createOrReplace(journey);
  console.log("✓ Viaja Conmigo: Egipto");

  // 5. Artículo: presupuesto (categoría Viaja mejor)
  const article = {
    _id: "article-presupuesto-viaje-internacional",
    _type: "article",
    title: "Cómo armo el presupuesto de un viaje internacional",
    slug: { _type: "slug", current: "como-armo-el-presupuesto-de-un-viaje-internacional" },
    category: { _type: "reference", _ref: "category-viaja-mejor" },
    excerpt: "El método que uso para no descubrir a mitad de viaje que el dinero no va a alcanzar.",
    datePublished: "2026-02-10",
    dateModified: "2026-02-10",
    readingMinutes: 6,
    isExample: true,
    body: toPortableText([
      "Cada vez que alguien me escribe pidiendo consejo para un primer viaje internacional, la pregunta real detrás casi nunca es '¿a dónde voy?'. Es '¿cómo sé que me va a alcanzar el dinero?'.",
      "No existe una fórmula mágica, pero sí un orden: primero el transporte internacional, después el alojamiento, después todo lo demás. La mayoría de la gente lo hace al revés y por eso el presupuesto se descuadra.",
      "[INSERTAR DESGLOSE REAL DE PRESUPUESTO CON CIFRAS VERIFICADAS DE UN VIAJE CONCRETO DE PAM]",
      "Lo que sí puedo decir sin cifras: reservar con margen, tener un fondo para imprevistos y no gastar todo el presupuesto en llegar — hay que dejar espacio para lo que no se puede planear.",
    ]),
  };
  await client.createOrReplace(article);
  console.log("✓ Artículo: presupuesto de viaje internacional");

  // 6. Experiencias
  const experiences = [
    {
      _id: "experience-tres-puertas",
      _type: "experience",
      title: "Becas, trabajo y voluntariado: tres puertas de entrada a vivir fuera",
      slug: { _type: "slug", current: "tres-puertas-de-entrada-a-vivir-fuera" },
      tag: "Experiencias internacionales",
      excerpt: "No hace falta tener todo resuelto para empezar. Hace falta saber por cuál puerta entrar primero.",
      datePublished: "2026-01-22",
      readingMinutes: 7,
      isExample: true,
      body: toPortableText([
        "Cuando empecé a buscar oportunidades internacionales, no sabía que existían tantas puertas distintas. Pensaba que la única forma de vivir fuera era tener mucho dinero ahorrado o una beca completa ya en mano.",
        "Con el tiempo aprendí que hay al menos tres caminos que se pueden empezar a trabajar en paralelo: programas de becas y movilidad académica, ofertas de trabajo internacional en el sector que ya conoces, y voluntariado o intercambios que abren la puerta sin exigir experiencia previa.",
        "Cada camino tiene requisitos, tiempos y letra pequeña distintos — y esa es exactamente la razón por la que fundé Caminando.lat: para mapear esas oportunidades con el detalle que un artículo como este no puede dar.",
        "[INSERTAR ENLACES A RECURSOS VERIFICADOS DE CAMINANDO.LAT]",
      ]),
    },
    {
      _id: "experience-comida-callejera",
      _type: "experience",
      title: "Lo que aprendí comiendo en la calle en cada país",
      slug: { _type: "slug", current: "lo-que-aprendi-comiendo-en-la-calle" },
      tag: "Cultura",
      excerpt: "La comida callejera cuenta más sobre un lugar que cualquier guía turística.",
      datePublished: "2025-11-05",
      readingMinutes: 5,
      isExample: true,
      body: toPortableText([
        "Hay una regla que sigo desde hace años: si quiero entender un lugar rápido, no voy al restaurante mejor calificado. Voy a donde come la gente que vive ahí, todos los días, sin pensarlo.",
        "[INSERTAR ANÉCDOTA REAL DE PAM SOBRE UN PLATO O MERCADO CONCRETO]",
        "La comida callejera no miente: refleja lo que hay disponible, lo que la gente puede pagar y lo que una cultura decide celebrar incluso en lo cotidiano. Es la forma más honesta de entender un país antes de leer sobre su historia.",
      ]),
    },
    {
      _id: "experience-primera-vez-sola",
      _type: "experience",
      title: "La primera vez que viajé sola cambié una pregunta, no una respuesta",
      slug: { _type: "slug", current: "primera-vez-que-viaje-sola" },
      tag: "Ampliar tu mundo",
      excerpt: "No volví con las respuestas resueltas. Volví haciéndome mejores preguntas.",
      datePublished: "2025-09-14",
      readingMinutes: 5,
      isExample: true,
      body: toPortableText([
        "Antes de mi primer viaje sola, pensaba que 'ampliar el mundo' era acumular lugares. Volver con una lista más larga de países visitados.",
        "[INSERTAR RELATO REAL DEL PRIMER VIAJE EN SOLITARIO DE PAM]",
        "Lo que realmente cambió no fue mi lista de destinos. Fue la pregunta con la que salí: ya no me preguntaba '¿qué voy a ver?', sino '¿qué otras formas de vivir existen que yo todavía no conozco?'. Esa pregunta es, en el fondo, de donde sale todo lo que hago ahora.",
      ]),
    },
    {
      _id: "experience-profesora-a-exploradora",
      _type: "experience",
      title: "De profesora universitaria a exploradora: cómo empezó todo",
      slug: { _type: "slug", current: "de-profesora-universitaria-a-exploradora" },
      tag: "Historias",
      excerpt: "No dejé mi trabajo para 'convertirme en influencer'. Me hice una pregunta primero.",
      datePublished: "2025-08-01",
      readingMinutes: 8,
      isExample: true,
      body: toPortableText([
        "Durante años, mi vida tuvo una estructura muy clara: aula, investigación, jornadas larguísimas. Era una vida profesional válida — y también una que empezó a sentirse como la única opción posible.",
        "La pregunta que lo cambió todo fue simple: ¿y si existe otra forma de vivir la mía? No fue una crisis dramática. Fue una pregunta que no pude dejar de hacerme, hasta que empecé a actuar sobre ella.",
        "[INSERTAR RELATO REAL Y CRONOLOGÍA VERIFICADA DE LA TRANSICIÓN DE PAM]",
        "Hoy esa pregunta sigue siendo el motor de este sitio: no vender la idea de que 'todo es posible sin esfuerzo', sino mostrar, con información real, que existen más caminos de los que parecía al principio.",
      ]),
    },
  ];
  for (const doc of experiences) {
    await client.createOrReplace(doc);
  }
  console.log(`✓ ${experiences.length} experiencias`);

  // Referencias relacionadas (curadas a mano, igual que en el modelo estático original)
  await client
    .patch("article-presupuesto-viaje-internacional")
    .set({ relatedArticles: [] })
    .commit();
  await client
    .patch("experience-tres-puertas")
    .set({ relatedExperiences: [{ _type: "reference", _ref: "experience-profesora-a-exploradora", _key: "rel-1" }] })
    .commit();
  await client
    .patch("experience-profesora-a-exploradora")
    .set({ relatedExperiences: [{ _type: "reference", _ref: "experience-tres-puertas", _key: "rel-1" }] })
    .commit();

  console.log("\nListo. Abre /studio para ver y editar el contenido sembrado.");
}

seed().catch((err) => {
  console.error("Error sembrando el dataset:", err);
  process.exit(1);
});
