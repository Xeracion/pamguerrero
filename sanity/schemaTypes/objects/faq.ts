import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Pregunta frecuente",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Pregunta", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Respuesta", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "question" },
  },
});
