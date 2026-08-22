import { PortableText as PortableTextRenderer, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { SanityImage } from "@/components/sanity-image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-lg leading-relaxed text-ink">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-4 font-display text-2xl font-medium text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-2 font-display text-xl font-medium text-ink">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-5 font-display text-xl italic text-ink-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-accent underline hover:no-underline">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <SanityImage image={value} fallbackLabel="Imagen" aspect="wide" className="my-2" />
    ),
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      <PortableTextRenderer value={value} components={components} />
    </div>
  );
}
