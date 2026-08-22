import { defineField, defineType } from "sanity";

export const guideSection = defineType({
  name: "guideSection",
  title: "Sección de guía",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Contenido", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
