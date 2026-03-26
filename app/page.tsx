import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { MarqueeBanner } from "@/components/marquee-banner"
import { PartnersSlider } from "@/components/partners-slider"
import { ServicesPreview } from "@/components/services-preview"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FloatingBookButton } from "@/components/floating-book-button"
export default function HomePage() {
  return (
    <main>
      <Navigation />
      <Hero />
      <MarqueeBanner />
      <ServicesPreview />
      <PortfolioPreview />
      <PartnersSlider compact />
      <CTASection />
      <Footer />
      <FloatingBookButton />
    </main>
  )
}
