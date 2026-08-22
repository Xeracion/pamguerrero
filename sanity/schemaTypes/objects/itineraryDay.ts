import { defineField, defineType } from "sanity";

export const itineraryDay = defineType({
  name: "itineraryDay",
  title: "Día de itinerario",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Número de día", type: "number", validation: (r) => r.required().min(1) }),
    defineField({ name: "title", title: "Título del día", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Detalle", type: "text", rows: 3 }),
  ],
  preview: {
    select: { day: "day", title: "title" },
    prepare({ day, title }) {
      return { title: `Día ${day}: ${title}` };
    },
  },
});
