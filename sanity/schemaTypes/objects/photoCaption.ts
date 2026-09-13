import { defineField, defineType } from "sanity";

export const photoCaption = defineType({
  name: "photoCaption",
  title: "Foto con leyenda",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
    }),
    defineField({ name: "caption", title: "Leyenda", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
  },
});
