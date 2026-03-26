import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { GeminiSection } from "@/components/gemini-section"
import { FloatingBookButton } from "@/components/floating-book-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Blank Space - Recording Studio & Creative Agency",
  description: "Learn about the vision and motive behind Blank Space, Freetown's premier destination for creative excellence and artistic empowerment.",
}

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <GeminiSection />
      </div>
      <Footer />
      <FloatingBookButton />
    </main>
  )
}
