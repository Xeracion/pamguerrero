import type { StructureResolver } from "sanity/structure";

/** Pins "Ajustes del sitio" as a singleton so editors can't accidentally create a second one. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.documentTypeListItem("destination").title("Destinos"),
      S.documentTypeListItem("trip").title("Viajes grupales"),
      S.documentTypeListItem("journey").title("Viajes (Viaja conmigo)"),
      S.documentTypeListItem("experience").title("Experiencias"),
      S.documentTypeListItem("article").title("Artículos"),
      S.documentTypeListItem("category").title("Categorías"),
      S.divider(),
      S.listItem()
        .title("Ajustes del sitio")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
