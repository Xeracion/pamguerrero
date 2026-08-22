import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categoría de Viajes",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
