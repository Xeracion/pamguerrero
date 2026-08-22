import Image from "next/image";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImageRef } from "@/lib/sanity/queries";

interface SanityImageProps {
  image?: SanityImageRef;
  fallbackLabel: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  className?: string;
  sizes?: string;
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
  aspect = "landscape",
  className = "",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: SanityImageProps) {
  const url = urlForImage(image)?.width(1600).url();

  if (!url) {
    return <PhotoPlaceholder label={fallbackLabel} aspect={aspect} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${ASPECT_RATIO[aspect]} ${className}`}>
      <Image
        src={url}
        alt={image?.alt || fallbackLabel}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
