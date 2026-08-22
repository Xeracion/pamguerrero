import type { Faq } from "@/lib/sanity/queries";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-base font-medium text-ink marker:content-none">
            {faq.question}
            <span className="shrink-0 font-display text-xl text-accent transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ink-muted">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
