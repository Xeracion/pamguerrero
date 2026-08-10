import { Hero } from "@/components/hero";
import { Trajectory } from "@/components/trajectory";
import { StorySection } from "@/components/story-section";
import { ExpandYourWorld } from "@/components/expand-your-world";
import { PathsSection } from "@/components/paths-section";
import { CaminandoTeaser } from "@/components/caminando-teaser";
import { NewsletterCta } from "@/components/newsletter-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trajectory />
      <StorySection />
      <ExpandYourWorld />
      <PathsSection />
      <CaminandoTeaser />
      <NewsletterCta />
    </main>
  );
}
