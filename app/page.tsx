import { Hero } from "@/components/hero";
import { Trajectory } from "@/components/trajectory";
import { PathsSection } from "@/components/paths-section";
import { StorySection } from "@/components/story-section";
import { WhereToSection } from "@/components/where-to-section";
import { GroupTripsTeaser } from "@/components/group-trips-teaser";
import { StoriesTeaser } from "@/components/stories-teaser";
import { KnowledgeSection } from "@/components/knowledge-section";
import { CollaborationsSection } from "@/components/collaborations-section";
import { NewsletterCta } from "@/components/newsletter-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trajectory />
      <PathsSection />
      <StorySection />
      <WhereToSection />
      <GroupTripsTeaser />
      <StoriesTeaser />
      <KnowledgeSection />
      <CollaborationsSection />
      <NewsletterCta />
    </main>
  );
}
