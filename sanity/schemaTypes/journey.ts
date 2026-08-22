import { defineField, defineType } from "sanity";

export const journey = defineType({
  name: "journey",
  title: "Viaja Conmigo (relato personal)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", description: "En primera persona, ej. 'Así fue mi viaje por Egipto'.", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "destination",
      title: "Destino",
      type: "reference",
      to: [{ type: "destination" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "Extracto", type: "text", rows: 2, validation: (r) => r.required().max(220) }),
    defineField({
      name: "mainImage",
      title: "Foto principal",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Relato",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Fecha del viaje", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "isExample",
      title: "Contenido de ejemplo",
      description: "Márcalo mientras el relato sea ilustrativo, no una historia real publicada.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "destination.name", media: "mainImage" },
  },
});
