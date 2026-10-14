import Image from "next/image";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImageRef } from "@/lib/sanity/queries";

interface SanityImageProps {
  image?: SanityImageRef;
  fallbackLabel: string;
  /**
   * Foto real a mostrar mientras el campo de Sanity está vacío (ruta local
   * en /public), en vez del cuadro gris de PhotoPlaceholder. Sanity, si
   * tiene una imagen cargada, siempre tiene prioridad sobre esto.
   */
  fallbackSrc?: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  tone?: "light" | "dark";
  className?: string;
  imageClassName?: string;
  sizes?: string;
  dataAttribute?: string;
}

const ASPECT_RATIO: Record<NonNullable<SanityImageProps["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function SanityImage({
  image,
  fallbackLabel,
  fallbackSrc,
  aspect = "landscape",
  tone = "light",
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  dataAttribute,
}: SanityImageProps) {
  const sanityUrl = urlForImage(image)?.width(1600).url();
  const url = sanityUrl ?? fallbackSrc;

  if (!url) {
    return (
      <PhotoPlaceholder label={fallbackLabel} aspect={aspect} tone={tone} className={className} />
    );
  }

  // El alt solo viene de Sanity cuando la foto también viene de Sanity — si
  // el campo tiene texto alternativo cargado pero ningún archivo (p. ej.
  // alguien completó el alt en el Studio antes de subir la imagen), la URL
  // cae a fallbackSrc pero no debe heredar ese alt huérfano.
  const alt = sanityUrl ? image?.alt || fallbackLabel : fallbackLabel;

  // Callers that need a full-bleed background pass their own "absolute"
  // positioning (e.g. "absolute inset-0 h-full w-full") in className. Forcing
  // "relative" here too would fight it — both classes set `position` and
  // which one the browser applies depends on Tailwind's internal stylesheet
  // order, not on the order of class names in this string — which is exactly
  // what made the Hero photo render squashed. "absolute" is itself a valid
  // containing block for the <Image fill> below, so skip "relative" then.
  const position = className.includes("absolute") ? "" : "relative";

  return (
    <div
      className={`${position} overflow-hidden ${ASPECT_RATIO[aspect]} ${className}`}
      data-sanity={dataAttribute}
    >
      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
