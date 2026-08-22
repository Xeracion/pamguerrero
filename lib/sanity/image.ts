import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageRef } from "./queries";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source?: SanityImageRef | null) {
  if (!source?.asset) return undefined;
  return builder.image(source).auto("format").fit("max");
}
