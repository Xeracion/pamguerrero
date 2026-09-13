import type { SchemaTypeDefinition } from "sanity";

import { category } from "./category";
import { article } from "./article";
import { experience } from "./experience";
import { destination } from "./destination";
import { journey } from "./journey";
import { trip } from "./trip";
import { siteSettings } from "./siteSettings";
import { itineraryDay } from "./objects/itineraryDay";
import { faq } from "./objects/faq";
import { guideSection } from "./objects/guideSection";
import { photoCaption } from "./objects/photoCaption";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documentos
    category,
    article,
    experience,
    destination,
    journey,
    trip,
    siteSettings,
    // Objetos reutilizables
    itineraryDay,
    faq,
    guideSection,
    photoCaption,
  ],
};
