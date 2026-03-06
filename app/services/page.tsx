import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServicesContent } from "@/components/services-content"
import { FloatingBookButton } from "@/components/floating-book-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Blank Space - Recording Studio & Creative Agency",
  description: "Recording and studio rental, audiovisual productions, web development, and events entertainment services in Freetown, Sierra Leone.",
}

export default function ServicesPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <ServicesContent />
      </div>
      <Footer />
      <FloatingBookButton />
    </main>
  )
}
