import { HeroSection } from "@/components/home/hero-section"
import { EventsPreview } from "@/components/home/events-preview"
import { ClubsPreview } from "@/components/home/clubs-preview"
import { AIFeaturesSection } from "@/components/home/ai-features-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventsPreview />
      <ClubsPreview />
      <AIFeaturesSection />
    </>
  )
}
