import { defineField, defineType } from "sanity";

const TAGS = ["Cultura", "Experiencias internacionales", "Ampliar tu mundo", "Historias"];

export const experience = defineType({
  name: "experience",
  title: "Experiencia",
  type: "document",
  groups: [
    { name: "content", title: "Contenido", default: true },
    { name: "meta", title: "Metadatos" },
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
      name: "tag",
      title: "Etiqueta",
      type: "string",
      group: "content",
      options: { list: TAGS },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "Extracto", type: "text", rows: 2, group: "content", validation: (r) => r.required().max(220) }),
    defineField({
      name: "mainImage",
      title: "Foto principal",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      group: "content",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "relatedExperiences",
      title: "Experiencias relacionadas",
      type: "array",
      group: "content",
      of: [{ type: "reference", to: [{ type: "experience" }] }],
    }),
    defineField({ name: "datePublished", title: "Fecha de publicación", type: "date", group: "meta", validation: (r) => r.required() }),
    defineField({ name: "dateModified", title: "Fecha de actualización", type: "date", group: "meta" }),
    defineField({ name: "readingMinutes", title: "Minutos de lectura", type: "number", group: "meta", validation: (r) => r.required().min(1) }),
    defineField({
      name: "isExample",
      title: "Contenido de ejemplo",
      description: "Márcalo mientras el contenido sea ilustrativo, no una publicación real.",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag", media: "mainImage" },
  },
});
