import { defineField, defineType } from "sanity";

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    group: "fotos",
    options: { hotspot: true },
    fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
  });

const pageHeaderFields = (defaults: { eyebrow: string; title: string; description?: string }) => [
  defineField({
    name: "eyebrow",
    title: "Etiqueta pequeña (arriba del título)",
    type: "string",
    description: `Si se deja vacío, se usa: "${defaults.eyebrow}"`,
  }),
  defineField({
    name: "title",
    title: "Título",
    type: "string",
    description: `Si se deja vacío, se usa: "${defaults.title}"`,
  }),
  defineField({
    name: "description",
    title: "Descripción",
    type: "text",
    rows: 2,
    description: defaults.description ? `Si se deja vacío, se usa: "${defaults.description}"` : "Opcional.",
  }),
];

const pageHeader = (
  name: string,
  title: string,
  defaults: { eyebrow: string; title: string; description?: string }
) =>
  defineField({
    name,
    title,
    type: "object",
    group: "paginas",
    fields: pageHeaderFields(defaults),
  });

/** Singleton — ver sanity/structure.ts, donde se fija como una sola entrada no creable. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ajustes del sitio",
  type: "document",
  groups: [
    { name: "fotos", title: "Fotos", default: true },
    { name: "inicio", title: "Inicio" },
    { name: "sobrePam", title: "Página Sobre Pam" },
    { name: "paginas", title: "Encabezados de página" },
    { name: "otros", title: "Footer" },
  ],
  fields: [
    // — Fotos —
    imageField("heroImage", "Foto de fondo del Hero (Home)", "La fotografía a pantalla completa del inicio del sitio."),
    imageField("sobrePamIntroImage", "Sobre Pam — foto principal", "La foto grande de la sección \"Persona\", en /sobre-pam."),
    imageField("sobrePamIntroImageSecondary", "Sobre Pam — foto secundaria", "La foto pequeña superpuesta, en /sobre-pam."),
    imageField("sobrePamExperienceImage", "Sobre Pam — foto de la sección \"Lo que he vivido\"", undefined),

    // — Inicio: Hero —
    defineField({
      name: "heroEyebrow",
      title: "Etiqueta pequeña",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Doctora en Turismo · +30 países"',
    }),
    defineField({
      name: "heroHeadlineLine1",
      title: "Titular — línea 1",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Ampliar"',
    }),
    defineField({
      name: "heroHeadlineLine2",
      title: "Titular — línea 2 (en cursiva, color de acento)",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "tu"',
    }),
    defineField({
      name: "heroHeadlineLine3",
      title: "Titular — línea 3",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "mundo."',
    }),
    defineField({
      name: "heroSubheadline",
      title: "Subtítulo",
      type: "text",
      rows: 2,
      group: "inicio",
      description:
        'Si se deja vacío, se usa: "Viajes, experiencias e historias para mirar más allá de lo conocido. Esto no habla de viajar — hace sentir que estás viajando."',
    }),
    defineField({
      name: "heroCtaPrimaryLabel",
      title: "Texto del botón principal",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Viaja conmigo"',
    }),
    defineField({
      name: "heroCtaSecondaryLabel",
      title: "Texto del botón secundario",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Explora viajes"',
    }),
    defineField({
      name: "heroStatNumber",
      title: "Dato — número",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "30+"',
    }),
    defineField({
      name: "heroStatLabel",
      title: "Dato — etiqueta",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "países recorridos"',
    }),

    // — Inicio: trayectoria —
    defineField({
      name: "trajectoryMilestones",
      title: "Trayectoria (franja debajo del Hero)",
      type: "array",
      group: "inicio",
      description: 'Si se deja vacío, se usa: Ecuador · Docencia universitaria · Doctora en Turismo · +30 países recorridos · Fundadora de Caminando.lat',
      of: [{ type: "string" }],
    }),

    // — Inicio: "Por qué viajo" —
    defineField({
      name: "storyEyebrow",
      title: "[Por qué viajo] Etiqueta pequeña",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Por qué viajo"',
    }),
    defineField({
      name: "storyHeadline",
      title: "[Por qué viajo] Titular",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "No dejé mi trabajo para \\"convertirme en influencer\\"."',
    }),
    defineField({
      name: "storyBody",
      title: "[Por qué viajo] Párrafo",
      type: "text",
      rows: 3,
      group: "inicio",
      description:
        'Si se deja vacío, se usa: "Me hice una pregunta — ¿y si existe otra forma de vivir la mía? — y empecé a responderla un viaje a la vez. De ahí salió todo lo demás."',
    }),
    defineField({
      name: "storyLinkLabel",
      title: "[Por qué viajo] Texto del enlace",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Conoce mi historia completa →"',
    }),

    // — Inicio: colaboraciones —
    defineField({
      name: "collabEyebrow",
      title: "[Trabajemos juntos] Etiqueta pequeña",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Para marcas, destinos e instituciones"',
    }),
    defineField({
      name: "collabHeadline",
      title: "[Trabajemos juntos] Titular",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Trabajemos juntos."',
    }),
    defineField({
      name: "collabBody",
      title: "[Trabajemos juntos] Párrafo",
      type: "text",
      rows: 3,
      group: "inicio",
      description:
        'Si se deja vacío, se usa: "Storytelling, viajes grupales con marca, investigación en turismo y acceso directo a una comunidad latinoamericana interesada en viajar."',
    }),
    defineField({
      name: "collabCtaLabel",
      title: "[Trabajemos juntos] Texto del botón",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Trabaja conmigo"',
    }),

    // — Inicio: newsletter —
    defineField({
      name: "homeNewsletterHeadline",
      title: "[Newsletter, en Home] Titular",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Una carta, de vez en cuando, sobre ampliar el mundo."',
    }),
    defineField({
      name: "homeNewsletterBody",
      title: "[Newsletter, en Home] Párrafo",
      type: "text",
      rows: 2,
      group: "inicio",
      description:
        'Si se deja vacío, se usa: "Destinos, oportunidades y lo que voy aprendiendo por el camino — sin ruido, sin relleno."',
    }),
    defineField({
      name: "homeNewsletterButtonLabel",
      title: "[Newsletter, en Home] Texto del botón",
      type: "string",
      group: "inicio",
      description: 'Si se deja vacío, se usa: "Suscribirme"',
    }),

    // — Página Sobre Pam —
    defineField({
      name: "sobrePamIntroQuote",
      title: "Frase de introducción (destacada)",
      type: "text",
      rows: 2,
      group: "sobrePam",
      description:
        'Si se deja vacío, se usa: "Curiosa antes que nada. Ecuatoriana, y desde hace años también un poco de cada lugar que he pisado."',
    }),
    defineField({
      name: "sobrePamIntroBody",
      title: "Párrafo de introducción",
      type: "text",
      rows: 4,
      group: "sobrePam",
      description: "Si se deja vacío, se usa el párrafo original sobre cómo es Pam como persona.",
    }),
    defineField({
      name: "sobrePamExperienceEyebrow",
      title: "[Lo que he vivido] Etiqueta pequeña",
      type: "string",
      group: "sobrePam",
      description: 'Si se deja vacío, se usa: "Lo que he vivido"',
    }),
    defineField({
      name: "sobrePamExperienceBody1",
      title: "[Lo que he vivido] Primer párrafo",
      type: "text",
      rows: 4,
      group: "sobrePam",
      description: "Si se deja vacío, se usa el párrafo original sobre la vida antes de viajar.",
    }),
    defineField({
      name: "sobrePamExperienceBody2",
      title: "[Lo que he vivido] Segundo párrafo",
      type: "text",
      rows: 4,
      group: "sobrePam",
      description: "Si se deja vacío, se usa el párrafo original sobre la pregunta que lo cambió todo.",
    }),
    defineField({
      name: "sobrePamMomentsHeading",
      title: "[Momentos] Titular",
      type: "string",
      group: "sobrePam",
      description: 'Si se deja vacío, se usa: "No una sola fotografía corporativa — esto es lo que realmente hago."',
    }),
    defineField({
      name: "sobrePamMoments",
      title: "[Momentos] Collage de fotos",
      type: "array",
      group: "sobrePam",
      description: "Si se deja vacío, se muestran los 4 placeholders originales.",
      of: [{ type: "photoCaption" }],
    }),
    defineField({
      name: "sobrePamExpertiseHeading",
      title: "[Trayectoria] Titular",
      type: "string",
      group: "sobrePam",
      description: 'Si se deja vacío, se usa: "Trayectoria"',
    }),
    defineField({
      name: "sobrePamExpertiseItems",
      title: "[Trayectoria] Lista",
      type: "array",
      group: "sobrePam",
      description:
        'Si se deja vacío, se usa: Doctora en Turismo · Exdocente universitaria e investigadora · Más de 30 países recorridos · Fundadora de Caminando.lat · Líder de viajes grupales',
      of: [{ type: "string" }],
    }),

    // — Encabezados de página —
    pageHeader("viajesGrupalesHeader", "Viajes grupales", {
      eyebrow: "Vívelo conmigo",
      title: "Viajes grupales",
      description:
        "No son paquetes: son experiencias que diseño y acompaño de principio a fin. Estas son las convocatorias abiertas ahora mismo.",
    }),
    pageHeader("misImprescindiblesHeader", "Mis imprescindibles", {
      eyebrow: "Recomendaciones",
      title: "Mis imprescindibles",
      description: "Cosas que realmente utilizo o recomiendo para viajar.",
    }),
    pageHeader("viajaConmigoHeader", "Viaja conmigo", {
      eyebrow: "Lo que he vivido",
      title: "Viaja conmigo",
      description:
        "Aquí no encontrarás guías ni consejos organizados por intención de búsqueda — eso vive en Viajes. Esto es lo que yo he vivido, contado en primera persona.",
    }),
    pageHeader("proyectosHeader", "Proyectos", {
      eyebrow: "Más allá del contenido",
      title: "Proyectos",
      description: "Cosas que he construido para que las oportunidades sean más fáciles de encontrar, no solo más fáciles de soñar.",
    }),
    pageHeader("sobrePamHeader", "Sobre Pam", {
      eyebrow: "Sobre Pam",
      title: "Antes de los títulos, esto es lo que necesitas saber de mí.",
    }),
    pageHeader("trabajaConmigoHeader", "Trabaja conmigo", {
      eyebrow: "Para marcas, destinos e instituciones",
      title: "Trabajemos juntos.",
      description:
        "No solo publico contenido: cuento historias, viajo, investigo, lidero experiencias y conecto audiencias. Esto es lo que puedo aportar a un proyecto.",
    }),
    pageHeader("viajesHeader", "Viajes", {
      eyebrow: "Lo que sé",
      title: "Viajes",
      description: "Todo lo que necesitas para descubrir el mundo: destinos, guías, consejos y experiencias para ayudarte a viajar mejor.",
    }),
    pageHeader("destinosHeader", "Destinos", {
      eyebrow: "Viajes",
      title: "Destinos",
      description: "Cada guía nace de un viaje real: cultura, gastronomía, transporte, presupuesto y errores que no volvería a cometer.",
    }),
    pageHeader("experienciasHeader", "Experiencias", {
      eyebrow: "Lo que quiero transmitir",
      title: "Experiencias",
      description:
        "Esto no es turismo — es cultura, aprendizaje y transformación. Historias sobre lo que significa ampliar tu mundo, más allá de la lista de sitios que hay que visitar.",
    }),
    pageHeader("newsletterHeader", "Newsletter", {
      eyebrow: "Sin ruido, sin relleno",
      title: "Una carta, de vez en cuando, sobre ampliar el mundo.",
      description: "Nada de correos diarios ni promociones constantes. Solo lo que de verdad vale la pena leer.",
    }),
    pageHeader("contactoHeader", "Contacto", {
      eyebrow: "Hablemos",
      title: "Contacto",
      description: "¿Pregunta sobre un viaje, propuesta de colaboración o consulta de prensa? Escríbeme por aquí.",
    }),

    // — Footer —
    defineField({
      name: "footerTagline",
      title: "Frase del footer",
      type: "string",
      group: "otros",
      description: 'Si se deja vacío, se usa: "Viajar para ampliar tu mundo."',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ajustes del sitio" };
    },
  },
});
