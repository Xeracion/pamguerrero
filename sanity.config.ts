import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool, defineLocations } from "sanity/presentation";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "a4kawsmz";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "pamguerrero",
  title: "Pam Guerrero — Contenido",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: {
        locations: {
          category: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) =>
              doc && {
                locations: [{ title: doc.title ?? "Sin título", href: `/viajes/${doc.slug}` }],
              },
          }),
          article: defineLocations({
            select: { title: "title", slug: "slug.current", categorySlug: "category->slug.current" },
            resolve: (doc) =>
              doc && {
                locations: [
                  {
                    title: doc.title ?? "Sin título",
                    href: `/viajes/${doc.categorySlug}/${doc.slug}`,
                  },
                ],
              },
          }),
          experience: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) =>
              doc && {
                locations: [{ title: doc.title ?? "Sin título", href: `/experiencias/${doc.slug}` }],
              },
          }),
          destination: defineLocations({
            select: { name: "name", slug: "slug.current" },
            resolve: (doc) =>
              doc && {
                locations: [
                  { title: doc.name ?? "Sin título", href: `/viajes/destinos/${doc.slug}` },
                ],
              },
          }),
          journey: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) =>
              doc && {
                locations: [{ title: doc.title ?? "Sin título", href: `/viaja-conmigo/${doc.slug}` }],
              },
          }),
          trip: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) =>
              doc && {
                locations: [{ title: doc.title ?? "Sin título", href: `/viajes-grupales/${doc.slug}` }],
              },
          }),
          siteSettings: defineLocations({
            select: {},
            resolve: () => ({
              locations: [
                { title: "Inicio", href: "/" },
                { title: "Sobre Pam", href: "/sobre-pam" },
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
});
