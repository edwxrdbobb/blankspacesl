import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { FloatingBookButton } from "@/components/floating-book-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Select Works | Blank Space - Portfolio",
  description: "Explore our portfolio of music videos, brand campaigns, recordings, and creative projects from Freetown, Sierra Leone.",
}

export default function PortfolioPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <PortfolioGrid />
      </div>
      <Footer />
      <FloatingBookButton />
    </main>
  )
}
