import { defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Destino",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "region", title: "Región", type: "string", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Resumen breve", type: "text", rows: 2, validation: (r) => r.required().max(220) }),
    defineField({
      name: "mainImage",
      title: "Foto principal",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "guide",
      title: "Guía del destino",
      description: "Cuándo viajar, presupuesto, transporte, alojamiento, consejos, etc.",
      type: "array",
      of: [{ type: "guideSection" }],
    }),
    defineField({
      name: "relatedTrips",
      title: "Viajes grupales relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "trip" }] }],
    }),
    defineField({
      name: "isExample",
      title: "Contenido de ejemplo",
      description: "Márcalo mientras la guía sea ilustrativa, no contenido real verificado.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "region", media: "mainImage" },
  },
});
