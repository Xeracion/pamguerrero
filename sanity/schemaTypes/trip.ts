import { defineField, defineType } from "sanity";

const STATUS_OPTIONS = [
  { title: "Próximamente", value: "proximamente" },
  { title: "Plazas disponibles", value: "plazas-disponibles" },
  { title: "Últimas plazas", value: "ultimas-plazas" },
  { title: "Cerrado", value: "cerrado" },
];

export const trip = defineType({
  name: "trip",
  title: "Viaje grupal",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "logistics", title: "Logística" },
  ],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "destination",
      title: "Destino",
      type: "reference",
      to: [{ type: "destination" }],
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "personalNote",
      title: "Frase personal",
      description: "Perspectiva en primera persona — no copy de agencia.",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 3, group: "content", validation: (r) => r.required() }),
    defineField({
      name: "mainImage",
      title: "Foto principal",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      group: "logistics",
      options: { list: STATUS_OPTIONS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "closingDate",
      title: "Fecha límite de inscripción",
      description: "Si faltan menos de 20 días, la etiqueta se muestra en rojo automáticamente.",
      type: "date",
      group: "logistics",
    }),
    defineField({ name: "dates", title: "Fechas (texto)", type: "string", group: "logistics", validation: (r) => r.required() }),
    defineField({ name: "durationDays", title: "Duración (días)", type: "number", group: "logistics", validation: (r) => r.required().min(1) }),
    defineField({ name: "price", title: "Precio (texto)", type: "string", group: "logistics", validation: (r) => r.required() }),
    defineField({ name: "accommodation", title: "Alojamiento", type: "text", rows: 2, group: "logistics" }),
    defineField({ name: "itinerary", title: "Itinerario", type: "array", of: [{ type: "itineraryDay" }], group: "content" }),
    defineField({ name: "includes", title: "Incluye", type: "array", of: [{ type: "string" }], group: "logistics" }),
    defineField({ name: "excludes", title: "No incluye", type: "array", of: [{ type: "string" }], group: "logistics" }),
    defineField({ name: "faqs", title: "Preguntas frecuentes", type: "array", of: [{ type: "faq" }], group: "content" }),
    defineField({
      name: "isExample",
      title: "Contenido de ejemplo",
      description: "Márcalo mientras el viaje sea ilustrativo, no una convocatoria real.",
      type: "boolean",
      group: "logistics",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "mainImage" },
  },
});
